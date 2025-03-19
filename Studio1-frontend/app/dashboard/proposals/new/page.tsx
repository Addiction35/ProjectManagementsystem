import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProposalForm } from "@/components/proposal-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewProposalPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/proposals">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Create New Proposal</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Proposal Details</CardTitle>
          <CardDescription>Create a new client proposal for your construction project</CardDescription>
        </CardHeader>
        <CardContent>
          <ProposalForm />
        </CardContent>
      </Card>
    </div>
  )
}

