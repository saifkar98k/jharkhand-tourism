import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Leaf, Users, MapPin, Sparkles, Mountain, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: destinations } = await supabase
    .from("destinations")
    .select("*")
    .eq("featured", true)
    .limit(6);

  return (
    <main className="flex min-h-screen flex-col">
      {/* ------------- ENHANCED HERO SECTION ------------- */}
      <section className="relative flex min-h-[95vh] items-center justify-center overflow-hidden">
        {/* Enhanced background with multiple layers */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/lush-green-waterfall-in-jharkhand-forest-with-mist.jpg"
            alt="Jharkhand waterfall"
            fill
            className="object-cover scale-105 animate-zoom"
            priority
          />
          {/* Multi-layer gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/70 via-sky-900/40 to-indigo-900/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-background/30" />
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-4 h-4 bg-emerald-400 rounded-full opacity-60" />
        </div>
        <div className="absolute bottom-40 right-20 animate-float-delayed">
          <div className="w-6 h-6 bg-sky-400 rounded-full opacity-40" />
        </div>

        <div className="container mx-auto px-4 py-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-background/20 backdrop-blur-sm border border-emerald-300/30">
            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
            <span className="text-sm font-medium text-white">India's Best Kept Secret</span>
          </div>

          <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-balance md:text-7xl lg:text-8xl">
            Discover the{" "}
            <span className="bg-gradient-to-r from-emerald-300 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
              Soul
            </span>{" "}
            of{" "}
            <span className="bg-gradient-to-r from-sky-300 via-emerald-300 to-sky-400 bg-clip-text text-transparent">
              Jharkhand
            </span>
          </h1>
          
          <p className="mx-auto mb-10 max-w-2xl text-xl text-white/90 text-pretty drop-shadow-2xl leading-relaxed">
            Where pristine waterfalls meet ancient traditions. Experience sustainable eco-tourism, 
            vibrant tribal culture, and untouched natural beauty in India's green heartland.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="gap-3 bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white shadow-2xl hover:shadow-3xl hover:-translate-y-1 transform transition-all duration-300 font-semibold h-14 rounded-2xl px-8 text-lg border-0"
            >
              <Link href="/destinations">
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

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
            </div>
          </div>
        </div>
      </section>

      {/* ------------- ENHANCED FEATURED DESTINATIONS ------------- */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
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
              From thundering waterfalls to sacred temples, discover the natural wonders and cultural treasures that make Jharkhand unique
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {destinations?.map((d, index) => (
              <Card 
                key={d.id} 
                className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-background"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={d.image_url || "/placeholder.svg"}
                    alt={d.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-medium capitalize">
                      {d.category}
                    </span>
                  </div>
                  
                  {/* Hover content */}
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <Button asChild size="sm" className="w-full bg-white/90 backdrop-blur-sm text-foreground hover:bg-white">
                      <Link href={`/destinations#${d.id}`}>
                        View Details
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-emerald-600 transition-colors">
                      {d.name}
                    </h3>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-emerald-600 transform group-hover:translate-x-1 transition-all" />
                  </div>
                  
                  <p className="mb-4 line-clamp-2 text-muted-foreground leading-relaxed text-sm">
                    {d.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{d.location}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button asChild size="lg" variant="outline" className="gap-2 rounded-xl px-8 py-6 border-2">
              <Link href="/destinations">
                View All Destinations
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ------------- ENHANCED WHY VISIT JHARKHAND ------------- */}
      <section className="py-24 bg-gradient-to-br from-emerald-50 via-sky-50 to-emerald-100">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700">
              <Star className="h-4 w-4 fill-emerald-400" />
              <span className="text-sm font-semibold">Why Choose Us</span>
            </div>
            <h2 className="mb-6 font-serif text-4xl font-bold text-balance md:text-6xl">
              Why Visit <span className="text-emerald-600">Jharkhand?</span>
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-0 shadow-lg bg-background/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="mb-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 group-hover:scale-110 transition-transform duration-300">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-4 font-serif text-2xl font-bold text-foreground">Eco-Tourism Paradise</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Explore pristine forests, wildlife sanctuaries, and practice sustainable tourism that protects our
                  natural heritage for future generations
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-background/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="mb-6 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 p-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-4 font-serif text-2xl font-bold text-foreground">Rich Tribal Culture</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Immerse yourself in vibrant traditions, ancient art forms, soulful music, and colorful festivals of indigenous communities
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-background/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="mb-6 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-500 p-4 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-4 font-serif text-2xl font-bold text-foreground">Hidden Gems</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Discover off-the-beaten-path destinations, from majestic waterfalls to ancient temples and serene hill stations
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ------------- ENHANCED CULTURAL PREVIEW ------------- */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src="/tribal-dance-performance-in-jharkhand-with-traditi.jpg"
                  alt="Tribal culture"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                {/* Decorative element */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-emerald-500 rounded-full opacity-20" />
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-amber-500 rounded-full opacity-10" />
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-700 w-fit">
                <Users className="h-4 w-4" />
                <span className="text-sm font-semibold">Cultural Heritage</span>
              </div>
              
              <h2 className="font-serif text-4xl font-bold text-balance md:text-6xl">
                Immerse in <span className="text-amber-600">Tribal Heritage</span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Jharkhand is home to diverse indigenous communities including Santhal, Munda, Oraon, and Ho tribes. 
                Experience their rich cultural traditions through vibrant festivals, traditional art forms, folk music, 
                and authentic handicrafts that have been preserved for generations.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <span className="text-amber-600 font-bold">🎭</span>
                  </div>
                  <span className="font-semibold text-sm">Folk Dances</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <span className="text-emerald-600 font-bold">🎵</span>
                  </div>
                  <span className="font-semibold text-sm">Traditional Music</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-sky-50">
                  <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                    <span className="text-sky-600 font-bold">🛍️</span>
                  </div>
                  <span className="font-semibold text-sm">Handicrafts</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-orange-50">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-orange-600 font-bold">🎉</span>
                  </div>
                  <span className="font-semibold text-sm">Festivals</span>
                </div>
              </div>
              
              <Button asChild size="lg" className="gap-3 mt-6 bg-amber-600 hover:bg-amber-700 text-white rounded-xl px-8 py-6">
                <Link href="/culture">
                  Explore Culture & Heritage
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ------------- ENHANCED CTA SECTION ------------- */}
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
            Ready for Your <span className="text-amber-300">Adventure?</span>
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-xl text-white/80 text-pretty leading-relaxed">
            Let our AI-powered trip planner create a personalized itinerary based on your interests, budget, and travel preferences
          </p>
          <Button asChild size="lg" className="gap-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-2xl hover:shadow-3xl rounded-2xl px-10 py-7 text-lg border-0">
            <Link href="/trip-planner">
              <Sparkles className="h-5 w-5" />
              Plan Your Trip Now
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* ------------- ENHANCED FOOTER ------------- */}
      <footer className="border-t border-border/40 bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3 font-serif text-xl font-bold text-emerald-700">
                <Mountain className="h-6 w-6" />
                <span>Discover Jharkhand</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your gateway to sustainable tourism and authentic cultural experiences in India's hidden gem.
              </p>
            </div>
            
            <div>
              <h4 className="mb-4 font-semibold text-foreground">Explore</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="/destinations" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
                    <ChevronRight className="h-3 w-3" />
                    Destinations
                  </Link>
                </li>
                <li>
                  <Link href="/culture" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
                    <ChevronRight className="h-3 w-3" />
                    Culture & Heritage
                  </Link>
                </li>
                <li>
                  <Link href="/eco-tourism" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
                    <ChevronRight className="h-3 w-3" />
                    Eco-Tourism
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-4 font-semibold text-foreground">Plan</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="/trip-planner" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
                    <ChevronRight className="h-3 w-3" />
                    AI Trip Planner
                  </Link>
                </li>
               </ul>
            </div>
            
            <div>
              <h4 className="mb-4 font-semibold text-foreground">Connect</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Follow us for travel tips, cultural insights, and eco-tourism updates.
              </p>
            </div>
          </div>
          
          <div className="mt-12 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Discover Jharkhand. Promoting sustainable and responsible tourism.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}