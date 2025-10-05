import Image from "next/image"
import Link from "next/link"
import { Landmark, Music, Palette, Calendar, ArrowRight, Users, Sparkles, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { createClient } from "@/lib/supabase/server"

export const metadata = {
  title: "Culture & Heritage - Discover Jharkhand",
  description: "Explore the rich tribal heritage, traditional art forms, and cultural treasures of Jharkhand",
}

export default async function CulturePage() {
  const supabase = await createClient()

  // Fetch cultural sites
  const { data: culturalSites } = await supabase.from("cultural_sites").select("*").order("name", { ascending: true })

  return (
    <main className="flex min-h-screen flex-col">
      {/* Enhanced Hero Section */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/tribal-dance-performance-in-jharkhand-with-traditi.jpg"
            alt="Jharkhand tribal culture"
            fill
            className="object-cover scale-105 animate-zoom"
            priority
          />
          {/* Multi-layer gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/70 via-orange-900/40 to-red-900/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-background/30" />
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-4 h-4 bg-amber-400 rounded-full opacity-60" />
        </div>
        <div className="absolute bottom-40 right-20 animate-float-delayed">
          <div className="w-6 h-6 bg-orange-400 rounded-full opacity-40" />
        </div>

        <div className="container mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-background/20 backdrop-blur-sm border border-amber-300/30">
            <Heart className="h-4 w-4 text-amber-400 fill-amber-400" />
            <span className="text-sm font-medium text-white">Cultural Heritage</span>
          </div>

          <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-balance md:text-7xl lg:text-8xl text-white">
            Culture &{" "}
            <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-amber-400 bg-clip-text text-transparent">
              Heritage
            </span>
          </h1>
          
          <p className="mx-auto mb-10 max-w-2xl text-xl text-white/90 text-pretty drop-shadow-2xl leading-relaxed">
            Immerse yourself in the vibrant traditions, ancient wisdom, and artistic expressions of Jharkhand's 
            indigenous communities that have thrived for millennia
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="gap-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-2xl hover:shadow-3xl hover:-translate-y-1 transform transition-all duration-300 font-semibold h-14 rounded-2xl px-8 text-lg border-0"
            >
              <Link href="#heritage-sites">
                <Landmark className="h-5 w-5" />
                Explore Heritage Sites
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
                Plan Cultural Tour
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Tribal Communities Overview */}
      <section className="py-24 bg-gradient-to-b from-background to-amber-50/30">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-amber-50 text-amber-700">
              <Users className="h-4 w-4" />
              <span className="text-sm font-semibold">Indigenous Communities</span>
            </div>
            <h2 className="mb-6 font-serif text-4xl font-bold text-balance md:text-6xl">
              Tribal <span className="text-amber-600">Communities</span>
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground text-pretty leading-relaxed">
              Jharkhand is home to over 30 indigenous tribes, each with unique languages, customs, and cultural
              practices that have been preserved for generations
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="mb-4 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 p-4 w-fit mx-auto group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">🎭</span>
                </div>
                <h3 className="mb-3 font-serif text-xl font-bold text-foreground">Santhal</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The largest tribal community known for vibrant festivals, traditional Sohrai art, and rich oral literature
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 p-4 w-fit mx-auto group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">🌿</span>
                </div>
                <h3 className="mb-3 font-serif text-xl font-bold text-foreground">Munda</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ancient community with deep connection to nature, known for agricultural practices and folk dances
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-pink-50 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="mb-4 rounded-2xl bg-gradient-to-br from-red-500 to-pink-500 p-4 w-fit mx-auto group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">🎵</span>
                </div>
                <h3 className="mb-3 font-serif text-xl font-bold text-foreground">Oraon</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Community celebrated for traditional music, Karma dance, and intricate bamboo craftsmanship
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-50 to-rose-50 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="mb-4 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 p-4 w-fit mx-auto group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">⚔️</span>
                </div>
                <h3 className="mb-3 font-serif text-xl font-bold text-foreground">Ho</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Indigenous people known for warrior traditions, unique language, and vibrant cultural festivals
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Cultural Highlights */}
      <section className="py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-amber-100 text-amber-700">
              <Sparkles className="h-4 w-4 fill-amber-400" />
              <span className="text-sm font-semibold">Cultural Treasures</span>
            </div>
            <h2 className="mb-6 font-serif text-4xl font-bold text-balance md:text-6xl">
              Cultural <span className="text-amber-600">Highlights</span>
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-0 shadow-lg bg-background/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="mb-6 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 p-4 group-hover:scale-110 transition-transform duration-300">
                  <Music className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-4 font-serif text-xl font-bold text-foreground">Traditional Music</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Experience folk songs, tribal drums, and traditional instruments like Mandar, Tumdak, and Tamak
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-background/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="mb-6 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 p-4 group-hover:scale-110 transition-transform duration-300">
                  <Palette className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-4 font-serif text-xl font-bold text-foreground">Traditional Art</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Discover Sohrai and Khovar wall paintings, Paitkar scroll art, and intricate tribal handicrafts
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-background/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="mb-6 rounded-2xl bg-gradient-to-br from-red-500 to-pink-500 p-4 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-4 font-serif text-xl font-bold text-foreground">Festivals</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Celebrate Sarhul, Karma, Sohrai, and Tusu festivals with traditional dances and rituals
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-background/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="mb-6 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 p-4 group-hover:scale-110 transition-transform duration-300">
                  <Landmark className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-4 font-serif text-xl font-bold text-foreground">Sacred Sites</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Visit ancient temples, sacred groves, and historical monuments that tell stories of centuries past
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Cultural Sites */}
      <section id="heritage-sites" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-amber-50 text-amber-700">
              <Landmark className="h-4 w-4" />
              <span className="text-sm font-semibold">Heritage Exploration</span>
            </div>
            <h2 className="mb-6 font-serif text-4xl font-bold text-balance md:text-6xl">
              Heritage <span className="text-amber-600">Sites</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty leading-relaxed">
              Explore museums, temples, and cultural centers that preserve and celebrate Jharkhand's rich heritage
            </p>
          </div>

          <div className="space-y-20">
            {culturalSites?.map((site, index) => (
              <div key={site.id} className="group">
                <div
                  className={`grid items-center gap-12 lg:grid-cols-2 ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl ${
                      index % 2 === 1 ? "lg:order-2" : ""
                    }`}
                  >
                    <Image 
                      src={site.image_url || "/placeholder.svg"} 
                      alt={site.name} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Location badge */}
                    <div className="absolute top-6 left-6">
                      <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-amber-500 text-white text-sm font-medium">
                        <MapPin className="h-3 w-3" />
                        {site.location}
                      </span>
                    </div>
                  </div>

                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <h3 className="mb-6 font-serif text-4xl font-bold text-balance text-foreground group-hover:text-amber-600 transition-colors">
                      {site.name}
                    </h3>
                    <p className="mb-6 text-lg text-muted-foreground leading-relaxed">{site.description}</p>

                    <div className="space-y-6">
                      <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200">
                        <h4 className="mb-3 font-semibold text-foreground flex items-center gap-2">
                          <span className="text-amber-600">📜</span>
                          Historical Background
                        </h4>
                        <p className="text-muted-foreground leading-relaxed">{site.history}</p>
                      </div>

                      <div className="p-6 rounded-2xl bg-orange-50 border border-orange-200">
                        <h4 className="mb-3 font-semibold text-foreground flex items-center gap-2">
                          <span className="text-orange-600">🌟</span>
                          Cultural Significance
                        </h4>
                        <p className="text-muted-foreground leading-relaxed">{site.significance}</p>
                      </div>
                    </div>

                    <Button asChild className="gap-2 mt-6 bg-amber-600 hover:bg-amber-700 text-white rounded-xl">
                      <Link href="/trip-planner">
                        <Sparkles className="h-4 w-4" />
                        Plan Visit
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {index < (culturalSites?.length || 0) - 1 && (
                  <Separator className="my-20 bg-gradient-to-r from-transparent via-amber-200 to-transparent h-0.5" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Responsible Tourism */}
      <section className="py-24 bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
              <Heart className="h-4 w-4 text-white" />
              <span className="text-sm font-semibold">Responsible Tourism</span>
            </div>
            
            <h2 className="mb-6 font-serif text-4xl font-bold text-balance md:text-5xl">
              Respectful Cultural Tourism
            </h2>
            
            <p className="mb-8 text-lg text-white/80 leading-relaxed">
              When visiting tribal communities and cultural sites, please respect local customs and traditions. 
              Your mindful engagement helps preserve these precious cultural heritage for future generations.
            </p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="text-2xl mb-3">📸</div>
                <h4 className="font-semibold mb-2">Seek Permission</h4>
                <p className="text-sm text-white/70">Always ask before taking photographs of people</p>
              </div>
              
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="text-2xl mb-3">🛍️</div>
                <h4 className="font-semibold mb-2">Support Artisans</h4>
                <p className="text-sm text-white/70">Purchase authentic handicrafts directly from makers</p>
              </div>
              
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="text-2xl mb-3">🙏</div>
                <h4 className="font-semibold mb-2">Respect Sites</h4>
                <p className="text-sm text-white/70">Follow guidelines at sacred and cultural sites</p>
              </div>
              
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="text-2xl mb-3">🌱</div>
                <h4 className="font-semibold mb-2">Learn Customs</h4>
                <p className="text-sm text-white/70">Understand and respect local traditions</p>
              </div>
            </div>

            <Button asChild size="lg" variant="secondary" className="gap-3 rounded-2xl">
              <Link href="/trip-planner">
                <Sparkles className="h-5 w-5" />
                Plan Your Cultural Journey
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}