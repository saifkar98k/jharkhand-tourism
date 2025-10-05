import Image from "next/image"
import Link from "next/link"
import { Leaf, TreePine, Bird, Droplets, Shield, Users, Heart, Recycle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"

export const metadata = {
  title: "Eco-Tourism - Discover Jharkhand",
  description:
    "Experience sustainable tourism in Jharkhand's pristine forests, wildlife sanctuaries, and natural wonders",
}

export default async function EcoTourismPage() {
  const supabase = await createClient()

  // Fetch eco-tourism destinations
  const { data: ecoDestinations } = await supabase
    .from("destinations")
    .select("*")
    .in("category", ["Wildlife Sanctuary", "National Park", "Forest", "Waterfall"])
    .order("name", { ascending: true })

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-background to-primary/10">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/lush-green-waterfall-in-jharkhand-forest-with-mist.jpg"
            alt="Jharkhand eco-tourism"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>

        <div className="container mx-auto px-4 py-20 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Leaf className="h-4 w-4" />
            Sustainable Tourism
          </div>
          <h1 className="mb-4 font-serif text-5xl font-bold text-balance md:text-6xl">
            Eco-Tourism in <span className="text-primary">Jharkhand</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
            Explore pristine forests, wildlife sanctuaries, and natural wonders while supporting conservation and local
            communities
          </p>
        </div>
      </section>

      {/* Why Eco-Tourism */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">Why Choose Eco-Tourism?</h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground text-pretty">
              Eco-tourism in Jharkhand combines adventure with responsibility, ensuring your visit protects the
              environment and benefits local communities
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-primary/20">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 font-serif text-lg font-bold">Conservation</h3>
                <p className="text-sm text-muted-foreground">
                  Protect endangered species and preserve natural habitats for future generations
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 font-serif text-lg font-bold">Community Support</h3>
                <p className="text-sm text-muted-foreground">
                  Empower local communities through sustainable tourism employment and income
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 font-serif text-lg font-bold">Authentic Experience</h3>
                <p className="text-sm text-muted-foreground">
                  Connect deeply with nature and local culture through responsible travel
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-4">
                  <Recycle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 font-serif text-lg font-bold">Minimal Impact</h3>
                <p className="text-sm text-muted-foreground">
                  Travel responsibly with practices that minimize environmental footprint
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Natural Attractions */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">Natural Attractions</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground text-pretty">
              Discover Jharkhand's diverse ecosystems, from dense forests to cascading waterfalls
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ecoDestinations?.map((destination) => (
              <Card key={destination.id} className="group overflow-hidden transition-shadow hover:shadow-lg">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={destination.image_url || "/placeholder.svg"}
                    alt={destination.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    {destination.category}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-2 font-serif text-xl font-bold">{destination.name}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{destination.description}</p>
                  <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                    <Link href={`/destinations#${destination.id}`}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Biodiversity Highlights */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">Rich Biodiversity</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground text-pretty">
              Jharkhand's diverse ecosystems support a wide variety of flora and fauna
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-6">
                <Bird className="h-12 w-12 text-primary" />
              </div>
              <h3 className="mb-3 font-serif text-2xl font-bold">Wildlife</h3>
              <p className="text-muted-foreground leading-relaxed">
                Home to elephants, leopards, sloth bears, deer, and over 200 bird species including rare migratory birds
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-6">
                <TreePine className="h-12 w-12 text-primary" />
              </div>
              <h3 className="mb-3 font-serif text-2xl font-bold">Forests</h3>
              <p className="text-muted-foreground leading-relaxed">
                Dense sal forests, bamboo groves, and medicinal plants covering over 29% of the state's geographical
                area
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-6">
                <Droplets className="h-12 w-12 text-primary" />
              </div>
              <h3 className="mb-3 font-serif text-2xl font-bold">Water Bodies</h3>
              <p className="text-muted-foreground leading-relaxed">
                Pristine rivers, stunning waterfalls, and reservoirs that support diverse aquatic ecosystems and local
                livelihoods
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Responsible Travel Guidelines */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <h2 className="mb-4 font-serif text-3xl font-bold text-balance">Responsible Travel Guidelines</h2>
              <p className="text-muted-foreground">
                Follow these principles to ensure your visit benefits both nature and local communities
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Leaf className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Leave No Trace</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Carry out all waste, avoid single-use plastics, and stay on designated trails to protect fragile
                    ecosystems
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Support Local</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Hire local guides, stay in community-run accommodations, and purchase authentic handicrafts directly
                    from artisans
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Respect Wildlife</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Maintain safe distances, never feed animals, avoid flash photography, and follow park regulations
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Heart className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Cultural Sensitivity</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Respect local customs, seek permission before photographing people, and learn about indigenous
                    traditions
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-balance md:text-4xl">
            Ready for a Sustainable Adventure?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground text-pretty">
            Plan your eco-friendly trip to Jharkhand and experience nature responsibly
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/destinations">Explore Eco-Destinations</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/trip-planner">Plan Your Trip</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
