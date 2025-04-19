import type React from "react"
import { ProjectProvider } from "@/contexts/project-context"
import { SideNav } from "@/components/side-nav"
import { UserNav } from "@/components/user-nav"
import { MobileNav } from "@/components/mobile-nav"
import { QueryClientProvider } from "@/components/query-client-provider"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider>
      <ProjectProvider>
        <div className="flex min-h-screen flex-col">
          <div className="border-b">
            <div className="flex h-16 items-center px-4 md:px-6">
              <MobileNav />
              <div className="ml-auto flex items-center space-x-4">
                <UserNav />
              </div>
            </div>
          </div>
          <div className="flex-1 flex">
            <div className="hidden md:flex md:w-64 md:flex-col">
              <SideNav />
            </div>
            <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
          </div>
        </div>
      </ProjectProvider>
    </QueryClientProvider>
  )
}
