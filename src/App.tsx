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
import { AccessibilityMenu } from "./components/AccessibilityMenu"
import { ColorBlindFilters } from "./components/ColorBlindFilters"
import { VLibrasWidget } from "./components/VLibrasWidget"

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
      case "clients":
        return (
          <div className="space-y-6">
            <header>
              <h2>Clientes</h2>
              <p className="text-muted-foreground">
                Gerencie seus clientes e relacionamentos
              </p>
            </header>
            <div className="flex items-center justify-center h-96 border-2 border-dashed border-border rounded-lg">
              <p className="text-muted-foreground">Seção de Clientes em desenvolvimento</p>
            </div>
          </div>
        )
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
    <div lang="pt-BR">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
      >
        Pular para o conteúdo principal
      </a>
      <SidebarProvider>
        <ColorBlindFilters />
        <VLibrasWidget />
        <AppSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b">
            <div className="flex items-center justify-between w-full gap-2 px-4">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" aria-label="Alternar menu lateral" />
                <Separator orientation="vertical" className="mr-2 h-4" aria-hidden="true" />
                <h1 className="font-semibold">Marketing Hub</h1>
              </div>
              <AccessibilityMenu />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <main id="main-content" className="min-h-[100vh] flex-1 rounded-xl bg-background p-6" role="main" aria-live="polite">
              {renderContent()}
            </main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}