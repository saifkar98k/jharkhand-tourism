import Image from "next/image"
import Link from "next/link"
import { MapPin, ExternalLink, Filter, ArrowRight, Sparkles, Mountain, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"

export const metadata = {
  title: "Destinations - Discover Jharkhand",
  description: "Explore waterfalls, temples, wildlife sanctuaries, and hill stations across Jharkhand",
}

export default async function DestinationsPage() {
  const supabase = await createClient()

  // Fetch all destinations
  const { data: destinations } = await supabase
    .from("destinations")
    .select("*")
    .order("featured", { ascending: false })
    .order("name", { ascending: true })

  // Get unique categories
  const categories = Array.from(new Set(destinations?.map((d) => d.category) || []))

  return (
    <main className="flex min-h-screen flex-col">
      {/* Enhanced Hero Section */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/jharkhand-landscape-mountains.jpg"
            alt="Jharkhand destinations"
            fill
            className="object-cover scale-105 animate-zoom"
            priority
          />
          {/* Multi-layer gradient overlay */}
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
            <Mountain className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-medium text-white">Explore Jharkhand</span>
          </div>

          <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-balance md:text-7xl lg:text-8xl text-white">
            Discover{" "}
            <span className="bg-gradient-to-r from-emerald-300 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
              Destinations
            </span>
          </h1>
          
          <p className="mx-auto mb-10 max-w-2xl text-xl text-white/90 text-pretty drop-shadow-2xl leading-relaxed">
            From thundering waterfalls to ancient temples, explore the natural wonders and cultural treasures 
            that make Jharkhand India's hidden gem
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="gap-3 bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white shadow-2xl hover:shadow-3xl hover:-translate-y-1 transform transition-all duration-300 font-semibold h-14 rounded-2xl px-8 text-lg border-0"
            >
              <Link href="#destinations-grid">
                <MapPin className="h-5 w-5" />
                Explore Destinations
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>

            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="gap-3 bg-background/20 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 hover:text-white h-14 rounded-2xl px-8 text-lg"
            >
              <Link href="/trip-planner">
                <Sparkles className="h-5 w-5" />
                AI Trip Planner
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Categories Filter */}
      <section className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-sm py-6 transition-all">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Filter className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-semibold whitespace-nowrap">Filter by:</span>
            </div>
            
            <div className="flex gap-2">
              <Badge 
                variant="outline" 
                className="cursor-pointer whitespace-nowrap border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-all duration-200 px-4 py-2"
              >
                All Destinations
              </Badge>
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant="outline"
                  className="cursor-pointer whitespace-nowrap border-gray-200 bg-white text-gray-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 px-4 py-2 capitalize"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Destinations Grid */}
      <section id="destinations-grid" className="py-24 bg-gradient-to-b from-background to-emerald-50/30">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-semibold">Must-Visit Places</span>
            </div>
            <h2 className="mb-6 font-serif text-4xl font-bold text-balance md:text-6xl">
              Featured <span className="text-emerald-600">Destinations</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty leading-relaxed">
              Discover breathtaking waterfalls, ancient temples, pristine wildlife sanctuaries, and serene hill stations across Jharkhand
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {destinations?.map((destination) => (
              <Card 
                key={destination.id}
                id={destination.id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-background"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={destination.image_url || "/placeholder.svg"}
                    alt={destination.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-medium capitalize">
                      {destination.category}
                    </span>
                  </div>
                  
                  {/* Featured badge */}
                  {destination.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-medium">
                        <Star className="h-3 w-3 fill-current" />
                        Featured
                      </span>
                    </div>
                  )}
                  
                  {/* Hover content */}
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex gap-2">
                      {destination.map_link && (
                        <Button asChild size="sm" className="flex-1 bg-white/90 backdrop-blur-sm text-foreground hover:bg-white">
                          <a href={destination.map_link} target="_blank" rel="noopener noreferrer">
                            <MapPin className="h-4 w-4 mr-2" />
                            View Map
                          </a>
                        </Button>
                      )}
                      <Button asChild size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm border-white/50 hover:bg-white">
                        <Link href={`/map?destination=${destination.id}`}>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-emerald-600 transition-colors">
                      {destination.name}
                    </h3>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-emerald-600 transform group-hover:translate-x-1 transition-all" />
                  </div>

                  <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{destination.location}</span>
                  </div>

                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {destination.description}
                  </p>

                  {/* Default buttons (visible on non-hover) */}
                  {/* <div className="flex gap-2 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                    {destination.map_link && (
                      <Button asChild variant="outline" size="sm" className="flex-1 gap-2">
                        <a href={destination.map_link} target="_blank" rel="noopener noreferrer">
                          <MapPin className="h-4 w-4" />
                          Map
                        </a>
                      </Button>
                    )}
                    <Button asChild variant="ghost" size="sm" className="gap-2">
                      <Link href={`/map?destination=${destination.id}`}>
                        <ExternalLink className="h-4 w-4" />
                        Explore
                      </Link>
                    </Button>
                  </div> */}
                </CardContent>
              </Card>
            ))}
          </div>

          {(!destinations || destinations.length === 0) && (
            <div className="py-20 text-center">
              <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-sky-50 p-12 max-w-md mx-auto">
                <MapPin className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
                <h3 className="font-serif text-2xl font-bold text-foreground mb-2">No Destinations Found</h3>
                <p className="text-muted-foreground mb-6">
                  We're working on adding more amazing destinations to explore.
                </p>
                <Button asChild className="gap-2">
                  <Link href="/trip-planner">
                    <Sparkles className="h-4 w-4" />
                    Plan Your Trip Anyway
                  </Link>
                </Button>
              </div>
            </div>
          )}
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
          <Sparkles className="h-16 w-16 mx-auto mb-6 text-amber-300" />
          <h2 className="mb-6 font-serif text-4xl font-bold text-balance md:text-6xl">
            Ready to <span className="text-amber-300">Explore?</span>
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-xl text-white/80 text-pretty leading-relaxed">
            Let our AI-powered trip planner create a personalized itinerary based on your interests, budget, and travel preferences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gap-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-2xl hover:shadow-3xl rounded-2xl px-10 py-7 text-lg border-0">
              <Link href="/trip-planner">
                <Sparkles className="h-5 w-5" />
                AI Trip Planner
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-3 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 rounded-2xl px-10 py-7 text-lg">
              <Link href="/culture">
                <Mountain className="h-5 w-5" />
                Explore Culture
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}