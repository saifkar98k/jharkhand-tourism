  import { InteractiveMap } from "@/components/interactive-map"
import { MapPin } from "lucide-react"

export const metadata = {
  title: "Interactive Map - Discover Jharkhand",
  description: "Explore all tourist destinations in Jharkhand on an interactive map",
}

export default function MapPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Header */}
      <section className="border-b border-border/40 bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-3">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="font-serif text-3xl font-bold md:text-4xl">Interactive Map</h1>
              <p className="text-muted-foreground">Explore all destinations across Jharkhand</p>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="flex-1">
        <InteractiveMap />
      </section>
    </main>
  )
}
