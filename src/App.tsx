import { useState } from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "./components/ui/sidebar"
import { Separator } from "./components/ui/separator"
import { AppSidebar } from "./components/AppSidebar"
import { Dashboard } from "./components/Dashboard"
import { Campaigns } from "./components/Campaigns"
import { Posts } from "./components/Posts"
import { Team } from "./components/Team"
import { Calendar } from "./components/Calendar"
import { Integrations } from "./components/Integrations"

export default function App() {
  const [activeSection, setActiveSection] = useState("dashboard")

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />
      case "campaigns":
        return <Campaigns />
      case "posts":
        return <Posts />
      case "team":
        return <Team />
      case "calendar":
        return <Calendar />
      case "integrations":
        return <Integrations />
      case "settings":
        return (
          <div className="space-y-6">
            <header>
              <h2>Configurações</h2>
              <p className="text-muted-foreground">
                Configure sua agência e preferências
              </p>
            </header>
            <div className="flex items-center justify-center h-96 border-2 border-dashed border-border rounded-lg">
              <p className="text-muted-foreground">Seção de Configurações em desenvolvimento</p>
            </div>
          </div>
        )
      default:
        return <Dashboard />
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="font-semibold">Marketing Hub</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <main className="min-h-[100vh] flex-1 rounded-xl bg-background p-6">
            {renderContent()}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}