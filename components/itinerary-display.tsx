  "use client"

  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  import { Button } from "@/components/ui/button"
  import { Download, Share2, Sparkles, MapPin, Calendar, Star, ArrowRight } from "lucide-react"
  import ReactMarkdown from "react-markdown"
  import remarkGfm from "remark-gfm"

  interface ItineraryDisplayProps {
    itinerary: string
  }

  export function ItineraryDisplay({ itinerary }: ItineraryDisplayProps) {
    const handleDownload = () => {
      const blob = new Blob([itinerary], { type: "text/markdown" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "jharkhand-itinerary.md"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }

    const handleShare = async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: "My Jharkhand Trip Itinerary",
            text: itinerary,
          })
        } catch (error) {
          console.log("Error sharing:", error)
        }
      } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(itinerary).then(() => {
          alert("Itinerary copied to clipboard!")
        })
      }
    }

    return (
      <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-sky-500 p-3">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="font-serif text-3xl text-foreground">Your Personalized Itinerary</CardTitle>
                <p className="text-muted-foreground mt-1">AI-crafted journey through Jharkhand</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handleDownload}
                className="gap-2 bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white shadow-lg hover:shadow-xl"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button 
                variant="outline"
                onClick={handleShare}
                className="gap-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Quick Stats Bar */}
          <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-sky-50 border border-emerald-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Calendar className="h-4 w-4 text-emerald-600" />
                  <span className="text-lg font-bold text-emerald-700">Duration</span>
                </div>
                <p className="text-sm text-muted-foreground">Customized Days</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <MapPin className="h-4 w-4 text-sky-600" />
                  <span className="text-lg font-bold text-sky-700">Destinations</span>
                </div>
                <p className="text-sm text-muted-foreground">Multiple Stops</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Star className="h-4 w-4 text-amber-600" />
                  <span className="text-lg font-bold text-amber-700">Experiences</span>
                </div>
                <p className="text-sm text-muted-foreground">Tailored Activities</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Sparkles className="h-4 w-4 text-purple-600" />
                  <span className="text-lg font-bold text-purple-700">AI Optimized</span>
                </div>
                <p className="text-sm text-muted-foreground">Smart Planning</p>
              </div>
            </div>
          </div>

          {/* Itinerary Content */}
          <div className="prose prose-lg max-w-none 
            prose-headings:font-serif 
            prose-headings:text-foreground
            prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6 prose-h1:border-b prose-h1:border-emerald-200 prose-h1:pb-3
            prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-emerald-700
            prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-sky-700
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-strong:text-foreground prose-strong:font-semibold
            prose-ul:list-disc prose-ul:pl-6
            prose-ol:list-decimal prose-ol:pl-6
            prose-li:text-muted-foreground prose-li:leading-relaxed
            prose-blockquote:border-l-4 prose-blockquote:border-emerald-400 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:bg-emerald-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
            prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
            prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg
            prose-table:border-collapse prose-table:border prose-table:border-gray-300
            prose-th:bg-gray-100 prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-semibold
            prose-td:px-4 prose-td:py-2 prose-td:border prose-td:border-gray-300
            prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline
            dark:prose-invert">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {itinerary}
            </ReactMarkdown>
          </div>

          {/* Additional Actions */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Need to make changes? Regenerate your itinerary with different preferences.
              </div>
              <div className="flex gap-3">
                <Button 
                  asChild 
                  variant="outline" 
                  className="gap-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                >
                  <a href="/destinations">
                    <MapPin className="h-4 w-4" />
                    Explore More
                  </a>
                </Button>
                <Button 
                  className="gap-2 bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <Sparkles className="h-4 w-4" />
                  Plan Another Trip
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }