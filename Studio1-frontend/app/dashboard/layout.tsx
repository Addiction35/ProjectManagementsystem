import type React from "react"
import { MainNav } from "@/components/main-nav"
import { SideNav } from "@/components/side-nav"
import { UserNav } from "@/components/user-nav"
import { MobileSidebar } from "@/components/mobile-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-6">
        <div className="flex items-center gap-2">
          <MobileSidebar />
          <MainNav />
        </div>
        <div className="ml-auto flex items-center gap-4">
          <UserNav />
        </div>
      </header>
      <div className="flex flex-1">
        <SideNav />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

