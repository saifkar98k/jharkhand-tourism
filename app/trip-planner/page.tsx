import { TripPlannerForm } from "@/components/trip-planner-form"
import { Sparkles, Calendar, MapPin, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "AI Trip Planner - Discover Jharkhand",
  description: "Get personalized travel itineraries powered by AI based on your interests and preferences",
}

export default function TripPlannerPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              AI-Powered Planning
            </div>
            <h1 className="mb-4 font-serif text-5xl font-bold text-balance md:text-6xl">
              Plan Your Perfect <span className="text-primary">Jharkhand</span> Trip
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Get a personalized itinerary tailored to your interests, budget, and travel style. Our AI considers your
              preferences and recommends the best destinations, activities, and experiences.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="mb-2 font-serif text-2xl font-bold">How It Works</h2>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                  1
                </div>
                <h3 className="mb-2 font-semibold">Share Your Preferences</h3>
                <p className="text-sm text-muted-foreground">
                  Tell us about your interests, budget, and travel duration
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                  2
                </div>
                <h3 className="mb-2 font-semibold">AI Creates Your Plan</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI analyzes destinations and creates a personalized itinerary
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                  3
                </div>
                <h3 className="mb-2 font-semibold">Start Your Adventure</h3>
                <p className="text-sm text-muted-foreground">
                  Get detailed recommendations with maps and booking information
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trip Planner Form */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <TripPlannerForm />
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <h2 className="mb-2 font-serif text-3xl font-bold">What You'll Get</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">Day-by-Day Itinerary</h3>
                  <p className="text-sm text-muted-foreground">
                    Detailed schedule with optimal timing for each destination and activity
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="rounded-full bg-primary/10 p-3">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">Location Details</h3>
                  <p className="text-sm text-muted-foreground">
                    Maps, directions, and practical information for every recommended spot
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">Personalized Recommendations</h3>
                  <p className="text-sm text-muted-foreground">
                    Suggestions tailored to your specific interests and travel style
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">Local Insights</h3>
                  <p className="text-sm text-muted-foreground">
                    Cultural tips, best times to visit, and hidden gems only locals know
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
