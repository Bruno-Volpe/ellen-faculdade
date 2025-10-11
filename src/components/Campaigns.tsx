import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Progress } from "./ui/progress"
import { Plus, MoreHorizontal, Calendar, Users, Target } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

export function Campaigns() {
  const campaigns = [
    {
      id: 1,
      name: "Campanha Verão 2025",
      client: "BeachWear Co.",
      description: "Campanha completa para a coleção de verão incluindo posts, stories e reels para Instagram e TikTok",
      status: "Em Progresso",
      progress: 75,
      budget: "R$ 25.000",
      deadline: "30/08/2025",
      team: [
        { name: "Maria Silva", role: "Designer", avatar: "MS" },
        { name: "João Santos", role: "Redator", avatar: "JS" },
        { name: "Ana Costa", role: "Gestora", avatar: "AC" }
      ],
      deliverables: [
        { name: "Briefing", completed: true },
        { name: "Layouts Instagram", completed: true },
        { name: "Textos Criativos", completed: true },
        { name: "Aprovação Cliente", completed: false },
        { name: "Produção Final", completed: false }
      ]
    },
    {
      id: 2,
      name: "Lançamento Produto X",
      client: "TechStart",
      description: "Estratégia de lançamento multiplataforma com foco em LinkedIn e Google Ads",
      status: "Revisão",
      progress: 90,
      budget: "R$ 15.000",
      deadline: "25/08/2025",
      team: [
        { name: "Pedro Lima", role: "Designer", avatar: "PL" },
        { name: "Lucia Rocha", role: "Redatora", avatar: "LR" }
      ],
      deliverables: [
        { name: "Estratégia", completed: true },
        { name: "Peças Criativas", completed: true },
        { name: "Copywriting", completed: true },
        { name: "Testes A/B", completed: true },
        { name: "Lançamento", completed: false }
      ]
    },
    {
      id: 3,
      name: "Rebranding Completo",
      client: "RestaurantePlus",
      description: "Renovação completa da identidade visual e estratégia de conteúdo",
      status: "Planejamento",
      progress: 25,
      budget: "R$ 40.000",
      deadline: "15/09/2025",
      team: [
        { name: "Roberto Silva", role: "Designer", avatar: "RS" },
        { name: "Carla Mendes", role: "Estrategista", avatar: "CM" },
        { name: "Ana Costa", role: "Gestora", avatar: "AC" }
      ],
      deliverables: [
        { name: "Pesquisa de Mercado", completed: true },
        { name: "Briefing Criativo", completed: false },
        { name: "Identidade Visual", completed: false },
        { name: "Manual da Marca", completed: false },
        { name: "Implementação", completed: false }
      ]
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em Progresso":
        return "default"
      case "Revisão":
        return "secondary"
      case "Planejamento":
        return "outline"
      case "Concluído":
        return "success"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Campanhas</h1>
          <p className="text-muted-foreground">
            Gerencie todas as campanhas da sua agência
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nova Campanha
        </Button>
      </div>

      <div className="grid gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CardTitle>{campaign.name}</CardTitle>
                    <Badge variant={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </div>
                  <CardDescription className="max-w-2xl">
                    {campaign.description}
                  </CardDescription>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Target className="h-4 w-4" />
                      <span>{campaign.client}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{campaign.deadline}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>💰</span>
                      <span>{campaign.budget}</span>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Editar Campanha</DropdownMenuItem>
                    <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                    <DropdownMenuItem>Duplicar</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progresso */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso da Campanha</span>
                  <span>{campaign.progress}%</span>
                </div>
                <Progress value={campaign.progress} />
              </div>

              {/* Equipe */}
              <div className="space-y-2">
                <h4 className="text-sm">Equipe</h4>
                <div className="flex space-x-2">
                  {campaign.team.map((member, index) => (
                    <div key={index} className="flex items-center space-x-2 bg-muted rounded-md px-2 py-1">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">{member.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Entregas */}
              <div className="space-y-2">
                <h4 className="text-sm">Entregas</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {campaign.deliverables.map((deliverable, index) => (
                    <div
                      key={index}
                      className={`text-xs p-2 rounded-md border ${
                        deliverable.completed
                          ? "bg-green-50 border-green-200 text-green-800"
                          : "bg-gray-50 border-gray-200 text-gray-600"
                      }`}
                    >
                      <div className="flex items-center space-x-1">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            deliverable.completed ? "bg-green-500" : "bg-gray-300"
                          }`}
                        />
                        <span>{deliverable.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
