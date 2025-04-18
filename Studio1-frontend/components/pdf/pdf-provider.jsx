"use client"

import { createContext, useState, useContext } from "react"
import { PDFViewer } from "@/components/pdf/pdf-viewer"

const PDFContext = createContext(null)

export function PDFProvider({ children }) {
  const [pdfData, setPdfData] = useState(null)
  const [isPDFOpen, setIsPDFOpen] = useState(false)

  const openPDF = (data) => {
    setPdfData(data)
    setIsPDFOpen(true)
  }

  const closePDF = () => {
    setIsPDFOpen(false)
    setPdfData(null)
  }

  return (
    <PDFContext.Provider value={{ openPDF, closePDF }}>
      {children}
      {isPDFOpen && <PDFViewer data={pdfData} onClose={closePDF} />}
    </PDFContext.Provider>
  )
}

export function usePDF() {
  const context = useContext(PDFContext)
  if (!context) {
    throw new Error("usePDF must be used within a PDFProvider")
  }
  return context
}
