import { useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Switch } from "./ui/switch"
import { Alert, AlertDescription } from "./ui/alert"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { CheckCircle2, AlertCircle, Settings, Zap, ExternalLink } from "lucide-react"

export function Integrations() {
  const [twitterAccessToken, setTwitterAccessToken] = useState("")
  const [twitterAccessSecret, setTwitterAccessSecret] = useState("")
  const [twitterPostText, setTwitterPostText] = useState("")
  const [twitterPostLoading, setTwitterPostLoading] = useState(false)
  const [twitterPostFeedback, setTwitterPostFeedback] = useState<
    { type: "success" | "error"; message: string } | null
  >(null)

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

  const mediaManagerBaseUrl = (
    import.meta as ImportMeta & { env?: Record<string, string | undefined> }
  ).env?.VITE_MEDIA_MANAGER_URL || "https://mediahub-media-manager-1.onrender.com"

  const sanitizeBaseUrl = (url: string) => url.replace(/\/$/, "")

  const handleConnectTwitter = () => {
    const connectUrl = `${sanitizeBaseUrl(mediaManagerBaseUrl)}/auth/x/connect`
    window.open(connectUrl, "_blank", "noopener,noreferrer")
  }

  const handlePostToTwitter = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setTwitterPostFeedback(null)
    setTwitterPostLoading(true)

    try {
      if (!twitterAccessToken || !twitterAccessSecret || !twitterPostText.trim()) {
        throw new Error("Preencha token, secret e o texto da publicação antes de enviar.")
      }

      const response = await fetch(`${sanitizeBaseUrl(mediaManagerBaseUrl)}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          access_token: twitterAccessToken,
          access_secret: twitterAccessSecret,
          text: twitterPostText.trim()
        })
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || "Erro ao enviar o post para o X (Twitter).")
      }

      setTwitterPostFeedback({ type: "success", message: "Post enviado para processamento com sucesso." })
      setTwitterPostText("")
    } catch (error) {
      console.error("Erro ao enviar post para o X (Twitter)", error)
      setTwitterPostFeedback({
        type: "error",
        message: error instanceof Error ? error.message : "Erro inesperado ao enviar o post."
      })
    } finally {
      setTwitterPostLoading(false)
    }
  }

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
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={integration.id === "twitter" ? handleConnectTwitter : undefined}
                      >
                        Conectar
                      </Button>
                    )}
                  </div>

                  {integration.id === "twitter" && (
                    <div className="space-y-4 rounded-lg border border-dashed border-primary/30 bg-primary/5 p-4">
                      <div>
                        <p className="text-sm font-medium">Tokens de acesso</p>
                        <p className="text-xs text-muted-foreground">
                          Cole aqui o <strong>access_token</strong> e o <strong>access_secret</strong> fornecidos pelo Media Manager após o redirecionamento.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="space-y-1">
                          <Label htmlFor="twitter-access-token" className="text-xs uppercase tracking-wide">
                            Access Token
                          </Label>
                          <Input
                            id="twitter-access-token"
                            value={twitterAccessToken}
                            onChange={(event) => setTwitterAccessToken(event.target.value)}
                            placeholder="cole o access_token gerado"
                            className="font-mono text-xs"
                          />
                        </div>

                        <div className="space-y-1">
                          <Label htmlFor="twitter-access-secret" className="text-xs uppercase tracking-wide">
                            Access Secret
                          </Label>
                          <Input
                            id="twitter-access-secret"
                            value={twitterAccessSecret}
                            onChange={(event) => setTwitterAccessSecret(event.target.value)}
                            placeholder="cole o access_secret gerado"
                            className="font-mono text-xs"
                          />
                        </div>
                      </div>

                      <form className="space-y-3" onSubmit={handlePostToTwitter}>
                        <div className="space-y-1">
                          <Label htmlFor="twitter-post-text" className="text-xs uppercase tracking-wide">
                            Texto da publicação
                          </Label>
                          <Textarea
                            id="twitter-post-text"
                            value={twitterPostText}
                            onChange={(event) => setTwitterPostText(event.target.value)}
                            placeholder="Escreva o conteúdo do seu post"
                            rows={4}
                          />
                        </div>

                        <Button type="submit" disabled={twitterPostLoading} className="w-full">
                          {twitterPostLoading ? "Enviando..." : "Enviar para /posts"}
                        </Button>
                      </form>

                      {twitterPostFeedback && (
                        <Alert variant={twitterPostFeedback.type === "success" ? "default" : "destructive"}>
                          {twitterPostFeedback.type === "success" ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <AlertCircle className="h-4 w-4" />
                          )}
                          <AlertDescription className="text-sm">
                            {twitterPostFeedback.message}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  )}
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