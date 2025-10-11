"use client"

import type React from "react"
import { useState, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2, Sparkles, MapPin, Hotel, Building, Calendar, Wallet, Heart, Zap } from "lucide-react"
import { generateItinerary } from "@/app/actions/generate-itinerary"
import { ItineraryDisplay } from "./itinerary-display"

interface FormData {
  duration: string
  budget: string
  interests: string[]
  travelStyle: string
  additionalInfo: string
  hasHotelBooking: "yes" | "no" | ""
  destination: string
}

const INTEREST_OPTIONS = [
  { value: "Nature & Wildlife", icon: "🌿" },
  { value: "Waterfalls", icon: "💦" },
  { value: "Temples & Heritage", icon: "🛕" },
  { value: "Tribal Culture", icon: "👥" },
  { value: "Adventure Activities", icon: "🧗" },
  { value: "Photography", icon: "📸" },
  { value: "Eco-Tourism", icon: "🌎" },
  { value: "Hill Stations", icon: "⛰️" },
] as const

const DESTINATION_OPTIONS = [
  "Ranchi",
  "Jamshedpur", 
  "Dhanbad",
  "Bokaro",
  "Hazaribagh",
  "Netarhat",
  "Betla National Park",
  "Deoghar",
  "Other (Specify in additional info)"
]

const BUDGET_OPTIONS = [
  { value: "budget", label: "💰 Budget (Under ₹5,000/day)", description: "Hostels, local transport, street food" },
  { value: "moderate", label: "💸 Moderate (₹5,000-₹10,000/day)", description: "Mid-range hotels, guided tours, restaurants" },
  { value: "comfortable", label: "⭐ Comfortable (₹10,000-₹20,000/day)", description: "Boutique hotels, private transport, fine dining" },
  { value: "luxury", label: "✨ Luxury (Above ₹20,000/day)", description: "5-star hotels, premium experiences, personal guides" },
]

const TRAVEL_STYLE_OPTIONS = [
  { value: "relaxed", label: "😌 Relaxed - Take it easy and enjoy", description: "Leisurely pace, ample rest time" },
  { value: "moderate", label: "⚖️ Moderate - Balanced pace", description: "Mix of activities and relaxation" },
  { value: "packed", label: "🔥 Packed - See as much as possible", description: "Full days, maximum sightseeing" },
]

export function TripPlannerForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [itinerary, setItinerary] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    duration: "",
    budget: "",
    interests: [],
    travelStyle: "",
    additionalInfo: "",
    hasHotelBooking: "",
    destination: "",
  })

  const handleChange = useCallback(<T extends keyof FormData>(name: T, value: FormData[T]) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }, [])

  const handleInterestToggle = useCallback((interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }, [])

  const handleHotelBookingChange = useCallback((value: "yes" | "no") => {
    setFormData((prev) => ({
      ...prev,
      hasHotelBooking: value,
    }))
  }, [])

  const isFormValid = useMemo(() => {
    const { duration, budget, travelStyle, interests, hasHotelBooking, destination } = formData
    return !!duration && !!budget && !!travelStyle && interests.length > 0 && !!hasHotelBooking && !!destination
  }, [formData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) {
        alert("Please fill all required fields (*) including destination and hotel booking status.")
        return
    }

    setIsLoading(true)
    setItinerary(null)

    try {
      const result = await generateItinerary(formData)
      setItinerary(result)
    } catch (error) {
      console.error("[v0] Error generating itinerary:", error)
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      setItinerary(
        `## ❌ Error Generating Itinerary\n\nSorry, there was an error generating your itinerary: ${errorMessage}\n\nPlease check your configuration and try again.`,
      )
    } finally {
      setIsLoading(false)
    }
  }

  const clearForm = () => {
    setFormData({
      duration: "",
      budget: "",
      interests: [],
      travelStyle: "",
      additionalInfo: "",
      hasHotelBooking: "",
      destination: "",
    })
    setItinerary(null)
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Enhanced Header Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <MapPin className="h-6 w-6 text-white" />
          </div>
          <h1 className="font-serif text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Travel Planner
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Create your perfect Jharkhand itinerary with AI-powered recommendations, hotel suggestions, and professional PDF exports
        </p>
        <div className="flex justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-500" />
            <span>AI-Powered</span>
          </div>
          <div className="flex items-center gap-2">
            <Hotel className="h-4 w-4 text-green-500" />
            <span>Hotel Recommendations</span>
          </div>
          <div className="flex items-center gap-2">
            <DownloadIcon className="h-4 w-4 text-orange-500" />
            <span>PDF Export</span>
          </div>
        </div>
      </div>

      <Card className="shadow-2xl border-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/10 dark:to-purple-950/10">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <CardTitle className="font-serif text-3xl flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              Plan Your Perfect Trip
            </CardTitle>
            {itinerary && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearForm}
                className="gap-2"
              >
                <Calendar className="h-4 w-4" />
                New Trip
              </Button>
            )}
          </div>
          <p className="text-muted-foreground mt-2">
            Fill in your travel preferences below to generate a personalized AI itinerary
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Destination & Duration Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Destination */}
              <div className="space-y-3">
                <Label htmlFor="destination" className="text-sm font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  Which city or region are you visiting? *
                </Label>
                <Select
                  value={formData.destination}
                  onValueChange={(value) => handleChange("destination", value)}
                >
                  <SelectTrigger id="destination" className="h-12 bg-white/50 dark:bg-gray-800/50 border-2">
                    <SelectValue placeholder="Select your destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {DESTINATION_OPTIONS.map((destination) => (
                      <SelectItem key={destination} value={destination} className="py-3">
                        {destination}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Choose your primary destination in Jharkhand
                </p>
              </div>

              {/* Duration */}
              <div className="space-y-3">
                <Label htmlFor="duration" className="text-sm font-semibold flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-600" />
                  How many days are you planning? *
                </Label>
                <Select
                  value={formData.duration}
                  onValueChange={(value) => handleChange("duration", value)}
                >
                  <SelectTrigger id="duration" className="h-12 bg-white/50 dark:bg-gray-800/50 border-2">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2" className="py-3">1-2 days (Weekend Getaway)</SelectItem>
                    <SelectItem value="3-4" className="py-3">3-4 days (Short Trip)</SelectItem>
                    <SelectItem value="5-7" className="py-3">5-7 days (Week-long Adventure)</SelectItem>
                    <SelectItem value="7+" className="py-3">More than 7 days (Extended Journey)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Total duration of your trip
                </p>
              </div>
            </div>

            {/* Budget & Travel Style Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Budget */}
              <div className="space-y-3">
                <Label htmlFor="budget" className="text-sm font-semibold flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-yellow-600" />
                  What's your budget per person? *
                </Label>
                <Select 
                  value={formData.budget} 
                  onValueChange={(value) => handleChange("budget", value)}
                >
                  <SelectTrigger id="budget" className="h-12 bg-white/50 dark:bg-gray-800/50 border-2">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    {BUDGET_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="py-3">
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-xs text-muted-foreground">{option.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Daily budget including accommodation, food, and activities
                </p>
              </div>

              {/* Travel Style */}
              <div className="space-y-3">
                <Label htmlFor="travelStyle" className="text-sm font-semibold flex items-center gap-2">
                  <Zap className="h-4 w-4 text-orange-600" />
                  What's your travel style? *
                </Label>
                <Select
                  value={formData.travelStyle}
                  onValueChange={(value) => handleChange("travelStyle", value)}
                >
                  <SelectTrigger id="travelStyle" className="h-12 bg-white/50 dark:bg-gray-800/50 border-2">
                    <SelectValue placeholder="Select travel style" />
                  </SelectTrigger>
                  <SelectContent>
                    {TRAVEL_STYLE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="py-3">
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-xs text-muted-foreground">{option.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Choose your preferred pace for the trip
                </p>
              </div>
            </div>

            {/* Interests */}
            <div className="space-y-4">
              <Label className="text-sm font-semibold flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-600" />
                What are you interested in? (Select all that apply) *
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {INTEREST_OPTIONS.map((interest) => (
                  <div 
                    key={interest.value} 
                    className={`flex items-center space-x-3 p-3 rounded-xl border-2 transition-all duration-200 ${
                      formData.interests.includes(interest.value)
                        ? "bg-blue-50 border-blue-300 dark:bg-blue-950/30 dark:border-blue-700 shadow-sm"
                        : "bg-white/50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700"
                    }`}
                  >
                    <Checkbox
                      id={interest.value}
                      checked={formData.interests.includes(interest.value)}
                      onCheckedChange={() => handleInterestToggle(interest.value)}
                      className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <label
                      htmlFor={interest.value}
                      className="text-sm font-medium leading-none cursor-pointer flex items-center gap-2 flex-1"
                    >
                      <span className="text-lg">{interest.icon}</span>
                      {interest.value}
                    </label>
                  </div>
                ))}
              </div>
              {formData.interests.length === 0 && (
                <p className="text-sm text-red-500 font-medium flex items-center gap-2">
                  ⚠️ Please select at least one interest to personalize your itinerary
                </p>
              )}
              {formData.interests.length > 0 && (
                <p className="text-sm text-green-600 font-medium flex items-center gap-2">
                  ✅ {formData.interests.length} interest(s) selected
                </p>
              )}
            </div>

            {/* Hotel Booking Status */}
            <div className="space-y-4">
              <Label className="text-sm font-semibold flex items-center gap-2">
                <Hotel className="h-4 w-4 text-purple-600" />
                Do you have hotel accommodation booked? *
              </Label>
              <RadioGroup 
                value={formData.hasHotelBooking} 
                onValueChange={handleHotelBookingChange}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div 
                  className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all duration-200 ${
                    formData.hasHotelBooking === "yes"
                      ? "bg-green-50 border-green-300 dark:bg-green-950/30 dark:border-green-700 shadow-sm"
                      : "bg-white/50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700"
                  }`}
                >
                  <RadioGroupItem 
                    value="yes" 
                    id="hotel-yes" 
                    className="text-green-600" 
                  />
                  <div className="flex-1">
                    <Label htmlFor="hotel-yes" className="cursor-pointer font-medium text-base">
                      ✅ Yes, I have accommodation
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      I've already booked my stay
                    </p>
                  </div>
                </div>
                <div 
                  className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all duration-200 ${
                    formData.hasHotelBooking === "no"
                      ? "bg-blue-50 border-blue-300 dark:bg-blue-950/30 dark:border-blue-700 shadow-sm"
                      : "bg-white/50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700"
                  }`}
                >
                  <RadioGroupItem 
                    value="no" 
                    id="hotel-no" 
                    className="text-blue-600" 
                  />
                  <div className="flex-1">
                    <Label htmlFor="hotel-no" className="cursor-pointer font-medium text-base">
                      🏨 No, I need AI recommendations
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Suggest hotels based on my budget
                    </p>
                  </div>
                </div>
              </RadioGroup>

              {/* AI Hotel Suggestions Note */}
              {formData.hasHotelBooking === "no" && (
                <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-3">
                    <Building className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                        🎯 AI Hotel Recommendations Enabled
                      </h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Our AI will analyze your destination, budget, and travel style to recommend the perfect accommodation options. You'll receive detailed hotel suggestions with prices, amenities, and booking tips in your personalized itinerary.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Info */}
            <div className="space-y-3">
              <Label htmlFor="additionalInfo" className="text-sm font-semibold flex items-center gap-2">
                <span className="w-5 h-5 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full flex items-center justify-center text-xs text-white">i</span>
                Any specific requirements or preferences? (Optional)
              </Label>
              <Textarea
                id="additionalInfo"
                placeholder="Tell us about any special requirements...
• Traveling with children or elderly
• Dietary restrictions (vegetarian, vegan, etc.)
• Mobility or accessibility needs
• Special occasions (honeymoon, anniversary)
• Specific places you want to visit
• Any other preferences or constraints"
                value={formData.additionalInfo}
                onChange={(e) => handleChange("additionalInfo", e.target.value)}
                rows={4}
                className="resize-none bg-white/50 dark:bg-gray-800/50 border-2 min-h-[120px]"
              />
              <p className="text-xs text-muted-foreground">
                This helps us create a more personalized itinerary for you
              </p>
            </div>

            {/* Submit Button */}
            <div className="space-y-4">
              <Button 
                type="submit" 
                size="lg" 
                className="w-full gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl text-base font-semibold py-6 rounded-xl" 
                disabled={isLoading || !isFormValid} 
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="flex flex-col items-start">
                      <span>Generating Your Itinerary...</span>
                      <span className="text-sm font-normal opacity-90">This may take a few moments</span>
                    </span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    <span className="flex flex-col items-start">
                      <span>Generate AI-Powered Itinerary</span>
                      <span className="text-sm font-normal opacity-90">With hotel recommendations & PDF export</span>
                    </span>
                  </>
                )}
              </Button>

              {/* Form Validation Status */}
              {!isFormValid && (
                <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <p className="text-sm text-amber-800 dark:text-amber-200 flex items-center gap-2">
                    ⚠️ Please fill all required fields (*) to generate your itinerary
                  </p>
                </div>
              )}

              {/* Features Preview */}
              {!itinerary && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="text-green-600 text-lg">📋</div>
                    <p className="text-sm font-medium text-green-800 dark:text-green-200">Detailed Day Plans</p>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="text-blue-600 text-lg">🏨</div>
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Hotel Recommendations</p>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <div className="text-purple-600 text-lg">📄</div>
                    <p className="text-sm font-medium text-purple-800 dark:text-purple-200">PDF Export</p>
                  </div>
                </div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Itinerary Display Section */}
      {itinerary && (
        <div className="mt-8 animate-in fade-in duration-500">
          <ItineraryDisplay itinerary={itinerary} />
        </div>
      )}
    </div>
  )
}

// Download Icon Component
function DownloadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  )
}