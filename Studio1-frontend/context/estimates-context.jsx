"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { fetchEstimates, createEstimate, updateEstimate, deleteEstimate, convertToProposal } from "@/lib/api"

const EstimatesContext = createContext(null)

export function EstimatesProvider({ children }) {
  const [estimates, setEstimates] = useState([])
  const [loading, setLoading] = useState(true)

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const estimatesData = await fetchEstimates()
        setEstimates(estimatesData)
        setLoading(false)
      } catch (error) {
        console.error("Error loading estimates:", error)
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Add estimate
  const addEstimate = async (data) => {
    try {
      const newEstimate = await createEstimate(data)
      setEstimates((prev) => [...prev, newEstimate])
      return newEstimate
    } catch (error) {
      console.error("Error adding estimate:", error)
      throw error
    }
  }

  // Update estimate
  const updateEstimateRecord = async (id, data) => {
    try {
      const updatedEstimate = await updateEstimate(id, data)
      setEstimates((prev) => prev.map((estimate) => (estimate.id === id ? updatedEstimate : estimate)))
      return updatedEstimate
    } catch (error) {
      console.error("Error updating estimate:", error)
      throw error
    }
  }

  // Delete estimate
  const deleteEstimateRecord = async (id) => {
    try {
      await deleteEstimate(id)
      setEstimates((prev) => prev.filter((estimate) => estimate.id !== id))
      return true
    } catch (error) {
      console.error("Error deleting estimate:", error)
      throw error
    }
  }

  // Convert to proposal
  const convertEstimateToProposal = async (id) => {
    try {
      const newProposal = await convertToProposal(id)
      return newProposal
    } catch (error) {
      console.error("Error converting estimate to proposal:", error)
      throw error
    }
  }

  return (
    <EstimatesContext.Provider
      value={{
        estimates,
        loading,
        addEstimate,
        updateEstimate: updateEstimateRecord,
        deleteEstimate: deleteEstimateRecord,
        convertToProposal: convertEstimateToProposal,
      }}
    >
      {children}
    </EstimatesContext.Provider>
  )
}

export function useEstimates() {
  const context = useContext(EstimatesContext)
  if (!context) {
    throw new Error("useEstimates must be used within an EstimatesProvider")
  }
  return context
}
