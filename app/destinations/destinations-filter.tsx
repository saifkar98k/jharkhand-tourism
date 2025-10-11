"use client"

import { useState } from "react"
import { MapPin, ExternalLink, Filter, ArrowRight, Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { useFavorites, Destination } from "@/context/favorites-context"

interface DestinationsFilterProps {
  categories: string[]
  destinations: Destination[]
}

export function DestinationsFilter({ categories, destinations }: DestinationsFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const { addToFavorites, removeFromFavorites, isFavorite, isLoading } = useFavorites()

  const filteredDestinations = selectedCategory === "all" 
    ? destinations 
    : destinations.filter(destination => destination.category === selectedCategory)

  const handleFavoriteClick = (destination: Destination) => {
    if (isFavorite(destination.id)) {
      removeFromFavorites(destination.id)
    } else {
      addToFavorites(destination)
    }
  }

  return (
    <>
      {/* Enhanced Categories Filter - Moved just above cards */}
      <div className="sticky top-4 z-40 mb-12 border border-border/40 bg-background/80 backdrop-blur-sm py-4 px-6 rounded-2xl shadow-lg transition-all">
        <div className="flex items-center gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Filter className="h-5 w-5 text-emerald-600" />
            <span className="text-sm font-semibold whitespace-nowrap">Filter by:</span>
          </div>
          
          <div className="flex gap-2">
            <Badge 
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className={`cursor-pointer whitespace-nowrap transition-all duration-200 px-4 py-2 ${
                selectedCategory === "all" 
                  ? "bg-emerald-500 text-white hover:bg-emerald-600" 
                  : "border-gray-200 bg-white text-gray-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
              }`}
            >
              All Destinations
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`cursor-pointer whitespace-nowrap transition-all duration-200 px-4 py-2 capitalize ${
                  selectedCategory === category
                    ? "bg-emerald-500 text-white hover:bg-emerald-600"
                    : "border-gray-200 bg-white text-gray-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDestinations?.map((destination) => {
          const favorite = !isLoading && isFavorite(destination.id)
          return (
            <Card 
              key={destination.id}
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
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-white/90 backdrop-blur-sm border-white/50 hover:bg-white"
                      onClick={() => handleFavoriteClick(destination)}
                      disabled={isLoading}
                    >
                      <Heart 
                        className={`h-4 w-4 mr-2 ${favorite ? 'fill-red-500 text-red-500' : ''}`} 
                      />
                      {favorite ? "Remove" : "Add to Fav"}
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

                {/* Show favorite status when not hovering */}
                <div className="flex items-center justify-between opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {favorite && (
                      <>
                        <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                        <span className="text-red-600 font-medium">In Favorites</span>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {(!filteredDestinations || filteredDestinations.length === 0) && (
        <div className="py-20 text-center">
          <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-sky-50 p-12 max-w-md mx-auto">
            <MapPin className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-bold text-foreground mb-2">No Destinations Found</h3>
            <p className="text-muted-foreground mb-6">
              {selectedCategory === "all" 
                ? "We're working on adding more amazing destinations to explore."
                : `No destinations found in the ${selectedCategory} category.`
              }
            </p>
            {selectedCategory !== "all" && (
              <Button 
                onClick={() => setSelectedCategory("all")}
                className="gap-2 mb-4"
              >
                Show All Destinations
              </Button>
            )}
            <Button asChild className="gap-2">
              <Link href="/trip-planner">
                <Sparkles className="h-4 w-4" />
                Plan Your Trip Anyway
              </Link>
            </Button>
          </div>
        </div>
      )}
    </>
  )
}