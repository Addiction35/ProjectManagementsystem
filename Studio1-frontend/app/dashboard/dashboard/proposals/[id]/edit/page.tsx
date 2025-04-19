"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Trash } from "lucide-react"
import { getItemById, simulateApiDelay } from "@/lib/dummy-data"

export default function ProposalEditPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const proposalId = params.id
  const [proposal, setProposal] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchProposal = async () => {
      setIsLoading(true)
      try {
        await simulateApiDelay()
        const data = getItemById("proposals", proposalId)
        if (!data) {
          throw new Error("Proposal not found")
        }
        setProposal(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch proposal"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchProposal()
  }, [proposalId])

  const handleBack = () => {
    router.back()
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await simulateApiDelay()
      // In a real app, this would save the proposal to the API
      console.log("Saving proposal:", proposal)
      router.push(`/dashboard/proposals/${proposalId}`)
    } catch (err) {
      console.error("Error saving proposal:", err)
    } finally {
      setIsSaving(false)
    }
  }

  const handleChange = (field: string, value: any) => {
    setProposal((prev: any) => ({
      ...prev,
      [field]: value,
    }))
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !proposal) {
    return (
      <div className="p-6 border border-destructive/50 rounded-md bg-destructive/10 text-destructive">
        <h3 className="font-medium">Error loading proposal</h3>
        <p className="text-sm">{error?.message || "Proposal not found"}</p>
        <Button variant="outline" className="mt-4" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Edit Proposal</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="text-destructive hover:bg-destructive/10">
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Proposal Information</CardTitle>
            <CardDescription>Edit the proposal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Proposal Name</Label>
              <Input id="name" value={proposal.name} onChange={(e) => handleChange("name", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={proposal.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Sent">Sent</SelectItem>
                  <SelectItem value="Accepted">Accepted</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                value={proposal.amount}
                onChange={(e) => handleChange("amount", Number.parseFloat(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={proposal.date.split("T")[0]}
                onChange={(e) => handleChange("date", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                type="date"
                value={proposal.expiryDate.split("T")[0]}
                onChange={(e) => handleChange("expiryDate", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Client & Project Information</CardTitle>
            <CardDescription>Edit client and project details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="client">Client</Label>
              <Input id="client" value={proposal.client} onChange={(e) => handleChange("client", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectId">Project</Label>
              <Select value={proposal.projectId} onValueChange={(value) => handleChange("projectId", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PRJ-001">Riverside Apartments</SelectItem>
                  <SelectItem value="PRJ-002">Downtown Office Complex</SelectItem>
                  <SelectItem value="PRJ-003">Sunset Heights Condos</SelectItem>
                  <SelectItem value="PRJ-004">Greenfield Shopping Mall</SelectItem>
                  <SelectItem value="PRJ-005">Harbor View Hotel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={5}
                placeholder="Enter proposal description"
                value={proposal.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                rows={3}
                placeholder="Enter any additional notes"
                value={proposal.notes || ""}
                onChange={(e) => handleChange("notes", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
