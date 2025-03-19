"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Building } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-6 md:gap-10">
      <Link href="/dashboard" className="flex items-center gap-2">
        <Building className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">BuildPro</span>
      </Link>
      <nav className="hidden gap-6 md:flex">
        <Link
          href="/dashboard"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/dashboard" ? "text-primary" : "text-muted-foreground",
          )}
        >
          Dashboard
        </Link>
        <Link
          href="/dashboard/projects"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname.startsWith("/dashboard/projects") ? "text-primary" : "text-muted-foreground",
          )}
        >
          Projects
        </Link>
        <Link
          href="/dashboard/resources"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname.startsWith("/dashboard/resources") ? "text-primary" : "text-muted-foreground",
          )}
        >
          Resources
        </Link>
        <Link
          href="/dashboard/schedule"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname.startsWith("/dashboard/schedule") ? "text-primary" : "text-muted-foreground",
          )}
        >
          Schedule
        </Link>
        <Link
          href="/dashboard/documents"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname.startsWith("/dashboard/documents") ? "text-primary" : "text-muted-foreground",
          )}
        >
          Documents
        </Link>
        <Link
          href="/dashboard/reports"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname.startsWith("/dashboard/reports") ? "text-primary" : "text-muted-foreground",
          )}
        >
          Reports
        </Link>
      </nav>
    </div>
  )
}

