"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Sparkles } from "lucide-react"
import { generateItinerary } from "@/app/actions/generate-itinerary"
import { ItineraryDisplay } from "./itinerary-display"

export function TripPlannerForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [itinerary, setItinerary] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    duration: "",
    budget: "",
    interests: [] as string[],
    travelStyle: "",
    additionalInfo: "",
  })

  const interestOptions = [
    "Nature & Wildlife",
    "Waterfalls",
    "Temples & Heritage",
    "Tribal Culture",
    "Adventure Activities",
    "Photography",
    "Eco-Tourism",
    "Hill Stations",
  ]

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setItinerary(null)

    try {
      const result = await generateItinerary(formData)
      setItinerary(result)
    } catch (error) {
      console.error("[v0] Error generating itinerary:", error)
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      alert(`Failed to generate itinerary: ${errorMessage}`)
      setItinerary(
        `Sorry, there was an error generating your itinerary: ${errorMessage}\n\nPlease check that your GOOGLE_API_KEY is set correctly and try again.`,
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-2xl">Tell Us About Your Trip</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Duration */}
            <div className="space-y-2">
              <Label htmlFor="duration">How many days are you planning to visit?</Label>
              <Select
                value={formData.duration}
                onValueChange={(value) => setFormData({ ...formData, duration: value })}
              >
                <SelectTrigger id="duration">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-2">1-2 days</SelectItem>
                  <SelectItem value="3-4">3-4 days</SelectItem>
                  <SelectItem value="5-7">5-7 days</SelectItem>
                  <SelectItem value="7+">More than 7 days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <Label htmlFor="budget">What's your budget per person?</Label>
              <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                <SelectTrigger id="budget">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Budget (Under ₹5,000/day)</SelectItem>
                  <SelectItem value="moderate">Moderate (₹5,000-₹10,000/day)</SelectItem>
                  <SelectItem value="comfortable">Comfortable (₹10,000-₹20,000/day)</SelectItem>
                  <SelectItem value="luxury">Luxury (Above ₹20,000/day)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Interests */}
            <div className="space-y-3">
              <Label>What are you interested in? (Select all that apply)</Label>
              <div className="grid gap-3 sm:grid-cols-2">
                {interestOptions.map((interest) => (
                  <div key={interest} className="flex items-center space-x-2">
                    <Checkbox
                      id={interest}
                      checked={formData.interests.includes(interest)}
                      onCheckedChange={() => handleInterestToggle(interest)}
                    />
                    <label
                      htmlFor={interest}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {interest}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel Style */}
            <div className="space-y-2">
              <Label htmlFor="travelStyle">What's your travel style?</Label>
              <Select
                value={formData.travelStyle}
                onValueChange={(value) => setFormData({ ...formData, travelStyle: value })}
              >
                <SelectTrigger id="travelStyle">
                  <SelectValue placeholder="Select travel style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relaxed">Relaxed - Take it easy</SelectItem>
                  <SelectItem value="moderate">Moderate - Balanced pace</SelectItem>
                  <SelectItem value="packed">Packed - See as much as possible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Additional Info */}
            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Any specific requirements or preferences? (Optional)</Label>
              <Textarea
                id="additionalInfo"
                placeholder="E.g., traveling with kids, need wheelchair accessibility, prefer vegetarian food..."
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                rows={3}
              />
            </div>

            <Button type="submit" size="lg" className="w-full gap-2" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating Your Itinerary...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate My Itinerary
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {itinerary && (
        <div className="mt-8">
          <ItineraryDisplay itinerary={itinerary} />
        </div>
      )}
    </div>
  )
}
