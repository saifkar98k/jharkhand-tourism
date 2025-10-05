"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Share2 } from "lucide-react"
import ReactMarkdown from "react-markdown" // Import the library
import remarkGfm from "remark-gfm" // Import the GFM plugin

interface ItineraryDisplayProps {
  itinerary: string
}

export function ItineraryDisplay({ itinerary }: ItineraryDisplayProps) {
  const handleDownload = () => {
    // Optional: Change to .md for a Markdown file
    const blob = new Blob([itinerary], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "jharkhand-itinerary.md" // Changed extension
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
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-serif text-2xl">Your Personalized Itinerary</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Download
            </Button>
            {navigator.share && (
              <Button variant="outline" size="sm" onClick={handleShare} className="gap-2 bg-transparent">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Replace the div with the ReactMarkdown component */}
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {itinerary}
          </ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  )
}