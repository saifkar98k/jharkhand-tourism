"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Share2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useMemo } from "react"

interface ItineraryDisplayProps {
  itinerary: string
}

export function ItineraryDisplay({ itinerary }: ItineraryDisplayProps) {
  // Memoize the check for Web Share API support
  const canShare = useMemo(() => typeof navigator !== 'undefined' && !!navigator.share, [])

  const handleDownload = () => {
    const blob = new Blob([itinerary], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "itinerary-plan.md" 
    a.click() 
    URL.revokeObjectURL(url)
  }

  const handleShare = async () => {
    if (canShare) {
      try {
        await navigator.share({
          title: "My AI-Generated Trip Itinerary",
          text: itinerary,
        })
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          console.error("Error sharing itinerary:", error)
        }
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(itinerary)
        alert("Itinerary content copied to clipboard! You can now paste it to share.")
      } catch (err) {
        console.error("Failed to copy itinerary:", err)
        alert("Copying to clipboard failed.")
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-serif text-2xl">Your Personalized Itinerary ✨</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Download
            </Button>
            {/* Show share button if Web Share is supported, otherwise the button will act as a copy fallback */}
            <Button variant="outline" size="sm" onClick={handleShare} className="gap-2 bg-transparent">
              <Share2 className="h-4 w-4" />
              {canShare ? "Share" : "Copy"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Adjusted to the simple prose styling */}
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {itinerary}
          </ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  )
}