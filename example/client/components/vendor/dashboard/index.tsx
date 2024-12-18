import { Sidebar } from "./sidebar"
import { DashboardContent } from "./dashboard-content"
import { SidebarProvider } from "@/components/ui/sidebar"

export function VendorDashboard() {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <DashboardContent />
        </div>
      </div>
    </SidebarProvider>
  )
}

