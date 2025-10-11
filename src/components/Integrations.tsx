import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Switch } from "./ui/switch"
import { Alert, AlertDescription } from "./ui/alert"
import { CheckCircle2, AlertCircle, Settings, Zap, ExternalLink } from "lucide-react"

export function Integrations() {
  const integrations = [
    {
      id: "meta",
      name: "Meta Business",
      description: "Instagram e Facebook Ads, postagens automáticas",
      logo: "📘",
      status: "connected",
      features: ["Posts automáticos", "Stories", "Instagram Reels", "Facebook Ads"],
      lastSync: "Há 2 minutos",
      accountsConnected: 3
    },
    {
      id: "google",
      name: "Google Ads",
      description: "Campanhas do Google Ads e YouTube",
      logo: "🎯",
      status: "connected",
      features: ["Google Ads", "YouTube Ads", "Google Analytics", "Search Console"],
      lastSync: "Há 5 minutos",
      accountsConnected: 2
    },
    {
      id: "tiktok",
      name: "TikTok for Business",
      description: "TikTok Ads e publicação de conteúdo",
      logo: "🎵",
      status: "error",
      features: ["TikTok Ads", "Publicação de vídeos", "Analytics"],
      lastSync: "Erro há 2 horas",
      accountsConnected: 1,
      error: "Token de acesso expirado"
    },
    {
      id: "linkedin",
      name: "LinkedIn Marketing",
      description: "LinkedIn Ads e publicações corporativas",
      logo: "💼",
      status: "connected",
      features: ["LinkedIn Ads", "Posts de página", "InMail", "Analytics"],
      lastSync: "Há 10 minutos",
      accountsConnected: 1
    },
    {
      id: "twitter",
      name: "X (Twitter) API",
      description: "Publicação e gerenciamento de tweets",
      logo: "🐦",
      status: "disconnected",
      features: ["Posts automáticos", "Threads", "X Ads", "Analytics"],
      lastSync: "Nunca conectado",
      accountsConnected: 0
    },
    {
      id: "pinterest",
      name: "Pinterest Business",
      description: "Pinterest Ads e pins automáticos",
      logo: "📌",
      status: "disconnected",
      features: ["Pinterest Ads", "Pins automáticos", "Boards", "Analytics"],
      lastSync: "Nunca conectado",
      accountsConnected: 0
    }
  ]

  const tools = [
    {
      name: "Zapier",
      description: "Automações entre ferramentas",
      logo: "⚡",
      status: "connected",
      zapCount: 12
    },
    {
      name: "Hootsuite",
      description: "Agendamento de posts",
      logo: "🦉",
      status: "available"
    },
    {
      name: "Canva",
      description: "Criação de designs",
      logo: "🎨",
      status: "available"
    },
    {
      name: "Slack",
      description: "Notificações da equipe",
      logo: "💬",
      status: "connected"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "default"
      case "error":
        return "destructive"
      case "disconnected":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "disconnected":
        return <AlertCircle className="h-4 w-4 text-gray-400" />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "connected":
        return "Conectado"
      case "error":
        return "Erro"
      case "disconnected":
        return "Desconectado"
      case "available":
        return "Disponível"
      default:
        return "Desconhecido"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1>Integrações</h1>
        <p className="text-muted-foreground">
          Conecte suas ferramentas e automatize seus processos
        </p>
      </div>

      <Alert>
        <Zap className="h-4 w-4" />
        <AlertDescription>
          Conecte suas contas de rede social para automatizar publicações e sincronizar métricas. 
          Lembre-se de que este sistema não deve ser usado para coletar dados pessoais sensíveis.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <div>
          <h2>Redes Sociais e Publicidade</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Gerencie suas campanhas e publique conteúdo automaticamente
          </p>
          
          <div className="grid gap-4 md:grid-cols-2">
            {integrations.map((integration) => (
              <Card key={integration.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{integration.logo}</div>
                      <div>
                        <CardTitle className="text-base">{integration.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {integration.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(integration.status)}
                      <Badge variant={getStatusColor(integration.status)} className="text-xs">
                        {getStatusText(integration.status)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {integration.status === "error" && integration.error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        {integration.error}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <h4 className="text-sm">Funcionalidades</h4>
                    <div className="flex flex-wrap gap-1">
                      {integration.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <p className="text-muted-foreground">Última sincronização</p>
                      <p>{integration.lastSync}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground">Contas conectadas</p>
                      <p>{integration.accountsConnected}</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {integration.status === "connected" ? (
                      <>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Settings className="h-4 w-4 mr-2" />
                          Configurar
                        </Button>
                        <Button variant="outline" size="sm">
                          Desconectar
                        </Button>
                      </>
                    ) : integration.status === "error" ? (
                      <Button size="sm" className="flex-1">
                        Reconectar
                      </Button>
                    ) : (
                      <Button size="sm" className="flex-1">
                        Conectar
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2>Ferramentas e Automações</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Integre com ferramentas externas para otimizar seu fluxo de trabalho
          </p>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {tools.map((tool, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{tool.logo}</span>
                      <CardTitle className="text-sm">{tool.name}</CardTitle>
                    </div>
                    <Switch 
                      checked={tool.status === "connected"} 
                      disabled={tool.status === "available"}
                    />
                  </div>
                  <CardDescription className="text-xs">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  {tool.zapCount && (
                    <p className="text-xs text-muted-foreground">
                      {tool.zapCount} automações ativas
                    </p>
                  )}
                  {tool.status === "available" && (
                    <Button size="sm" variant="outline" className="w-full mt-2">
                      <ExternalLink className="h-3 w-3 mr-2" />
                      Configurar
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}