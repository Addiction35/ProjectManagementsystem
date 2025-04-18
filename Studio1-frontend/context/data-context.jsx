"use client"

import { createContext, useContext, useState, useEffect } from "react"
import {
  fetchPurchaseOrders,
  fetchWages,
  fetchExpenses,
  fetchProposals,
  fetchBills,
  createPurchaseOrder,
  updatePurchaseOrder,
  deletePurchaseOrder,
  createWage,
  updateWage,
  deleteWage,
  createExpense,
  updateExpense,
  deleteExpense,
  createProposal,
  updateProposal,
  deleteProposal,
  createBill,
  updateBill,
  deleteBill,
  convertToBill,
} from "@/lib/api"

const DataContext = createContext(null)

export function DataProvider({ children }) {
  const [purchaseOrders, setPurchaseOrders] = useState([])
  const [wages, setWages] = useState([])
  const [expenses, setExpenses] = useState([])
  const [proposals, setProposals] = useState([])
  const [bills, setBills] = useState([])
  const [loading, setLoading] = useState({
    purchaseOrders: true,
    wages: true,
    expenses: true,
    proposals: true,
    bills: true,
  })

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const poData = await fetchPurchaseOrders()
        setPurchaseOrders(poData)
        setLoading((prev) => ({ ...prev, purchaseOrders: false }))

        const wagesData = await fetchWages()
        setWages(wagesData)
        setLoading((prev) => ({ ...prev, wages: false }))

        const expensesData = await fetchExpenses()
        setExpenses(expensesData)
        setLoading((prev) => ({ ...prev, expenses: false }))

        const proposalsData = await fetchProposals()
        setProposals(proposalsData)
        setLoading((prev) => ({ ...prev, proposals: false }))

        const billsData = await fetchBills()
        setBills(billsData)
        setLoading((prev) => ({ ...prev, bills: false }))
      } catch (error) {
        console.error("Error loading data:", error)
      }
    }

    loadData()
  }, [])

  // Purchase Order operations
  const addPurchaseOrder = async (data) => {
    try {
      const newPO = await createPurchaseOrder(data)
      setPurchaseOrders((prev) => [...prev, newPO])
      return newPO
    } catch (error) {
      console.error("Error adding purchase order:", error)
      throw error
    }
  }

  const updatePO = async (id, data) => {
    try {
      const updatedPO = await updatePurchaseOrder(id, data)
      setPurchaseOrders((prev) => prev.map((po) => (po.id === id ? updatedPO : po)))
      return updatedPO
    } catch (error) {
      console.error("Error updating purchase order:", error)
      throw error
    }
  }

  const deletePO = async (id) => {
    try {
      await deletePurchaseOrder(id)
      setPurchaseOrders((prev) => prev.filter((po) => po.id !== id))
      return true
    } catch (error) {
      console.error("Error deleting purchase order:", error)
      throw error
    }
  }

  // Wage operations
  const addWage = async (data) => {
    try {
      const newWage = await createWage(data)
      setWages((prev) => [...prev, newWage])
      return newWage
    } catch (error) {
      console.error("Error adding wage:", error)
      throw error
    }
  }

  const updateWageRecord = async (id, data) => {
    try {
      const updatedWage = await updateWage(id, data)
      setWages((prev) => prev.map((wage) => (wage.id === id ? updatedWage : wage)))
      return updatedWage
    } catch (error) {
      console.error("Error updating wage:", error)
      throw error
    }
  }

  const deleteWageRecord = async (id) => {
    try {
      await deleteWage(id)
      setWages((prev) => prev.filter((wage) => wage.id !== id))
      return true
    } catch (error) {
      console.error("Error deleting wage:", error)
      throw error
    }
  }

  // Expense operations
  const addExpense = async (data) => {
    try {
      const newExpense = await createExpense(data)
      setExpenses((prev) => [...prev, newExpense])
      return newExpense
    } catch (error) {
      console.error("Error adding expense:", error)
      throw error
    }
  }

  const updateExpenseRecord = async (id, data) => {
    try {
      const updatedExpense = await updateExpense(id, data)
      setExpenses((prev) => prev.map((expense) => (expense.id === id ? updatedExpense : expense)))
      return updatedExpense
    } catch (error) {
      console.error("Error updating expense:", error)
      throw error
    }
  }

  const deleteExpenseRecord = async (id) => {
    try {
      await deleteExpense(id)
      setExpenses((prev) => prev.filter((expense) => expense.id !== id))
      return true
    } catch (error) {
      console.error("Error deleting expense:", error)
      throw error
    }
  }

  // Proposal operations
  const addProposal = async (data) => {
    try {
      const newProposal = await createProposal(data)
      setProposals((prev) => [...prev, newProposal])
      return newProposal
    } catch (error) {
      console.error("Error adding proposal:", error)
      throw error
    }
  }

  const updateProposalRecord = async (id, data) => {
    try {
      const updatedProposal = await updateProposal(id, data)
      setProposals((prev) => prev.map((proposal) => (proposal.id === id ? updatedProposal : proposal)))
      return updatedProposal
    } catch (error) {
      console.error("Error updating proposal:", error)
      throw error
    }
  }

  const deleteProposalRecord = async (id) => {
    try {
      await deleteProposal(id)
      setProposals((prev) => prev.filter((proposal) => proposal.id !== id))
      return true
    } catch (error) {
      console.error("Error deleting proposal:", error)
      throw error
    }
  }

  // Bill operations
  const addBill = async (data) => {
    try {
      const newBill = await createBill(data)
      setBills((prev) => [...prev, newBill])
      return newBill
    } catch (error) {
      console.error("Error adding bill:", error)
      throw error
    }
  }

  const updateBillRecord = async (id, data) => {
    try {
      const updatedBill = await updateBill(id, data)
      setBills((prev) => prev.map((bill) => (bill.id === id ? updatedBill : bill)))
      return updatedBill
    } catch (error) {
      console.error("Error updating bill:", error)
      throw error
    }
  }

  const deleteBillRecord = async (id) => {
    try {
      await deleteBill(id)
      setBills((prev) => prev.filter((bill) => bill.id !== id))
      return true
    } catch (error) {
      console.error("Error deleting bill:", error)
      throw error
    }
  }

  // Conversion operations
  const convertItemToBill = async (type, id) => {
    try {
      const newBill = await convertToBill(type, id)
      setBills((prev) => [...prev, newBill])
      return newBill
    } catch (error) {
      console.error(`Error converting ${type} to bill:`, error)
      throw error
    }
  }

  return (
    <DataContext.Provider
      value={{
        // Data
        purchaseOrders,
        wages,
        expenses,
        proposals,
        bills,
        loading,

        // Purchase Order operations
        addPurchaseOrder,
        updatePurchaseOrder: updatePO,
        deletePurchaseOrder: deletePO,

        // Wage operations
        addWage,
        updateWage: updateWageRecord,
        deleteWage: deleteWageRecord,

        // Expense operations
        addExpense,
        updateExpense: updateExpenseRecord,
        deleteExpense: deleteExpenseRecord,

        // Proposal operations
        addProposal,
        updateProposal: updateProposalRecord,
        deleteProposal: deleteProposalRecord,

        // Bill operations
        addBill,
        updateBill: updateBillRecord,
        deleteBill: deleteBillRecord,

        // Conversion operations
        convertToBill: convertItemToBill,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}
