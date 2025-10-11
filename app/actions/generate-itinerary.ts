"use server"

import { createClient } from "@/lib/supabase/server"
import Groq from "groq-sdk"

interface TripPreferences {
  duration: string
  budget: string
  interests: string[]
  travelStyle: string
  additionalInfo: string
  hasHotelBooking: "yes" | "no" | ""
  destination: string
}

export async function generateItinerary(preferences: TripPreferences) {
  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey) {
    throw new Error("Missing GROQ_API_KEY in environment variables.")
  }

  const groq = new Groq({ apiKey })

  const supabase = await createClient()

  // Fetch all destinations to provide context to the AI
  const { data: destinations } = await supabase.from("destinations").select("*")
  const { data: culturalSites } = await supabase.from("cultural_sites").select("*")

  const destinationsContext = destinations
    ?.map(
      (d) =>
        `- ${d.name} (${d.category}): ${d.description} Located in ${d.location}. ${d.featured ? "Featured destination." : ""}`,
    )
    .join("\n")

  const culturalContext = culturalSites
    ?.map((c) => `- ${c.name}: ${c.description} Located in ${c.location}.`)
    .join("\n")

  // Enhanced prompt with strict formatting requirements
  const prompt = `You are a professional travel planner specializing in Jharkhand tourism. Create a highly detailed, well-structured itinerary in MARKDOWN format.

TRAVELER PREFERENCES:
- Duration: ${preferences.duration}
- Budget: ${preferences.budget}
- Destination: ${preferences.destination}
- Interests: ${preferences.interests.join(", ")}
- Travel Style: ${preferences.travelStyle}
- Hotel Booking: ${preferences.hasHotelBooking === "no" ? "NEEDS RECOMMENDATIONS" : "ALREADY BOOKED"}
- Additional Info: ${preferences.additionalInfo || "None"}

CONTEXT DATA:
${destinationsContext}

${culturalContext}

CRITICAL FORMATTING REQUIREMENTS - YOU MUST FOLLOW THIS EXACT STRUCTURE:

# 🗺️ Trip Itinerary: ${preferences.destination}

## 📋 Executive Summary
[2-3 paragraph overview of the entire trip highlighting key experiences]

## 🏨 Accommodation Recommendations
${preferences.hasHotelBooking === "no" ? `
### Luxury Options (₹15,000+)
- **Hotel Name** ⭐⭐⭐⭐⭐ | Price: ₹XX,XXX/night
  - Location: [Area]
  - Amenities: [List]
  - Best for: [Type of traveler]

### Mid-Range Options (₹8,000-₹15,000)
- **Hotel Name** ⭐⭐⭐⭐ | Price: ₹X,XXX/night
  - Location: [Area]
  - Amenities: [List]
  - Best for: [Type of traveler]

### Budget Options (Under ₹8,000)
- **Hotel Name** ⭐⭐⭐ | Price: ₹X,XXX/night
  - Location: [Area]
  - Amenities: [List]
  - Best for: [Type of traveler]
` : "*Traveler has already arranged accommodation*"}

## 📅 Detailed Day-by-Day Itinerary

### Day 1: [Theme/Area Focus]
**🗓️ Date:** [If applicable]
**🏨 Overnight:** [Hotel/Location]

#### 🌅 Morning (8:00 AM - 12:00 PM)
**⏰ Time:** 8:00 AM - 10:00 AM  
**📍 Activity:** [Detailed activity name]  
**💰 Cost:** ₹XXX  
**📝 Details:** [Comprehensive description with practical tips]  
**🎯 Highlights:** [Key experiences]  
**🚗 Transport:** [Details with time/cost]

**⏰ Time:** 10:00 AM - 12:00 PM  
**📍 Activity:** [Detailed activity name]  
**💰 Cost:** ₹XXX  
**📝 Details:** [Comprehensive description]  
**🍽️ Lunch Recommendation:** [Restaurant with cuisine type and budget]

#### 🌞 Afternoon (12:00 PM - 5:00 PM)
**⏰ Time:** 12:00 PM - 2:00 PM  
**📍 Activity:** [Detailed activity]  
**💰 Cost:** ₹XXX  
**📝 Details:** [Comprehensive description]

**⏰ Time:** 2:00 PM - 5:00 PM  
**📍 Activity:** [Detailed activity]  
**💰 Cost:** ₹XXX  
**📝 Details:** [Comprehensive description]

#### 🌙 Evening (5:00 PM - 9:00 PM)
**⏰ Time:** 5:00 PM - 7:00 PM  
**📍 Activity:** [Detailed activity]  
**💰 Cost:** ₹XXX  
**📝 Details:** [Comprehensive description]

**⏰ Time:** 7:00 PM - 9:00 PM  
**🍽️ Dinner:** [Restaurant recommendation]  
**💰 Cost:** ₹XXX  
**📝 Details:** [Cuisine, ambiance, must-try dishes]

**💵 Daily Estimated Cost:** ₹X,XXX-₹X,XXX

---

[Repeat the same detailed structure for each day]

## 💰 Budget Breakdown

### Accommodation
- Luxury: ₹XX,XXX - ₹XX,XXX
- Mid-range: ₹X,XXX - ₹X,XXX
- Budget: ₹X,XXX - ₹X,XXX

### Food & Dining
- Breakfast: ₹XXX-₹XXX per day
- Lunch: ₹XXX-₹XXX per day
- Dinner: ₹XXX-₹XXX per day

### Transportation
- Local transport: ₹XXX-₹XXX per day
- Inter-city travel: ₹XXX-₹XXX

### Activities & Entrance Fees
- Sightseeing: ₹XXX-₹XXX
- Adventure activities: ₹XXX-₹XXX
- Cultural experiences: ₹XXX-₹XXX

### Total Estimated Cost: ₹XX,XXX - ₹XX,XXX

## 🚗 Transportation Guide

### Getting to ${preferences.destination}
- **By Air:** [Details with airlines, frequency, approximate cost]
- **By Train:** [Train names, classes, booking tips]
- **By Road:** [Bus services, taxi options, driving tips]

### Local Transportation
- **Auto-rickshaws:** ₹XXX-₹XXX per km
- **Taxis:** ₹XXX-₹XXX per km
- **Local buses:** ₹XX-₹XX per ride
- **Car rental:** ₹X,XXX-₹X,XXX per day

## 🎒 Packing Checklist

### Essential Documents
- [ ] Government ID
- [ ] Hotel booking confirmations
- [ ] Travel insurance
- [ ] Emergency contacts

### Clothing
- [ ] [Season-specific clothing items]
- [ ] Comfortable walking shoes
- [ ] Rain protection

### Electronics
- [ ] Power bank
- [ ] Universal adapter
- [ ] Camera

### Health & Safety
- [ ] Personal medications
- [ ] First aid kit
- [ ] Sanitizer

## 🆘 Emergency Information

### Important Contacts
- **Police:** 100
- **Ambulance:** 102
- **Fire:** 101
- **Local Tourism Helpine:** [Number]

### Medical Facilities
- [Hospital names with locations and specialties]

### Embassy Contacts
- [If applicable for international travelers]

## 💡 Pro Tips & Cultural Etiquette

### Do's
- [Cultural norms and positive behaviors]

### Don'ts
- [Cultural sensitivities to avoid]

### Local Customs
- [Specific customs, greetings, dress codes]

## 🔄 Alternative Activities

### Rainy Day Options
- [Indoor activities, museums, shopping]

### If Short on Time
- [Priority activities not to miss]

### For Adventure Seekers
- [Additional adventurous activities]

---

*This itinerary was AI-generated on ${new Date().toLocaleDateString()} and should be verified with current local conditions.*

Make sure every section is filled with specific, practical information. Use bullet points, clear headings, and provide actionable details. Include exact prices where possible and realistic time allocations.`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a professional travel planner. Always respond in well-structured Markdown with clear sections, bullet points, and practical details. Include specific prices, times, and actionable recommendations."
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_completion_tokens: 16384,
      top_p: 1,
      stream: false,
    })

    const fullResponse = chatCompletion.choices[0]?.message?.content

    if (!fullResponse?.trim()) {
      throw new Error("No itinerary generated by Groq.")
    }

    return fullResponse.trim()
  } catch (error) {
    console.error("[v0] Error generating itinerary:", error)
    if (error instanceof Error) {
      throw error
    }
    throw new Error("Failed to generate itinerary")
  }
}