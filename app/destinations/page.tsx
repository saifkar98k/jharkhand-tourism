import Image from "next/image"
import Link from "next/link"
import { MapPin, ExternalLink, Filter } from "lucide-react"
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
      {/* Hero Section */}
      <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-background to-accent/20">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/jharkhand-landscape-mountains.jpg"
            alt="Jharkhand destinations"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>

        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="mb-4 font-serif text-5xl font-bold text-balance md:text-6xl">
            Explore <span className="text-primary">Destinations</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
            Discover breathtaking waterfalls, ancient temples, pristine wildlife sanctuaries, and serene hill stations
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="border-b border-border/40 bg-muted/30 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Categories:</span>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              All
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="cursor-pointer whitespace-nowrap hover:bg-primary hover:text-primary-foreground"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {destinations?.map((destination) => (
              <Card
                key={destination.id}
                id={destination.id}
                className="group overflow-hidden transition-all hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={destination.image_url || "/placeholder.svg"}
                    alt={destination.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute right-3 top-3">
                    <Badge className="bg-primary text-primary-foreground">{destination.category}</Badge>
                  </div>
                  {destination.featured && (
                    <div className="absolute left-3 top-3">
                      <Badge variant="secondary" className="bg-accent text-accent-foreground">
                        Featured
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <h3 className="mb-3 font-serif text-2xl font-bold text-balance">{destination.name}</h3>

                  <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span>{destination.location}</span>
                  </div>

                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{destination.description}</p>

                  <div className="flex gap-3">
                    {destination.map_link && (
                      <Button asChild variant="default" size="sm" className="flex-1 gap-2">
                        <a href={destination.map_link} target="_blank" rel="noopener noreferrer">
                          <MapPin className="h-4 w-4" />
                          View on Map
                        </a>
                      </Button>
                    )}
                    <Button asChild variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Link href={`/map?destination=${destination.id}`}>
                        <ExternalLink className="h-4 w-4" />
                        Details
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {(!destinations || destinations.length === 0) && (
            <div className="py-20 text-center">
              <p className="text-lg text-muted-foreground">No destinations found.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-balance md:text-4xl">
            Need Help Planning Your Visit?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground text-pretty">
            Our AI-powered trip planner can create a personalized itinerary based on your interests and travel
            preferences
          </p>
          <Button asChild size="lg">
            <Link href="/trip-planner">Get Personalized Recommendations</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
