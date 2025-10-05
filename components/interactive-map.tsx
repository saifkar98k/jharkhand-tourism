"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, ExternalLink, Loader2 } from "lucide-react"
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
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Sidebar with destination list */}
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <div className="mb-4">
              <h2 className="mb-3 font-serif text-xl font-bold">Filter by Category</h2>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === "all" ? "All" : category}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 font-semibold">
                {filteredDestinations.length} {filteredDestinations.length === 1 ? "Destination" : "Destinations"}
              </h3>
              <div className="max-h-[600px] space-y-3 overflow-y-auto pr-2">
                {filteredDestinations.map((destination) => (
                  <Card key={destination.id} className="cursor-pointer transition-shadow hover:shadow-md">
                    <CardContent className="p-4">
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <h4 className="font-semibold leading-tight">{destination.name}</h4>
                        <Badge variant="secondary" className="flex-shrink-0 text-xs">
                          {destination.category}
                        </Badge>
                      </div>
                      <p className="mb-2 text-xs text-muted-foreground">{destination.location}</p>
                      {destination.map_link && (
                        <Button asChild variant="outline" size="sm" className="w-full gap-2 bg-transparent">
                          <a href={destination.map_link} target="_blank" rel="noopener noreferrer">
                            <MapPin className="h-3 w-3" />
                            View on Map
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main map area with grid view */}
        <div className="lg:col-span-2">
          <div className="mb-6 rounded-lg bg-muted/50 p-6 text-center">
            <MapPin className="mx-auto mb-3 h-12 w-12 text-primary" />
            <h3 className="mb-2 font-serif text-xl font-bold">Explore Jharkhand</h3>
            <p className="text-sm text-muted-foreground">
              Click on any destination card to view its location on Google Maps
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {filteredDestinations.map((destination) => (
              <Card key={destination.id} className="group overflow-hidden transition-all hover:shadow-lg">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={destination.image_url || "/placeholder.svg"}
                    alt={destination.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {destination.featured && (
                    <div className="absolute left-3 top-3">
                      <Badge className="bg-accent text-accent-foreground">Featured</Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-4">
                  <h3 className="mb-2 font-serif text-lg font-bold text-balance">{destination.name}</h3>

                  <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 flex-shrink-0" />
                    <span>{destination.location}</span>
                  </div>

                  <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{destination.description}</p>

                  <div className="flex gap-2">
                    {destination.map_link && (
                      <Button asChild variant="default" size="sm" className="flex-1 gap-2">
                        <a href={destination.map_link} target="_blank" rel="noopener noreferrer">
                          <MapPin className="h-3 w-3" />
                          Map
                        </a>
                      </Button>
                    )}
                    <Button asChild variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Link href={`/destinations#${destination.id}`}>
                        <ExternalLink className="h-3 w-3" />
                        Details
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
