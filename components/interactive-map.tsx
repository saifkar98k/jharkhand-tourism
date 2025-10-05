"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, ExternalLink, Loader2, Filter, Navigation, Compass, Star, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Destination {
  id: string
  name: string
  description: string
  location: string
  category: string
  image_url: string | null
  map_link: string | null
  featured: boolean
}

export function InteractiveMap() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchDestinations() {
      const supabase = createClient()
      const { data } = await supabase.from("destinations").select("*").order("name", { ascending: true })

      if (data) {
        console.log({data})
        setDestinations(data)
      }
      setIsLoading(false)
    }

    fetchDestinations()
  }, [])

  const categories = ["all", ...Array.from(new Set(destinations.map((d) => d.category)))]

  const filteredDestinations =
    selectedCategory === "all" ? destinations : destinations.filter((d) => d.category === selectedCategory)

  if (isLoading) {
    return (
      <div className="flex h-[600px] items-center justify-center">
        <div className="text-center">
          <div className="relative mb-4">
            <Loader2 className="h-12 w-12 animate-spin text-sky-600 mx-auto" />
            <Compass className="h-6 w-6 text-sky-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <h3 className="font-serif text-xl font-bold text-foreground mb-2">Loading Destinations</h3>
          <p className="text-muted-foreground">Discovering amazing places in Jharkhand...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Enhanced Sidebar with destination list */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Filter Section */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-sky-50 to-blue-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="h-5 w-5 text-sky-600" />
                  <h2 className="font-serif text-xl font-bold text-foreground">Filter Destinations</h2>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-sky-500 to-blue-500 text-white shadow-lg scale-105"
                          : "bg-white text-gray-700 border border-gray-200 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
                      }`}
                    >
                      {category === "all" ? "All Destinations" : category}
                    </button>
                  ))}
                </div>

                {/* Results Count */}
                <div className="mt-4 p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-sky-200">
                  <p className="text-sm font-semibold text-sky-700">
                    {filteredDestinations.length} {filteredDestinations.length === 1 ? "Destination" : "Destinations"} Found
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Destinations List */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Navigation className="h-5 w-5 text-sky-600" />
                  <h3 className="font-serif text-xl font-bold text-foreground">Quick Navigation</h3>
                </div>

                <div className="max-h-[600px] space-y-4 overflow-y-auto pr-2">
                  {filteredDestinations.map((destination) => (
                    <Card 
                      key={destination.id} 
                      className="cursor-pointer border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white group"
                      onClick={() => window.open(destination.map_link || '#', '_blank')}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h4 className="font-semibold leading-tight text-foreground group-hover:text-sky-600 transition-colors">
                            {destination.name}
                          </h4>
                          <Badge 
                            className="flex-shrink-0 text-xs bg-gradient-to-r from-sky-500 to-blue-500 text-white border-0"
                          >
                            {destination.category}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                          <MapPin className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{destination.location}</span>
                        </div>

                        {destination.map_link && (
                          <Button 
                            size="sm" 
                            className="w-full gap-2 bg-sky-600 hover:bg-sky-700 text-white text-xs"
                          >
                            <MapPin className="h-3 w-3" />
                            View on Map
                            <ArrowRight className="h-3 w-3" />
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredDestinations.length === 0 && (
                  <div className="text-center py-8">
                    <Compass className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-muted-foreground text-sm">No destinations found for this filter.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Main map area with grid view */}
        <div className="lg:col-span-2">
          {/* Header Card */}
          <Card className="border-0 shadow-xl bg-gradient-to-r from-sky-500 to-blue-500 text-white mb-8 overflow-hidden">
            <CardContent className="p-8 text-center relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: '30px 30px'
                }} />
              </div>

              <Compass className="h-16 w-16 mx-auto mb-4 text-sky-200" />
              <h3 className="mb-3 font-serif text-2xl font-bold">Explore Jharkhand</h3>
              <p className="text-sky-100 leading-relaxed max-w-md mx-auto">
                Click on any destination card to view its location on Google Maps and discover hidden gems
              </p>
            </CardContent>
          </Card>

          {/* Destinations Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {filteredDestinations.map((destination) => (
              <Card 
                key={destination.id} 
                className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white"
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
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sky-500 text-white text-xs font-medium capitalize">
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
                        <Button 
                          asChild 
                          size="sm" 
                          className="flex-1 bg-white/90 backdrop-blur-sm text-foreground hover:bg-white"
                        >
                          <a href={destination.map_link} target="_blank" rel="noopener noreferrer">
                            <MapPin className="h-4 w-4 mr-2" />
                            View Map
                          </a>
                        </Button>
                      )}
                      <Button 
                        asChild 
                        size="sm" 
                        variant="outline" 
                        className="bg-white/90 backdrop-blur-sm border-white/50 hover:bg-white"
                      >
                        <Link href={`/destinations#${destination.id}`}>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-sky-600 transition-colors">
                      {destination.name}
                    </h3>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-sky-600 transform group-hover:translate-x-1 transition-all" />
                  </div>

                  <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{destination.location}</span>
                  </div>

                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {destination.description}
                  </p>

                  {/* Default buttons (visible on non-hover) */}
                  <div className="flex gap-2 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                    {destination.map_link && (
                      <Button 
                        asChild 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 gap-2 border-sky-200 text-sky-700 hover:bg-sky-50"
                      >
                        <a href={destination.map_link} target="_blank" rel="noopener noreferrer">
                          <MapPin className="h-4 w-4" />
                          Map
                        </a>
                      </Button>
                    )}
                    <Button 
                      asChild 
                      variant="ghost" 
                      size="sm" 
                      className="gap-2 text-muted-foreground hover:text-sky-700"
                    >
                      <Link href={`/destinations#${destination.id}`}>
                        <ExternalLink className="h-4 w-4" />
                        Explore
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <Card className="border-0 shadow-lg bg-gradient-to-br from-sky-50 to-blue-50">
              <CardContent className="p-12 text-center">
                <Compass className="h-16 w-16 text-sky-400 mx-auto mb-4" />
                <h3 className="font-serif text-2xl font-bold text-foreground mb-2">No Destinations Found</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Try selecting a different category or explore all destinations to see more options.
                </p>
                <Button 
                  onClick={() => setSelectedCategory("all")}
                  className="gap-2 bg-sky-600 hover:bg-sky-700 text-white"
                >
                  <Filter className="h-4 w-4" />
                  Show All Destinations
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}