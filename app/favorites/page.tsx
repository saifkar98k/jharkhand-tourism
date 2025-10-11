"use client"

import { useFavorites } from "@/context/favorites-context"
import { MapPin, ExternalLink, ArrowRight, Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites()

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-900 via-sky-900 to-blue-900 text-white">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-balance md:text-6xl">
            Your <span className="text-amber-300">Favorites</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-xl text-white/80 text-pretty leading-relaxed">
            Your curated list of must-visit destinations in Jharkhand
          </p>
        </div>
      </section>

      {/* Favorites Grid */}
      <section className="py-24 bg-gradient-to-b from-background to-emerald-50/30">
        <div className="container mx-auto px-4">
          {favorites.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {favorites.map((destination) => (
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
                          onClick={() => removeFromFavorites(destination.id)}
                        >
                          <Heart className="h-4 w-4 mr-2 fill-red-500 text-red-500" />
                          Remove
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
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-sky-50 p-12 max-w-md mx-auto">
                <Heart className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
                <h3 className="font-serif text-2xl font-bold text-foreground mb-2">No Favorites Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start exploring and add your favorite destinations to this list!
                </p>
                <Button asChild className="gap-2">
                  <Link href="/destinations">
                    Explore Destinations
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}