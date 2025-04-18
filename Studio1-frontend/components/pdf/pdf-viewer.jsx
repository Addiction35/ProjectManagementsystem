"use client"

import { useEffect, useState } from "react"
import { X, Download, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { generatePDF } from "@/lib/pdf-generator"

export function PDFViewer({ data, onClose }) {
  const [pdfUrl, setPdfUrl] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function createPDF() {
      try {
        setIsLoading(true)
        const pdfBlob = await generatePDF(data)
        const url = URL.createObjectURL(pdfBlob)
        setPdfUrl(url)
        setIsLoading(false)

        return () => {
          URL.revokeObjectURL(url)
        }
      } catch (error) {
        console.error("Error generating PDF:", error)
        setIsLoading(false)
      }
    }

    createPDF()
  }, [data])

  const handleDownload = () => {
    if (!pdfUrl) return

    const link = document.createElement("a")
    link.href = pdfUrl
    link.download = `${data.title || "document"}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePrint = () => {
    if (!pdfUrl) return

    const printWindow = window.open(pdfUrl, "_blank")
    printWindow.addEventListener("load", () => {
      printWindow.print()
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-5xl h-[90vh] bg-white rounded-lg shadow-lg flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">{data?.title || "Document"}</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleDownload}
              disabled={isLoading || !pdfUrl}
              aria-label="Download PDF"
            >
              <Download className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrint}
              disabled={isLoading || !pdfUrl}
              aria-label="Print PDF"
            >
              <Printer className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close PDF viewer">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : pdfUrl ? (
            <iframe src={pdfUrl} className="w-full h-full border-0" title="PDF Viewer" />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-red-500">Failed to generate PDF</p>
            </div>
          )}
        </div>
        <div className="p-4 border-t flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleDownload} disabled={isLoading || !pdfUrl}>
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  )
}
