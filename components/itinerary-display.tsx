"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Share2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useMemo, useRef } from "react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

interface ItineraryDisplayProps {
  itinerary: string
}

export function ItineraryDisplay({ itinerary }: ItineraryDisplayProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const canShare = useMemo(() => typeof navigator !== 'undefined' && !!navigator.share, [])

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return

    try {
      const element = contentRef.current
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff"
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgWidth = 210 // A4 width in mm
      const pageHeight = 295 // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      // Add additional pages if content is too long
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save('travel-itinerary.pdf')
    } catch (error) {
      console.error('Error generating PDF:', error)
      // Fallback: Download as text file
      const blob = new Blob([itinerary], { type: 'text/plain;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'itinerary.txt'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  const handleShare = async () => {
    if (canShare) {
      try {
        await navigator.share({
          title: "My AI-Generated Trip Itinerary",
          text: itinerary.substring(0, 1000) + "...", // Share first 1000 chars
        })
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          console.error("Error sharing itinerary:", error)
        }
      }
    } else {
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
    <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-green-50/50 dark:from-gray-900 dark:to-green-950/20">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="font-serif text-2xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Your AI-Powered Itinerary ✨
          </CardTitle>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleDownloadPDF} 
              className="gap-2 bg-white dark:bg-gray-800 hover:bg-green-50 border-green-200 dark:border-green-800 transition-all duration-200"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleShare} 
              className="gap-2 bg-white dark:bg-gray-800 hover:bg-blue-50 border-blue-200 dark:border-blue-800 transition-all duration-200"
            >
              <Share2 className="h-4 w-4" />
              {canShare ? "Share" : "Copy"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div 
          ref={contentRef}
          className="prose prose-lg max-w-none dark:prose-invert 
                    prose-headings:font-serif 
                    prose-h1:bg-gradient-to-r prose-h1:from-green-600 prose-h1:to-blue-600 prose-h1:bg-clip-text prose-h1:text-transparent
                    prose-h2:text-green-700 dark:prose-h2:text-green-300
                    prose-h3:text-blue-600 dark:prose-h3:text-blue-400
                    prose-strong:text-green-700 dark:prose-strong:text-green-300
                    prose-em:text-blue-600 dark:prose-em:text-blue-400
                    prose-ul:list-disc prose-ol:list-decimal
                    prose-li:marker:text-green-500
                    prose-blockquote:border-l-green-300 prose-blockquote:bg-green-50 dark:prose-blockquote:bg-green-950/20
                    prose-a:text-blue-600 hover:prose-a:text-blue-800
                    prose-p:leading-relaxed prose-p:text-gray-700 dark:prose-p:text-gray-300
                    prose-table:border prose-table:border-gray-300
                    prose-th:bg-green-50 prose-th:text-green-900
                    prose-td:border prose-td:border-gray-200
                    rounded-lg p-6 bg-white/50 dark:bg-gray-900/50 border"
        >
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              // Custom rendering for better styling
              h1: ({children}) => <h1 className="text-3xl font-bold mb-6 pb-2 border-b-2 border-green-200">{children}</h1>,
              h2: ({children}) => <h2 className="text-2xl font-semibold mb-4 mt-8 text-green-700 dark:text-green-300">{children}</h2>,
              h3: ({children}) => <h3 className="text-xl font-medium mb-3 mt-6 text-blue-600 dark:text-blue-400">{children}</h3>,
              p: ({children}) => <p className="mb-4 leading-7 text-gray-700 dark:text-gray-300">{children}</p>,
              ul: ({children}) => <ul className="mb-4 pl-6 space-y-2">{children}</ul>,
              ol: ({children}) => <ol className="mb-4 pl-6 space-y-2 list-decimal">{children}</ol>,
              li: ({children}) => <li className="pl-2 text-gray-700 dark:text-gray-300">{children}</li>,
              strong: ({children}) => <strong className="font-semibold text-green-700 dark:text-green-300">{children}</strong>,
              em: ({children}) => <em className="italic text-blue-600 dark:text-blue-400">{children}</em>,
              blockquote: ({children}) => <blockquote className="border-l-4 border-green-400 pl-4 py-2 my-4 bg-green-50 dark:bg-green-950/30 italic">{children}</blockquote>,
              table: ({children}) => <table className="w-full border-collapse border border-gray-300 my-4">{children}</table>,
              th: ({children}) => <th className="border border-gray-300 px-4 py-2 bg-green-50 text-green-900 font-semibold">{children}</th>,
              td: ({children}) => <td className="border border-gray-300 px-4 py-2 text-gray-700">{children}</td>,
            }}
          >
            {itinerary}
          </ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  )
}