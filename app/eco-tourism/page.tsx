import Image from "next/image"
import Link from "next/link"
import { Leaf, TreePine, Bird, Droplets, Shield, Users, Heart, Recycle, ArrowRight, Sparkles, Mountain } from "lucide-react"
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
      {/* Enhanced Hero Section */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/lush-green-waterfall-in-jharkhand-forest-with-mist.jpg"
            alt="Jharkhand eco-tourism"
            fill
            className="object-cover scale-105 animate-zoom"
            priority
          />
          {/* Multi-layer gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/70 via-green-900/40 to-teal-900/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-background/30" />
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-4 h-4 bg-emerald-400 rounded-full opacity-60" />
        </div>
        <div className="absolute bottom-40 right-20 animate-float-delayed">
          <div className="w-6 h-6 bg-green-400 rounded-full opacity-40" />
        </div>

        <div className="container mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-background/20 backdrop-blur-sm border border-emerald-300/30">
            <Leaf className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-medium text-white">Sustainable Tourism</span>
          </div>

          <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-balance md:text-7xl lg:text-8xl text-white">
            Eco-Tourism in{" "}
            <span className="bg-gradient-to-r from-emerald-300 via-green-300 to-emerald-400 bg-clip-text text-transparent">
              Jharkhand
            </span>
          </h1>
          
          <p className="mx-auto mb-10 max-w-2xl text-xl text-white/90 text-pretty drop-shadow-2xl leading-relaxed">
            Explore pristine forests, wildlife sanctuaries, and natural wonders while supporting conservation 
            efforts and empowering local communities through responsible travel
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="gap-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-2xl hover:shadow-3xl hover:-translate-y-1 transform transition-all duration-300 font-semibold h-14 rounded-2xl px-8 text-lg border-0"
            >
              <Link href="#natural-attractions">
                <TreePine className="h-5 w-5" />
                Explore Nature
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
                Plan Eco-Trip
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Why Eco-Tourism */}
      <section className="py-24 bg-gradient-to-b from-background to-emerald-50/30">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700">
              <Heart className="h-4 w-4 fill-emerald-400" />
              <span className="text-sm font-semibold">Sustainable Travel</span>
            </div>
            <h2 className="mb-6 font-serif text-4xl font-bold text-balance md:text-6xl">
              Why Choose <span className="text-emerald-600">Eco-Tourism?</span>
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground text-pretty leading-relaxed">
              Eco-tourism in Jharkhand combines adventure with responsibility, ensuring your visit protects the
              environment and benefits local communities for generations to come
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-green-50 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="mb-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 p-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-4 font-serif text-xl font-bold text-foreground">Conservation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Protect endangered species and preserve natural habitats for future generations
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-teal-50 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="mb-6 rounded-2xl bg-gradient-to-br from-green-500 to-teal-500 p-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-4 font-serif text-xl font-bold text-foreground">Community Support</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Empower local communities through sustainable tourism employment and income
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-teal-50 to-cyan-50 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="mb-6 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 p-4 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-4 font-serif text-xl font-bold text-foreground">Authentic Experience</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Connect deeply with nature and local culture through responsible travel
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-cyan-50 to-blue-50 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="mb-6 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 p-4 group-hover:scale-110 transition-transform duration-300">
                  <Recycle className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-4 font-serif text-xl font-bold text-foreground">Minimal Impact</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Travel responsibly with practices that minimize environmental footprint
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Natural Attractions */}
      <section id="natural-attractions" className="py-24 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700">
              <TreePine className="h-4 w-4" />
              <span className="text-sm font-semibold">Natural Wonders</span>
            </div>
            <h2 className="mb-6 font-serif text-4xl font-bold text-balance md:text-6xl">
              Natural <span className="text-emerald-600">Attractions</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty leading-relaxed">
              Discover Jharkhand's diverse ecosystems, from dense forests to cascading waterfalls and wildlife sanctuaries
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {ecoDestinations?.map((destination) => (
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
                  
                  {/* Hover content */}
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <Button asChild size="sm" className="w-full bg-white/90 backdrop-blur-sm text-foreground hover:bg-white">
                      <Link href={`/destinations#${destination.id}`}>
                        Explore Destination
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-emerald-600 transition-colors">
                      {destination.name}
                    </h3>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-emerald-600 transform group-hover:translate-x-1 transition-all" />
                  </div>
                  
                  <p className="mb-4 line-clamp-2 text-muted-foreground leading-relaxed text-sm">
                    {destination.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <TreePine className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">Eco-friendly destination</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {(!ecoDestinations || ecoDestinations.length === 0) && (
            <div className="py-12 text-center">
              <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 p-12 max-w-md mx-auto">
                <TreePine className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
                <h3 className="font-serif text-2xl font-bold text-foreground mb-2">Exploring New Destinations</h3>
                <p className="text-muted-foreground mb-6">
                  We're constantly adding new eco-tourism destinations to explore.
                </p>
                <Button asChild className="gap-2">
                  <Link href="/destinations">
                    View All Destinations
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Biodiversity Highlights */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700">
              <Bird className="h-4 w-4" />
              <span className="text-sm font-semibold">Biodiversity</span>
            </div>
            <h2 className="mb-6 font-serif text-4xl font-bold text-balance md:text-6xl">
              Rich <span className="text-emerald-600">Biodiversity</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty leading-relaxed">
              Jharkhand's diverse ecosystems support a wide variety of flora and fauna in pristine natural habitats
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-green-50 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="mb-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 p-6 group-hover:scale-110 transition-transform duration-300">
                  <Bird className="h-12 w-12 text-white" />
                </div>
                <h3 className="mb-4 font-serif text-2xl font-bold text-foreground">Wildlife</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Home to elephants, leopards, sloth bears, deer, and over 200 bird species including rare migratory birds
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-teal-50 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="mb-6 rounded-2xl bg-gradient-to-br from-green-500 to-teal-500 p-6 group-hover:scale-110 transition-transform duration-300">
                  <TreePine className="h-12 w-12 text-white" />
                </div>
                <h3 className="mb-4 font-serif text-2xl font-bold text-foreground">Forests</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dense sal forests, bamboo groves, and medicinal plants covering over 29% of the state's geographical area
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-teal-50 to-cyan-50 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="mb-6 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 p-6 group-hover:scale-110 transition-transform duration-300">
                  <Droplets className="h-12 w-12 text-white" />
                </div>
                <h3 className="mb-4 font-serif text-2xl font-bold text-foreground">Water Bodies</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Pristine rivers, stunning waterfalls, and reservoirs that support diverse aquatic ecosystems and local livelihoods
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Responsible Travel Guidelines */}
      <section className="py-24 bg-gradient-to-br from-emerald-900 via-green-900 to-teal-900 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 text-center">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                <Shield className="h-4 w-4 text-white" />
                <span className="text-sm font-semibold">Responsible Travel</span>
              </div>
              <h2 className="mb-6 font-serif text-4xl font-bold text-balance md:text-5xl">
                Responsible Travel Guidelines
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-white/80 leading-relaxed">
                Follow these principles to ensure your visit benefits both nature and local communities while preserving Jharkhand's natural beauty
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-0 bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-2xl bg-emerald-500/20 p-3 border border-emerald-400/30">
                      <Leaf className="h-6 w-6 text-emerald-300" />
                    </div>
                    <h3 className="font-serif text-xl font-bold">Leave No Trace</h3>
                  </div>
                  <p className="text-white/80 leading-relaxed">
                    Carry out all waste, avoid single-use plastics, and stay on designated trails to protect fragile ecosystems
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-2xl bg-green-500/20 p-3 border border-green-400/30">
                      <Users className="h-6 w-6 text-green-300" />
                    </div>
                    <h3 className="font-serif text-xl font-bold">Support Local</h3>
                  </div>
                  <p className="text-white/80 leading-relaxed">
                    Hire local guides, stay in community-run accommodations, and purchase authentic handicrafts directly from artisans
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-2xl bg-teal-500/20 p-3 border border-teal-400/30">
                      <Shield className="h-6 w-6 text-teal-300" />
                    </div>
                    <h3 className="font-serif text-xl font-bold">Respect Wildlife</h3>
                  </div>
                  <p className="text-white/80 leading-relaxed">
                    Maintain safe distances, never feed animals, avoid flash photography, and follow park regulations
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-2xl bg-cyan-500/20 p-3 border border-cyan-400/30">
                      <Heart className="h-6 w-6 text-cyan-300" />
                    </div>
                    <h3 className="font-serif text-xl font-bold">Cultural Sensitivity</h3>
                  </div>
                  <p className="text-white/80 leading-relaxed">
                    Respect local customs, seek permission before photographing people, and learn about indigenous traditions
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }} />
        </div>
        
        <div className="container relative mx-auto px-4 text-center">
          <Leaf className="h-16 w-16 mx-auto mb-6 text-emerald-600" />
          <h2 className="mb-6 font-serif text-4xl font-bold text-balance md:text-6xl">
            Ready for a <span className="text-emerald-600">Sustainable Adventure?</span>
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground text-pretty leading-relaxed">
            Plan your eco-friendly trip to Jharkhand and experience nature responsibly while supporting conservation efforts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gap-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-2xl hover:shadow-3xl rounded-2xl px-10 py-7 text-lg border-0">
              <Link href="/destinations">
                <TreePine className="h-5 w-5" />
                Explore Eco-Destinations
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-3 bg-white/80 backdrop-blur-sm border-emerald-200 text-emerald-700 hover:bg-white rounded-2xl px-10 py-7 text-lg">
              <Link href="/trip-planner">
                <Sparkles className="h-5 w-5" />
                Plan Eco-Trip
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}