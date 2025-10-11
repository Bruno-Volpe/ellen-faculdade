import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Calendar, TrendingUp, Users, Target, Clock, ArrowUpRight, AlertCircle, CheckCircle2, Timer } from "lucide-react"

export function Dashboard() {
  const metrics = [
    {
      title: "Projetos Ativos",
      value: "12",
      description: "+2 este mês",
      icon: Target,
      trend: "up",
      ariaLabel: "12 projetos ativos, aumento de 2 projetos este mês"
    },
    {
      title: "Postagens Agendadas",
      value: "48",
      description: "Próximos 7 dias",
      icon: Calendar,
      trend: "stable",
      ariaLabel: "48 postagens agendadas para os próximos 7 dias"
    },
    {
      title: "Membros da Equipe",
      value: "8",
      description: "4 designers, 3 redatores, 1 gestor",
      icon: Users,
      trend: "up",
      ariaLabel: "8 membros da equipe: 4 designers, 3 redatores e 1 gestor"
    },
    {
      title: "Taxa de Engajamento",
      value: "4.2%",
      description: "+0.8% vs mês anterior",
      icon: TrendingUp,
      trend: "up",
      ariaLabel: "Taxa de engajamento de 4.2%, aumento de 0.8% em relação ao mês anterior"
    }
  ]

  const recentProjects = [
    {
      name: "Campanha Verão 2025",
      client: "BeachWear Co.",
      status: "Em Progresso",
      progress: 75,
      team: [
        { initials: "DS", name: "Diego Silva" },
        { initials: "RD", name: "Rafaela Dias" },
        { initials: "GS", name: "Gabriel Santos" }
      ],
      statusIcon: Timer,
      statusColor: "bg-blue-100 text-blue-800 border-blue-200"
    },
    {
      name: "Lançamento Produto X",
      client: "TechStart",
      status: "Revisão",
      progress: 90,
      team: [
        { initials: "AN", name: "Ana Nunes" },
        { initials: "MR", name: "Marcos Ribeiro" }
      ],
      statusIcon: AlertCircle,
      statusColor: "bg-amber-100 text-amber-800 border-amber-200"
    },
    {
      name: "Rebranding Completo",
      client: "RestaurantePlus",
      status: "Planejamento",
      progress: 25,
      team: [
        { initials: "JO", name: "Joana Oliveira" },
        { initials: "LU", name: "Lucas Alves" },
        { initials: "PE", name: "Pedro Costa" }
      ],
      statusIcon: CheckCircle2,
      statusColor: "bg-green-100 text-green-800 border-green-200"
    }
  ]

  const upcomingTasks = [
    {
      task: "Criar posts Instagram - Campanha Verão",
      assignee: "Maria Silva",
      deadline: "Hoje, 16:00",
      priority: "Alta",
      urgency: "urgent",
      ariaLabel: "Tarefa de alta prioridade: Criar posts Instagram para Campanha Verão, atribuída a Maria Silva, prazo hoje às 16:00"
    },
    {
      task: "Revisar conteúdo blog TechStart",
      assignee: "João Santos",
      deadline: "Amanhã, 10:00",
      priority: "Média",
      urgency: "medium",
      ariaLabel: "Tarefa de média prioridade: Revisar conteúdo blog TechStart, atribuída a João Santos, prazo amanhã às 10:00"
    },
    {
      task: "Apresentação para cliente RestaurantePlus",
      assignee: "Ana Costa",
      deadline: "23/08, 14:00",
      priority: "Alta",
      urgency: "urgent",
      ariaLabel: "Tarefa de alta prioridade: Apresentação para cliente RestaurantePlus, atribuída a Ana Costa, prazo dia 23/08 às 14:00"
    }
  ]

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case "Alta":
        return "bg-red-100 text-red-800 border-red-200 hover:bg-red-200"
      case "Média":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="sr-only">Dashboard da Agência de Marketing</h1>
        <div className="space-y-1">
          <h2>Dashboard</h2>
          <p className="text-muted-foreground">
            Visão geral dos seus projetos e equipe
          </p>
        </div>
      </header>

      {/* Métricas */}
      <section aria-labelledby="metrics-heading">
        <h3 id="metrics-heading" className="sr-only">Métricas principais</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <Card 
              key={metric.title}
              className="transition-all duration-200 hover:shadow-md focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <div className="flex items-center space-x-1">
                  <metric.icon 
                    className="h-4 w-4 text-muted-foreground" 
                    aria-hidden="true"
                  />
                  {metric.trend === "up" && (
                    <ArrowUpRight 
                      className="h-3 w-3 text-green-600" 
                      aria-label="Tendência positiva"
                    />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div 
                  className="text-2xl font-bold text-foreground"
                  aria-label={metric.ariaLabel}
                >
                  {metric.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {metric.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Projetos Recentes */}
        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader>
            <CardTitle id="recent-projects-heading">Projetos Recentes</CardTitle>
            <CardDescription>
              Acompanhe o progresso dos projetos ativos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <ul 
              className="space-y-4" 
              aria-labelledby="recent-projects-heading"
              role="list"
            >
              {recentProjects.map((project, index) => (
                <li 
                  key={index} 
                  className="p-4 rounded-lg border border-border hover:border-primary/20 transition-colors duration-200 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground truncate">
                          {project.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Cliente: {project.client}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <project.statusIcon 
                          className="h-3 w-3 text-muted-foreground" 
                          aria-hidden="true"
                        />
                        <Badge 
                          className={`text-xs font-medium border ${project.statusColor}`}
                          aria-label={`Status do projeto: ${project.status}`}
                        >
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                          <span>Progresso</span>
                          <span 
                            aria-label={`${project.progress}% concluído`}
                            className="font-medium text-foreground"
                          >
                            {project.progress}%
                          </span>
                        </div>
                        <Progress 
                          value={project.progress} 
                          className="h-2"
                          aria-label={`Progresso do projeto ${project.name}: ${project.progress}%`}
                        />
                      </div>
                      
                      <div className="flex -space-x-2" role="group" aria-label="Equipe do projeto">
                        {project.team.map((member, idx) => (
                          <Avatar 
                            key={idx} 
                            className="h-7 w-7 border-2 border-background hover:z-10 transition-transform hover:scale-110"
                          >
                            <AvatarFallback 
                              className="text-xs font-medium bg-muted text-muted-foreground"
                              title={member.name}
                              aria-label={`Membro da equipe: ${member.name}`}
                            >
                              {member.initials}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            <Button 
              variant="outline" 
              className="w-full mt-4 transition-colors duration-200 hover:bg-accent"
              aria-label="Ver todos os projetos"
            >
              Ver Todos os Projetos
            </Button>
          </CardContent>
        </Card>

        {/* Tarefas Próximas */}
        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader>
            <CardTitle id="upcoming-tasks-heading">Próximas Tarefas</CardTitle>
            <CardDescription>
              Tarefas com prazos próximos que precisam de atenção
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul 
              className="space-y-4" 
              aria-labelledby="upcoming-tasks-heading"
              role="list"
            >
              {upcomingTasks.map((task, index) => (
                <li 
                  key={index} 
                  className="p-4 rounded-lg border border-border hover:border-primary/20 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
                  role="article"
                  aria-label={task.ariaLabel}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <Clock 
                        className={`h-4 w-4 ${
                          task.urgency === "urgent" 
                            ? "text-red-500" 
                            : "text-muted-foreground"
                        }`}
                        aria-hidden="true"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0 space-y-2">
                      <div>
                        <h4 className="text-sm font-medium text-foreground line-clamp-2">
                          {task.task}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Responsável: {task.assignee}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Badge 
                            className={`text-xs font-medium border transition-colors duration-200 ${getPriorityStyles(task.priority)}`}
                            aria-label={`Prioridade ${task.priority.toLowerCase()}`}
                          >
                            {task.priority}
                          </Badge>
                          <time 
                            className={`text-xs font-medium ${
                              task.urgency === "urgent" 
                                ? "text-red-600" 
                                : "text-muted-foreground"
                            }`}
                            dateTime={task.deadline}
                          >
                            {task.deadline}
                          </time>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-6 px-2 text-xs hover:bg-accent"
                          aria-label={`Marcar tarefa "${task.task}" como concluída`}
                        >
                          Concluir
                        </Button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            <Button 
              variant="outline" 
              className="w-full mt-4 transition-colors duration-200 hover:bg-accent"
              aria-label="Ver todas as tarefas"
            >
              Ver Todas as Tarefas
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}