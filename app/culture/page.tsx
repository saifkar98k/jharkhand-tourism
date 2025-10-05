import Image from "next/image"
import { Landmark, Music, Palette, Calendar } from "lucide-react"
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
      {/* Hero Section */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-gradient-to-br from-accent/20 via-background to-primary/10">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/tribal-dance-performance-in-jharkhand-with-traditi.jpg"
            alt="Jharkhand tribal culture"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>

        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="mb-4 font-serif text-5xl font-bold text-balance md:text-6xl">
            Culture & <span className="text-accent">Heritage</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
            Experience the vibrant traditions, ancient wisdom, and artistic expressions of Jharkhand's indigenous
            communities
          </p>
        </div>
      </section>

      {/* Tribal Communities Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">Indigenous Communities</h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground text-pretty">
              Jharkhand is home to over 30 indigenous tribes, each with unique languages, customs, and cultural
              practices that have been preserved for millennia
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-primary/20">
              <CardContent className="p-6">
                <h3 className="mb-2 font-serif text-xl font-bold">Santhal</h3>
                <p className="text-sm text-muted-foreground">
                  The largest tribal community known for their vibrant festivals, traditional Sohrai art, and rich oral
                  literature
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent/20">
              <CardContent className="p-6">
                <h3 className="mb-2 font-serif text-xl font-bold">Munda</h3>
                <p className="text-sm text-muted-foreground">
                  Ancient community with deep connection to nature, known for their agricultural practices and folk
                  dances
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="p-6">
                <h3 className="mb-2 font-serif text-xl font-bold">Oraon</h3>
                <p className="text-sm text-muted-foreground">
                  Community celebrated for their traditional music, Karma dance, and intricate bamboo craftsmanship
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent/20">
              <CardContent className="p-6">
                <h3 className="mb-2 font-serif text-xl font-bold">Ho</h3>
                <p className="text-sm text-muted-foreground">
                  Indigenous people known for their warrior traditions, unique language, and vibrant cultural festivals
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cultural Highlights */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">Cultural Highlights</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-6">
                <Music className="h-10 w-10 text-primary" />
              </div>
              <h3 className="mb-2 font-serif text-xl font-bold">Traditional Music</h3>
              <p className="text-sm text-muted-foreground">
                Experience folk songs, tribal drums, and traditional instruments like Mandar, Tumdak, and Tamak
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-accent/10 p-6">
                <Palette className="h-10 w-10 text-accent" />
              </div>
              <h3 className="mb-2 font-serif text-xl font-bold">Traditional Art</h3>
              <p className="text-sm text-muted-foreground">
                Discover Sohrai and Khovar wall paintings, Paitkar scroll art, and intricate tribal handicrafts
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-6">
                <Calendar className="h-10 w-10 text-primary" />
              </div>
              <h3 className="mb-2 font-serif text-xl font-bold">Festivals</h3>
              <p className="text-sm text-muted-foreground">
                Celebrate Sarhul, Karma, Sohrai, and Tusu festivals with traditional dances and rituals
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-accent/10 p-6">
                <Landmark className="h-10 w-10 text-accent" />
              </div>
              <h3 className="mb-2 font-serif text-xl font-bold">Sacred Sites</h3>
              <p className="text-sm text-muted-foreground">
                Visit ancient temples, sacred groves, and historical monuments that tell stories of centuries past
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Sites */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">Heritage Sites</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground text-pretty">
              Explore museums, temples, and cultural centers that preserve and celebrate Jharkhand's rich heritage
            </p>
          </div>

          <div className="space-y-12">
            {culturalSites?.map((site, index) => (
              <div key={site.id}>
                <div
                  className={`grid items-center gap-8 lg:grid-cols-2 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                >
                  <div
                    className={`relative aspect-[4/3] overflow-hidden rounded-lg ${index % 2 === 1 ? "lg:order-2" : ""}`}
                  >
                    <Image src={site.image_url || "/placeholder.svg"} alt={site.name} fill className="object-cover" />
                  </div>

                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {site.location}
                    </div>
                    <h3 className="mb-4 font-serif text-3xl font-bold text-balance">{site.name}</h3>
                    <p className="mb-4 text-muted-foreground leading-relaxed">{site.description}</p>

                    <div className="space-y-4">
                      <div>
                        <h4 className="mb-2 font-semibold">Historical Background</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{site.history}</p>
                      </div>

                      <div>
                        <h4 className="mb-2 font-semibold">Cultural Significance</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{site.significance}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {index < (culturalSites?.length || 0) - 1 && <Separator className="my-12" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsible Tourism */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold text-balance">Respectful Cultural Tourism</h2>
            <p className="mb-6 text-muted-foreground leading-relaxed">
              When visiting tribal communities and cultural sites, please respect local customs, seek permission before
              photographing people, support local artisans by purchasing authentic handicrafts, and engage with
              communities in a meaningful and respectful manner.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="rounded-lg bg-background px-4 py-2 shadow-sm">
                <span className="font-medium">✓ Seek permission before photos</span>
              </div>
              <div className="rounded-lg bg-background px-4 py-2 shadow-sm">
                <span className="font-medium">✓ Support local artisans</span>
              </div>
              <div className="rounded-lg bg-background px-4 py-2 shadow-sm">
                <span className="font-medium">✓ Respect sacred sites</span>
              </div>
              <div className="rounded-lg bg-background px-4 py-2 shadow-sm">
                <span className="font-medium">✓ Learn local customs</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
