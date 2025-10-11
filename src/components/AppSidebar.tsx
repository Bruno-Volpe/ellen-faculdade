import { Calendar, Users, FolderOpen, Settings, BarChart3, MessageSquare, Zap, FileText } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar"
import { ClientSelector } from "./ClientSelector"

interface AppSidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const items = [
  {
    title: "Dashboard",
    key: "dashboard",
    icon: BarChart3,
  },
  {
    title: "Campanhas",
    key: "campaigns",
    icon: FolderOpen,
  },
  {
    title: "Posts",
    key: "posts",
    icon: FileText,
  },
  {
    title: "Equipe",
    key: "team",
    icon: Users,
  },
  {
    title: "Calendário",
    key: "calendar",
    icon: Calendar,
  },
  {
    title: "Integrações",
    key: "integrations",
    icon: Zap,
  },
  {
    title: "Configurações",
    key: "settings",
    icon: Settings,
  },
]

export function AppSidebar({ activeSection, setActiveSection }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Cliente Atual</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-2 py-1">
              <ClientSelector />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Marketing Hub</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={activeSection === item.key}
                  >
                    <button onClick={() => setActiveSection(item.key)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}