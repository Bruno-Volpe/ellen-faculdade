import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Plus, Mail, Phone, MoreHorizontal, Calendar, TrendingUp } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

export function Team() {
  const teamMembers = [
    {
      id: 1,
      name: "Maria Silva",
      role: "Designer Sênior",
      department: "Criação",
      email: "maria.silva@agencia.com",
      phone: "+55 11 99999-0001",
      avatar: "MS",
      status: "online",
      activeProjects: 3,
      completedTasks: 28,
      rating: 4.9,
      skills: ["UI/UX", "Branding", "Social Media", "Ilustração"],
      recentWork: [
        { project: "Campanha Verão 2025", task: "Layouts Instagram", date: "Hoje" },
        { project: "Lançamento Produto X", task: "Banner LinkedIn", date: "Ontem" }
      ]
    },
    {
      id: 2,
      name: "João Santos",
      role: "Redator",
      department: "Conteúdo",
      email: "joao.santos@agencia.com",
      phone: "+55 11 99999-0002",
      avatar: "JS",
      status: "online",
      activeProjects: 2,
      completedTasks: 35,
      rating: 4.8,
      skills: ["Copywriting", "SEO", "Content Strategy", "Social Media"],
      recentWork: [
        { project: "Campanha Verão 2025", task: "Textos para Stories", date: "Hoje" },
        { project: "Rebranding Completo", task: "Tom de Voz", date: "2 dias atrás" }
      ]
    },
    {
      id: 3,
      name: "Ana Costa",
      role: "Gestora de Projetos",
      department: "Gestão",
      email: "ana.costa@agencia.com",
      phone: "+55 11 99999-0003",
      avatar: "AC",
      status: "busy",
      activeProjects: 5,
      completedTasks: 42,
      rating: 4.9,
      skills: ["Gestão de Projetos", "Scrum", "Cliente", "Estratégia"],
      recentWork: [
        { project: "Campanha Verão 2025", task: "Reunião com Cliente", date: "Hoje" },
        { project: "Rebranding Completo", task: "Planejamento Sprint", date: "Ontem" }
      ]
    },
    {
      id: 4,
      name: "Pedro Lima",
      role: "Designer Júnior",
      department: "Criação",
      email: "pedro.lima@agencia.com",
      phone: "+55 11 99999-0004",
      avatar: "PL",
      status: "offline",
      activeProjects: 2,
      completedTasks: 15,
      rating: 4.6,
      skills: ["Design Gráfico", "Motion", "Social Media", "Photoshop"],
      recentWork: [
        { project: "Lançamento Produto X", task: "Animações", date: "Ontem" },
        { project: "Campanha Verão 2025", task: "Peças Secundárias", date: "3 dias atrás" }
      ]
    }
  ]

  const departments = [
    {
      name: "Criação",
      members: teamMembers.filter(m => m.department === "Criação"),
      color: "bg-blue-100 text-blue-800"
    },
    {
      name: "Conteúdo",
      members: teamMembers.filter(m => m.department === "Conteúdo"),
      color: "bg-green-100 text-green-800"
    },
    {
      name: "Gestão",
      members: teamMembers.filter(m => m.department === "Gestão"),
      color: "bg-purple-100 text-purple-800"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "busy":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "online":
        return "Online"
      case "busy":
        return "Ocupado"
      case "offline":
        return "Offline"
      default:
        return "Desconhecido"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Equipe</h1>
          <p className="text-muted-foreground">
            Gerencie sua equipe e acompanhe a performance
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Membro
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todos ({teamMembers.length})</TabsTrigger>
          {departments.map((dept) => (
            <TabsTrigger key={dept.name} value={dept.name.toLowerCase()}>
              {dept.name} ({dept.members.length})
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {teamMembers.map((member) => (
              <Card key={member.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>{member.avatar}</AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(member.status)}`}
                        />
                      </div>
                      <div>
                        <CardTitle className="text-base">{member.name}</CardTitle>
                        <CardDescription>{member.role}</CardDescription>
                        <Badge className={`text-xs mt-1 ${departments.find(d => d.name === member.department)?.color}`}>
                          {member.department}
                        </Badge>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Ver Perfil</DropdownMenuItem>
                        <DropdownMenuItem>Enviar Mensagem</DropdownMenuItem>
                        <DropdownMenuItem>Atribuir Projeto</DropdownMenuItem>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Contato */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{member.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{member.phone}</span>
                    </div>
                  </div>

                  {/* Estatísticas */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-lg font-medium">{member.activeProjects}</p>
                      <p className="text-xs text-muted-foreground">Projetos Ativos</p>
                    </div>
                    <div>
                      <p className="text-lg font-medium">{member.completedTasks}</p>
                      <p className="text-xs text-muted-foreground">Tarefas Concluídas</p>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <p className="text-lg font-medium">{member.rating}</p>
                      <p className="text-xs text-muted-foreground">/5.0</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="space-y-2">
                    <h4 className="text-sm">Habilidades</h4>
                    <div className="flex flex-wrap gap-1">
                      {member.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Trabalho Recente */}
                  <div className="space-y-2">
                    <h4 className="text-sm">Trabalho Recente</h4>
                    <div className="space-y-1">
                      {member.recentWork.map((work, index) => (
                        <div key={index} className="flex justify-between items-center text-xs">
                          <div>
                            <p className="font-medium">{work.task}</p>
                            <p className="text-muted-foreground">{work.project}</p>
                          </div>
                          <span className="text-muted-foreground">{work.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {departments.map((dept) => (
          <TabsContent key={dept.name} value={dept.name.toLowerCase()} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {dept.members.map((member) => (
                <Card key={member.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback>{member.avatar}</AvatarFallback>
                          </Avatar>
                          <div
                            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(member.status)}`}
                          />
                        </div>
                        <div>
                          <CardTitle className="text-base">{member.name}</CardTitle>
                          <CardDescription>{member.role}</CardDescription>
                          <p className="text-xs text-muted-foreground mt-1">
                            {getStatusText(member.status)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}