"use client"

import type React from "react"
import { useCallback, useMemo, useState, useId } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Loader2,
  Sparkles,
  Calendar,
  DollarSign,
  MapPin,
  Users,
  ArrowRight,
} from "lucide-react"
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

  // Generate unique IDs for each select
  const durationId = useId()
  const budgetId = useId()
  const travelStyleId = useId()

  /* 1. stable callbacks --------------------------------------------------- */
  const handleDuration = useCallback(
    (v: string) => setFormData((f) => ({ ...f, duration: v })),
    []
  )
  const handleBudget = useCallback(
    (v: string) => setFormData((f) => ({ ...f, budget: v })),
    []
  )
  const handleTravelStyle = useCallback(
    (v: string) => setFormData((f) => ({ ...f, travelStyle: v })),
    []
  )

  /* 2. memoise static arrays --------------------------------------------- */
  const interestOptions = useMemo(
    () => [
      "Nature & Wildlife",
      "Waterfalls",
      "Temples & Heritage",
      "Tribal Culture",
      "Adventure Activities",
      "Photography",
      "Eco-Tourism",
      "Hill Stations",
    ],
    []
  )

  const handleInterestToggle = useCallback((interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (formData.interests.length === 0) {
      alert("Please select at least one interest to get personalized recommendations.")
      return
    }
    
    setIsLoading(true)
    setItinerary(null)

    try {
      const result = await generateItinerary(formData)
      setItinerary(result)
    } catch (error) {
      console.error("[v0] Error generating itinerary:", error)
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred"
      alert(`Failed to generate itinerary: ${errorMessage}`)
      setItinerary(
        `Sorry, there was an error generating your itinerary: ${errorMessage}\n\nPlease check that your GOOGLE_API_KEY is set correctly and try again.`
      )
    } finally {
      setIsLoading(false)
    }
  }

  /* 3. stable change handlers for text inputs ---------------------------- */
  const handleAdditionalInfoChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      setFormData((f) => ({ ...f, additionalInfo: e.target.value })),
    []
  )

  return (
    <div className="mx-auto max-w-4xl">
      <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-sky-500 p-3">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="font-serif text-3xl text-foreground">
                Tell Us About Your Trip
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                Fill in your preferences to get a personalized AI itinerary
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Duration */}
            <div className="space-y-4">
              <Label
                htmlFor={durationId}
                className="flex items-center gap-2 text-lg font-semibold text-foreground"
              >
                <Calendar className="h-5 w-5 text-emerald-600" />
                How many days are you planning to visit?
              </Label>
              <Select value={formData.duration} onValueChange={handleDuration}>
                <SelectTrigger
                  id={durationId}
                  className="h-12 rounded-xl border-2 border-gray-200 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                >
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-2 border-gray-200 bg-white">
                  <SelectItem
                    value="1-2"
                    className="rounded-lg focus:bg-emerald-50 focus:text-emerald-700"
                  >
                    1-2 days
                  </SelectItem>
                  <SelectItem
                    value="3-4"
                    className="rounded-lg focus:bg-emerald-50 focus:text-emerald-700"
                  >
                    3-4 days
                  </SelectItem>
                  <SelectItem
                    value="5-7"
                    className="rounded-lg focus:bg-emerald-50 focus:text-emerald-700"
                  >
                    5-7 days
                  </SelectItem>
                  <SelectItem
                    value="7+"
                    className="rounded-lg focus:bg-emerald-50 focus:text-emerald-700"
                  >
                    More than 7 days
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Budget */}
            <div className="space-y-4">
              <Label
                htmlFor={budgetId}
                className="flex items-center gap-2 text-lg font-semibold text-foreground"
              >
                <DollarSign className="h-5 w-5 text-emerald-600" />
                What's your budget per person?
              </Label>
              <Select value={formData.budget} onValueChange={handleBudget}>
                <SelectTrigger
                  id={budgetId}
                  className="h-12 rounded-xl border-2 border-gray-200 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                >
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-2 border-gray-200 bg-white">
                  <SelectItem
                    value="budget"
                    className="rounded-lg focus:bg-emerald-50 focus:text-emerald-700"
                  >
                    Budget (Under ₹5,000/day)
                  </SelectItem>
                  <SelectItem
                    value="moderate"
                    className="rounded-lg focus:bg-emerald-50 focus:text-emerald-700"
                  >
                    Moderate (₹5,000-₹10,000/day)
                  </SelectItem>
                  <SelectItem
                    value="comfortable"
                    className="rounded-lg focus:bg-emerald-50 focus:text-emerald-700"
                  >
                    Comfortable (₹10,000-₹20,000/day)
                  </SelectItem>
                  <SelectItem
                    value="luxury"
                    className="rounded-lg focus:bg-emerald-50 focus:text-emerald-700"
                  >
                    Luxury (Above ₹20,000/day)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Interests */}
            <div className="space-y-4">
              <Label className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <MapPin className="h-5 w-5 text-emerald-600" />
                What are you interested in? (Select all that apply)
              </Label>
              <div className="grid gap-4 sm:grid-cols-2">
                {interestOptions.map((interest) => (
                  <div
                    key={interest}
                    className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      formData.interests.includes(interest)
                        ? "border-emerald-500 bg-emerald-50 shadow-lg scale-105"
                        : "border-gray-200 bg-white hover:border-emerald-300"
                    }`}
                    onClick={() => handleInterestToggle(interest)}
                  >
                    <Checkbox
                      id={interest}
                      checked={formData.interests.includes(interest)}
                      onCheckedChange={() => handleInterestToggle(interest)}
                      className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                    />
                    <label
                      htmlFor={interest}
                      className={`text-sm font-medium leading-none cursor-pointer select-none ${
                        formData.interests.includes(interest)
                          ? "text-emerald-700"
                          : "text-foreground"
                      }`}
                    >
                      {interest}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel Style */}
            <div className="space-y-4">
              <Label
                htmlFor={travelStyleId}
                className="flex items-center gap-2 text-lg font-semibold text-foreground"
              >
                <Users className="h-5 w-5 text-emerald-600" />
                What's your travel style?
              </Label>
              <Select
                value={formData.travelStyle}
                onValueChange={handleTravelStyle}
              >
                <SelectTrigger
                  id={travelStyleId}
                  className="h-12 rounded-xl border-2 border-gray-200 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                >
                  <SelectValue placeholder="Select travel style" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-2 border-gray-200 bg-white">
                  <SelectItem
                    value="relaxed"
                    className="rounded-lg focus:bg-emerald-50 focus:text-emerald-700"
                  >
                    Relaxed - Take it easy
                  </SelectItem>
                  <SelectItem
                    value="moderate"
                    className="rounded-lg focus:bg-emerald-50 focus:text-emerald-700"
                  >
                    Moderate - Balanced pace
                  </SelectItem>
                  <SelectItem
                    value="packed"
                    className="rounded-lg focus:bg-emerald-50 focus:text-emerald-700"
                  >
                    Packed - See as much as possible
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Additional Info */}
            <div className="space-y-4">
              <Label
                htmlFor="additionalInfo"
                className="text-lg font-semibold text-foreground"
              >
                Any specific requirements or preferences? (Optional)
              </Label>
              <Textarea
                id="additionalInfo"
                placeholder="E.g., traveling with kids, need wheelchair accessibility, prefer vegetarian food, special occasions..."
                value={formData.additionalInfo}
                onChange={handleAdditionalInfoChange}
                rows={4}
                className="rounded-xl border-2 border-gray-200 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 resize-none"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isLoading || formData.interests.length === 0}
              className="w-full gap-3 bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white shadow-2xl hover:shadow-3xl hover:-translate-y-1 transform transition-all duration-300 font-semibold h-14 rounded-2xl text-lg border-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Generating Your Itinerary...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Generate My Itinerary
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </Button>

            {/* Form Validation Notice */}
            {formData.interests.length === 0 && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm text-center">
                💡 Select at least one interest to get the best personalized
                recommendations
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {itinerary && (
        <div className="mt-12">
          <ItineraryDisplay itinerary={itinerary} />
        </div>
      )}
    </div>
  )
}