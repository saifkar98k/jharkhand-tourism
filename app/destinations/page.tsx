import Image from "next/image"
import Link from "next/link"
import { MapPin, ExternalLink, Filter, ArrowRight, Sparkles, Mountain, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"
import { DestinationsFilter } from "./destinations-filter"

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

          {/* Filter Component */}
          <DestinationsFilter 
            categories={categories} 
            destinations={destinations || []} 
          />
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