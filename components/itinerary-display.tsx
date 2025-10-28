import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Share2, Loader2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useMemo, useRef, useState } from "react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas-pro"  // Replaced html2canvas with html2canvas-pro to support modern color functions like oklch
interface ItineraryDisplayProps {
  itinerary: string
}
export function ItineraryDisplay({ itinerary }: ItineraryDisplayProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const canShare = useMemo(() => typeof navigator !== 'undefined' && !!navigator.share, [])
  /* ---------- PDF DOWNLOAD ---------- */
const handleDownloadPDF = async (): Promise<void> => {
  setIsDownloading(true)
  if (!contentRef.current) {
    console.error("Content reference is null")
    setIsDownloading(false)
    return
  }
  try {
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 10
    const contentWidth = pageWidth - (margin * 2)
    const maxPageHeight = pageHeight - (margin * 2)
    // Create a temporary container
    const tempContainer = document.createElement('div')
    tempContainer.style.position = 'absolute'
    tempContainer.style.left = '-9999px'
    tempContainer.style.top = '0'
    tempContainer.style.width = `${contentWidth * 3.78}px` // mm to pixels
    tempContainer.style.backgroundColor = '#ffffff'
    tempContainer.style.padding = '20px'
    tempContainer.style.fontFamily = 'Arial, sans-serif'
    tempContainer.style.fontSize = '12px'
    tempContainer.style.lineHeight = '1.5'
    tempContainer.style.color = '#333333'
   
    const contentClone = contentRef.current.cloneNode(true) as HTMLElement
    tempContainer.appendChild(contentClone)
    document.body.appendChild(tempContainer)
    await new Promise(resolve => setTimeout(resolve, 300))
    // Get all block-level elements
    const elements = Array.from(tempContainer.querySelectorAll('h1, h2, h3, h4, h5, h6, p, ul, ol, blockquote, table'))
    const pageHeightPx = maxPageHeight * 3.78
   
    // Group elements into pages
    const pages: HTMLElement[][] = []
    let currentPage: HTMLElement[] = []
    let currentPageHeight = 0
   
    for (const element of elements) {
      const el = element as HTMLElement
      const rect = el.getBoundingClientRect()
      const elementHeight = rect.height
     
      // Check if adding this element would exceed page height
      if (currentPageHeight + elementHeight > pageHeightPx && currentPage.length > 0) {
        pages.push(currentPage)
        currentPage = [el]
        currentPageHeight = elementHeight
      } else {
        currentPage.push(el)
        currentPageHeight += elementHeight
      }
    }
   
    if (currentPage.length > 0) {
      pages.push(currentPage)
    }
   
    // Render each page
    for (let pageIndex = 0; pageIndex < pages.length; pageIndex++) {
      if (pageIndex > 0) {
        pdf.addPage()
      }
     
      // Create container for this page
      const pageContainer = document.createElement('div')
      pageContainer.style.position = 'absolute'
      pageContainer.style.left = '-9999px'
      pageContainer.style.top = '0'
      pageContainer.style.width = tempContainer.style.width
      pageContainer.style.backgroundColor = '#ffffff'
      pageContainer.style.padding = '20px'
      pageContainer.style.fontFamily = 'Arial, sans-serif'
      pageContainer.style.fontSize = '12px'
      pageContainer.style.lineHeight = '1.5'
      pageContainer.style.color = '#333333'
     
      // Add elements for this page
      pages[pageIndex].forEach(el => {
        pageContainer.appendChild(el.cloneNode(true))
      })
     
      document.body.appendChild(pageContainer)
      await new Promise(resolve => setTimeout(resolve, 100))
     
      // Capture the page
      const canvas = await html2canvas(pageContainer, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        logging: false,
      })
     
      const imgData = canvas.toDataURL('image/png', 1.0)
      const imgWidth = contentWidth
      const imgHeight = (canvas.height * imgWidth) / canvas.width
     
      // Ensure image fits on page
      const finalHeight = Math.min(imgHeight, maxPageHeight)
      pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, finalHeight)
     
      document.body.removeChild(pageContainer)
    }
   
    document.body.removeChild(tempContainer)
    pdf.save('travel-itinerary.pdf')
  } finally {
    setIsDownloading(false)
  }
}
  /* ---------- SHARE / COPY ---------- */
  const handleShare = async () => {
    if (canShare) {
      try {
        await navigator.share({
          title: "My AI-Generated Trip Itinerary",
          text: itinerary.substring(0, 1000) + "...",
        })
      } catch (error: any) {
        if (error.name !== 'AbortError') console.error("Error sharing itinerary:", error)
      }
    } else {
      try {
        await navigator.clipboard.writeText(itinerary)
        alert("Itinerary content copied to clipboard!")
      } catch {
        alert("Copying to clipboard failed.")
      }
    }
  }
  /* ---------- RENDER ---------- */
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
              disabled={isDownloading}
              className="gap-2 bg-white dark:bg-gray-800 hover:bg-green-50 border-green-200 dark:border-green-800 transition-all duration-200"
            >
              {isDownloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              {isDownloading ? "Downloading PDF..." : "Download PDF"}
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
              h1: ({ children }) => <h1 className="text-3xl font-bold mb-6 pb-2 border-b-2 border-green-200" style={{ pageBreakInside: 'avoid', pageBreakAfter: 'auto' }}>{children}</h1>,
              h2: ({ children }) => <h2 className="text-2xl font-semibold mb-4 mt-8 text-green-700 dark:text-green-300" style={{ pageBreakInside: 'avoid', pageBreakAfter: 'auto' }}>{children}</h2>,
              h3: ({ children }) => <h3 className="text-xl font-medium mb-3 mt-6 text-blue-600 dark:text-blue-400" style={{ pageBreakInside: 'avoid', pageBreakAfter: 'auto' }}>{children}</h3>,
              p: ({ children }) => <p className="mb-4 leading-7 text-gray-700 dark:text-gray-300" style={{ pageBreakInside: 'avoid' }}>{children}</p>,
              ul: ({ children }) => <ul className="mb-4 pl-6 space-y-2" style={{ pageBreakInside: 'avoid' }}>{children}</ul>,
              ol: ({ children }) => <ol className="mb-4 pl-6 space-y-2 list-decimal" style={{ pageBreakInside: 'avoid' }}>{children}</ol>,
              li: ({ children }) => <li className="pl-2 text-gray-700 dark:text-gray-300">{children}</li>,
              strong: ({ children }) => <strong className="font-semibold text-green-700 dark:text-green-300">{children}</strong>,
              em: ({ children }) => <em className="italic text-blue-600 dark:text-blue-400">{children}</em>,
              blockquote: ({ children }) => <blockquote className="border-l-4 border-green-400 pl-4 py-2 my-4 bg-green-50 dark:bg-green-950/30 italic" style={{ pageBreakInside: 'avoid' }}>{children}</blockquote>,
              table: ({ children }) => <table className="w-full border-collapse border border-gray-300 my-4" style={{ pageBreakInside: 'avoid' }}>{children}</table>,
              th: ({ children }) => <th className="border border-gray-300 px-4 py-2 bg-green-50 text-green-900 font-semibold">{children}</th>,
              td: ({ children }) => <td className="border border-gray-300 px-4 py-2 text-gray-700">{children}</td>,
            }}
          >
            {itinerary}
          </ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  )
}