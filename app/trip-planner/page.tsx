import { TripPlannerForm } from "@/components/trip-planner-form"
import { Sparkles, Calendar, MapPin, Heart, ArrowRight, Users, DollarSign, Compass, Star, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "AI Trip Planner - Discover Jharkhand",
  description: "Get personalized travel itineraries powered by AI based on your interests and preferences",
}

export default function TripPlannerPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Enhanced Hero Section */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/70 via-sky-900/40 to-blue-900/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-background/30" />
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-4 h-4 bg-emerald-400 rounded-full opacity-60" />
        </div>
        <div className="absolute bottom-40 right-20 animate-float-delayed">
          <div className="w-6 h-6 bg-sky-400 rounded-full opacity-40" />
        </div>

        <div className="container mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-background/20 backdrop-blur-sm border border-emerald-300/30">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-medium text-white">AI-Powered Planning</span>
          </div>

          <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-balance md:text-7xl lg:text-8xl text-white">
            Plan Your Perfect{" "}
            <span className="bg-gradient-to-r from-emerald-300 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
              Jharkhand
            </span>{" "}
            Trip
          </h1>
          
          <p className="mx-auto mb-10 max-w-2xl text-xl text-white/90 text-pretty drop-shadow-2xl leading-relaxed">
            Get a personalized itinerary tailored to your interests, budget, and travel style. 
            Our AI considers your preferences and recommends the best destinations, activities, and experiences.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="gap-3 bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white shadow-2xl hover:shadow-3xl hover:-translate-y-1 transform transition-all duration-300 font-semibold h-14 rounded-2xl px-8 text-lg border-0"
            >
              <a href="#trip-planner-form">
                <Sparkles className="h-5 w-5" />
                Start Planning Now
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>

            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="gap-3 bg-background/20 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 hover:text-white h-14 rounded-2xl px-8 text-lg"
            >
              <a href="#how-it-works">
                <Compass className="h-5 w-5" />
                How It Works
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced How It Works */}
      <section id="how-it-works" className="py-24 bg-gradient-to-b from-background to-emerald-50/30">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700">
              <Zap className="h-4 w-4 fill-emerald-400" />
              <span className="text-sm font-semibold">Simple & Smart</span>
            </div>
            <h2 className="mb-6 font-serif text-4xl font-bold text-balance md:text-6xl">
              How It <span className="text-emerald-600">Works</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty leading-relaxed">
              Get your perfect itinerary in just three simple steps with our AI-powered trip planner
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-sky-50 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="mb-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-sky-500 p-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg">
                    1
                  </div>
                </div>
                <h3 className="mb-4 font-serif text-xl font-bold text-foreground">Share Your Preferences</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Tell us about your interests, budget, travel duration, and style preferences
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-sky-50 to-blue-50 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="mb-6 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-500 p-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg">
                    2
                  </div>
                </div>
                <h3 className="mb-4 font-serif text-xl font-bold text-foreground">AI Creates Your Plan</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our AI analyzes destinations and creates a personalized itinerary just for you
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 p-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg">
                    3
                  </div>
                </div>
                <h3 className="mb-4 font-serif text-xl font-bold text-foreground">Start Your Adventure</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get detailed recommendations with maps, timing, and booking information
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Trip Planner Form */}
      <section id="trip-planner-form" className="py-24 bg-gradient-to-br from-emerald-50 via-sky-50 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700">
              <Compass className="h-4 w-4" />
              <span className="text-sm font-semibold">Your Journey Starts Here</span>
            </div>
            <h2 className="mb-6 font-serif text-4xl font-bold text-balance md:text-6xl">
              Create Your <span className="text-emerald-600">Itinerary</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty leading-relaxed">
              Fill in your preferences and let our AI craft the perfect Jharkhand adventure for you
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <TripPlannerForm />
          </div>
        </div>
      </section>

      {/* Enhanced Features */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700">
              <Star className="h-4 w-4 fill-emerald-400" />
              <span className="text-sm font-semibold">Premium Features</span>
            </div>
            <h2 className="mb-6 font-serif text-4xl font-bold text-balance md:text-6xl">
              What You'll <span className="text-emerald-600">Get</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty leading-relaxed">
              Comprehensive travel planning with personalized recommendations and local insights
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-sky-50 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="flex items-start gap-6 p-8">
                <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-sky-500 p-4 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="mb-3 font-serif text-xl font-bold text-foreground">Day-by-Day Itinerary</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Detailed schedule with optimal timing for each destination and activity, including travel time and rest periods
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-sky-50 to-blue-50 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="flex items-start gap-6 p-8">
                <div className="rounded-2xl bg-gradient-to-br from-sky-500 to-blue-500 p-4 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="mb-3 font-serif text-xl font-bold text-foreground">Location Details</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Interactive maps, directions, and practical information for every recommended spot with photos and reviews
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="flex items-start gap-6 p-8">
                <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 p-4 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="mb-3 font-serif text-xl font-bold text-foreground">Personalized Recommendations</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Tailored suggestions based on your specific interests, travel style, and budget constraints
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="flex items-start gap-6 p-8">
                <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 p-4 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="mb-3 font-serif text-xl font-bold text-foreground">Local Insights</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Cultural tips, best times to visit, hidden gems, and authentic experiences only locals know about
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-violet-50 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="flex items-start gap-6 p-8">
                <div className="rounded-2xl bg-gradient-to-br from-purple-500 to-violet-500 p-4 group-hover:scale-110 transition-transform duration-300">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="mb-3 font-serif text-xl font-bold text-foreground">Budget Optimization</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Cost-effective recommendations with estimated expenses and money-saving tips for your entire trip
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-violet-50 to-fuchsia-50 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="flex items-start gap-6 p-8">
                <div className="rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 p-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="mb-3 font-serif text-xl font-bold text-foreground">Group Planning</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Family-friendly or group-oriented itineraries that cater to different ages and interests within your travel party
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-900 to-sky-900 text-white">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }} />
        </div>
        
        <div className="container relative mx-auto px-4 text-center">
          <Sparkles className="h-16 w-16 mx-auto mb-6 text-emerald-300" />
          <h2 className="mb-6 font-serif text-4xl font-bold text-balance md:text-6xl">
            Ready to <span className="text-emerald-300">Explore?</span>
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-xl text-white/80 text-pretty leading-relaxed">
            Let our AI create your perfect Jharkhand itinerary. Get personalized recommendations, hidden gems, and the best routes tailored just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gap-3 bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white shadow-2xl hover:shadow-3xl rounded-2xl px-10 py-7 text-lg border-0">
              <a href="#trip-planner-form">
                <Sparkles className="h-5 w-5" />
                Create My Itinerary
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-3 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 rounded-2xl px-10 py-7 text-lg">
              <a href="/destinations">
                <MapPin className="h-5 w-5" />
                Explore Destinations
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}