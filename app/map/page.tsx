import { InteractiveMap } from "@/components/interactive-map"
import { MapPin, Navigation, Compass, Layers, Filter, ArrowRight, Sparkles, Mountain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "Interactive Map - Discover Jharkhand",
  description: "Explore all tourist destinations in Jharkhand on an interactive map",
}

export default function MapPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Enhanced Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-900 via-blue-900 to-indigo-900 text-white">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }} />
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-4 h-4 bg-sky-400 rounded-full opacity-60" />
        </div>
        <div className="absolute bottom-20 right-20 animate-float-delayed">
          <div className="w-6 h-6 bg-blue-400 rounded-full opacity-40" />
        </div>

        <div className="container relative mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-sky-300/30">
                <Compass className="h-4 w-4 text-sky-400" />
                <span className="text-sm font-medium text-white">Interactive Explorer</span>
              </div>

              <h1 className="mb-4 font-serif text-4xl font-bold text-balance md:text-6xl">
                Explore{" "}
                <span className="bg-gradient-to-r from-sky-300 via-blue-300 to-sky-400 bg-clip-text text-transparent">
                  Jharkhand
                </span>{" "}
                Map
              </h1>
              
              <p className="mb-8 text-lg text-white/80 text-pretty leading-relaxed max-w-2xl">
                Discover breathtaking destinations, plan your routes, and explore the hidden gems of Jharkhand with our interactive map
              </p>

              <div className="flex flex-wrap gap-4">
                <Button asChild className="gap-3 bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white shadow-2xl hover:shadow-3xl rounded-xl">
                  <a href="#map-features">
                    <Navigation className="h-5 w-5" />
                    Start Exploring
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </Button>

                <Button asChild variant="outline" className="gap-3 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 rounded-xl">
                  <a href="/trip-planner">
                    <Sparkles className="h-5 w-5" />
                    AI Trip Planner
                  </a>
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <Card className="border-0 bg-white/10 backdrop-blur-sm border-white/20 text-white lg:max-w-sm">
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-sky-300" />
                  Map Features
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Destinations</span>
                    <span className="font-semibold">50+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Categories</span>
                    <span className="font-semibold">8+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Routes</span>
                    <span className="font-semibold">15+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Live Tracking</span>
                    <span className="font-semibold">✓</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Controls Bar */}
      <section className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-sm py-4 transition-all">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Filter className="h-4 w-4 text-sky-600" />
                <span>Filter by:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["All", "Waterfalls", "Temples", "Wildlife", "Forests", "Heritage", "Adventure"].map((category) => (
                  <button
                    key={category}
                    className="px-3 py-1.5 rounded-full text-sm font-medium transition-all border border-gray-200 bg-white text-gray-700 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 capitalize"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <Layers className="h-4 w-4" />
                Map Layers
              </Button>
              <Button size="sm" className="gap-2 bg-sky-600 hover:bg-sky-700">
                <Navigation className="h-4 w-4" />
                My Location
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Map Section */}
      <section id="map-features" className="flex-1 min-h-[70vh]">
        <InteractiveMap />
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-background to-sky-50/30">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-sky-50 text-sky-700">
              <Navigation className="h-4 w-4" />
              <span className="text-sm font-semibold">Map Features</span>
            </div>
            <h2 className="mb-6 font-serif text-4xl font-bold text-balance md:text-5xl">
              Powerful <span className="text-sky-600">Exploration</span> Tools
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty leading-relaxed">
              Discover Jharkhand like never before with our advanced interactive map features
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-sky-50 to-blue-50 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-500 p-4 group-hover:scale-110 transition-transform duration-300">
                  <Compass className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-3 font-serif text-xl font-bold text-foreground">Smart Navigation</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Find the best routes and directions to all major destinations with real-time guidance
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 p-4 group-hover:scale-110 transition-transform duration-300">
                  <Layers className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-3 font-serif text-xl font-bold text-foreground">Multiple Layers</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Switch between terrain, satellite, and roadmap views to explore different perspectives
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 p-4 group-hover:scale-110 transition-transform duration-300">
                  <Filter className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-3 font-serif text-xl font-bold text-foreground">Smart Filtering</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Filter destinations by category, distance, ratings, and accessibility preferences
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-4 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-3 font-serif text-xl font-bold text-foreground">Rich Details</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Get comprehensive information, photos, and visitor tips for every destination
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-900 via-sky-900 to-blue-900 text-white">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }} />
        </div>
        
        <div className="container relative mx-auto px-4 text-center">
          <Navigation className="h-16 w-16 mx-auto mb-6 text-sky-300" />
          <h2 className="mb-6 font-serif text-4xl font-bold text-balance md:text-6xl">
            Ready to <span className="text-sky-300">Explore?</span>
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-xl text-white/80 text-pretty leading-relaxed">
            Start your Jharkhand adventure today with our interactive map and AI-powered trip planning tools
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gap-3 bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white shadow-2xl hover:shadow-3xl rounded-2xl px-10 py-7 text-lg border-0">
              <a href="#map-features">
                <Compass className="h-5 w-5" />
                Start Exploring Map
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-3 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 rounded-2xl px-10 py-7 text-lg">
              <a href="/trip-planner">
                <Sparkles className="h-5 w-5" />
                AI Trip Planner
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}