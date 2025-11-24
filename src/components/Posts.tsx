import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Plus, MoreHorizontal, Calendar, Image as ImageIcon, CheckCircle, XCircle, Clock, Edit, Trash2, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

interface Post {
  id: number
  title: string
  caption: string
  platform: string
  scheduledDate: string
  status: "Rascunho" | "Aguardando Aprovação" | "Aprovado" | "Rejeitado" | "Publicado"
  image?: string
  campaign: string
  author: string
  authorAvatar: string
  clientFeedback?: string
}

export function Posts() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: "Post Lançamento Coleção Verão",
      caption: "☀️ A nova coleção de verão chegou! Confira as novidades que vão deixar seu verão ainda mais estiloso. #Verão2025 #NovasColeção #BeachWear",
      platform: "Instagram",
      scheduledDate: "15/08/2025 14:00",
      status: "Aguardando Aprovação",
      image: "https://images.unsplash.com/photo-1523359346063-d879354c0ea5?w=800&h=800&fit=crop",
      campaign: "Campanha Verão 2025",
      author: "João Santos",
      authorAvatar: "JS"
    },
    {
      id: 2,
      title: "Story Produto X - Features",
      caption: "Descubra as funcionalidades incríveis do Produto X que vão revolucionar sua rotina! 🚀 #TechStart #Inovação",
      platform: "Instagram Stories",
      scheduledDate: "16/08/2025 10:00",
      status: "Aprovado",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=800&fit=crop",
      campaign: "Lançamento Produto X",
      author: "Lucia Rocha",
      authorAvatar: "LR"
    },
    {
      id: 3,
      title: "Post Menu Especial",
      caption: "🍽️ Nosso menu especial está de cara nova! Pratos exclusivos com ingredientes frescos e sabor incomparável. Venha experimentar! #RestaurantePlus #GastronomiaAutoral",
      platform: "Facebook",
      scheduledDate: "18/08/2025 19:00",
      status: "Rascunho",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=800&fit=crop",
      campaign: "Rebranding Completo",
      author: "Maria Silva",
      authorAvatar: "MS"
    },
    {
      id: 4,
      title: "Carrossel TikTok - Praia Essentials",
      caption: "Os 5 itens essenciais para sua ida à praia! 🏖️ Arrasta pro lado e confere! #BeachEssentials #Verão",
      platform: "TikTok",
      scheduledDate: "17/08/2025 16:00",
      status: "Rejeitado",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=800&fit=crop",
      campaign: "Campanha Verão 2025",
      author: "João Santos",
      authorAvatar: "JS",
      clientFeedback: "O tom de voz não está alinhado com nossa marca. Por favor, revisar o copy."
    },
    {
      id: 5,
      title: "Post LinkedIn - Lançamento",
      caption: "Estamos orgulhosos de apresentar o Produto X, desenvolvido com tecnologia de ponta para otimizar seus resultados. Saiba mais no link da bio. #B2B #TechInnovation",
      platform: "LinkedIn",
      scheduledDate: "14/08/2025 09:00",
      status: "Publicado",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=800&fit=crop",
      campaign: "Lançamento Produto X",
      author: "Pedro Lima",
      authorAvatar: "PL"
    },
  ])

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  const getStatusColor = (status: Post["status"]) => {
    switch (status) {
      case "Rascunho":
        return "outline"
      case "Aguardando Aprovação":
        return "secondary"
      case "Aprovado":
        return "default"
      case "Rejeitado":
        return "destructive"
      case "Publicado":
        return "default"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: Post["status"]) => {
    switch (status) {
      case "Aprovado":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Rejeitado":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "Aguardando Aprovação":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return null
    }
  }

  const handleDelete = (id: number) => {
    setPosts(posts.filter(post => post.id !== id))
  }

  const handleApprove = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, status: "Aprovado" as const } : post
    ))
  }

  const handleReject = (id: number, feedback: string) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, status: "Rejeitado" as const, clientFeedback: feedback } : post
    ))
  }

  const filterPosts = (status: Post["status"]) => {
    return posts.filter(post => post.status === status)
  }

  const filteredPosts = posts.filter(post => {
    if (activeTab === "all") return true
    if (activeTab === "pending") return post.status === "Aguardando Aprovação"
    if (activeTab === "approved") return post.status === "Aprovado"
    if (activeTab === "draft") return post.status === "Rascunho"
    if (activeTab === "published") return post.status === "Publicado"
    return true
  })

  return (
    <div className="space-y-6">
      <header>
        <h2 id="posts-heading">Posts e Conteúdo</h2>
        <p className="text-muted-foreground">
          Gerencie e agende postagens para suas redes sociais
        </p>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center gap-4">
          <TabsList>
            <TabsTrigger value="all" aria-label="Mostrar todos os posts">
              Todos ({posts.length})
            </TabsTrigger>
            <TabsTrigger value="draft" aria-label="Mostrar apenas rascunhos">
              Rascunhos ({filterPosts("Rascunho").length})
            </TabsTrigger>
            <TabsTrigger value="pending" aria-label="Mostrar posts aguardando aprovação">
              Aguardando ({filterPosts("Aguardando Aprovação").length})
            </TabsTrigger>
            <TabsTrigger value="approved" aria-label="Mostrar posts aprovados">
              Aprovados ({filterPosts("Aprovado").length})
            </TabsTrigger>
            <TabsTrigger value="published" aria-label="Mostrar posts publicados">
              Publicados ({filterPosts("Publicado").length})
            </TabsTrigger>
          </TabsList>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button aria-label="Criar novo post">
                <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
                Novo Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Criar Novo Post</DialogTitle>
                <DialogDescription>
                  Preencha os detalhes do novo post para aprovação
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Título</Label>
                  <Input id="title" placeholder="Ex: Post Lançamento Verão" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="campaign">Campanha</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma campanha" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="verao">Campanha Verão 2025</SelectItem>
                      <SelectItem value="produto">Lançamento Produto X</SelectItem>
                      <SelectItem value="rebranding">Rebranding Completo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="platform">Plataforma</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a plataforma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="instagram-stories">Instagram Stories</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="caption">Legenda</Label>
                  <Textarea 
                    id="caption" 
                    placeholder="Escreva a legenda do post..."
                    rows={4}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="scheduledDate">Data e Hora Agendada</Label>
                  <Input id="scheduledDate" type="datetime-local" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image">URL da Imagem</Label>
                  <Input id="image" placeholder="https://..." />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>
                  Criar Post
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <TabsContent value={activeTab} className="space-y-4 mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <div className="relative">
                  {post.image && (
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  {!post.image && (
                    <div className="w-full h-48 bg-muted flex items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <Badge variant={getStatusColor(post.status)} className="gap-1">
                      {getStatusIcon(post.status)}
                      {post.status}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{post.title}</CardTitle>
                      <CardDescription className="mt-1 line-clamp-2">
                        {post.caption}
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          aria-label={`Opções para o post ${post.title}`}
                        >
                          <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {
                          setSelectedPost(post)
                          setIsViewDialogOpen(true)
                        }}>
                          <Eye className="h-4 w-4 mr-2" aria-hidden="true" />
                          Ver Detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          setSelectedPost(post)
                          setIsEditDialogOpen(true)
                        }}>
                          <Edit className="h-4 w-4 mr-2" aria-hidden="true" />
                          Editar
                        </DropdownMenuItem>
                        {post.status === "Aguardando Aprovação" && (
                          <>
                            <DropdownMenuItem onClick={() => handleApprove(post.id)}>
                              <CheckCircle className="h-4 w-4 mr-2" aria-hidden="true" />
                              Aprovar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleReject(post.id, "Rejeitado pelo cliente")}>
                              <XCircle className="h-4 w-4 mr-2" aria-hidden="true" />
                              Rejeitar
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => handleDelete(post.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" aria-hidden="true" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Plataforma:</span>
                      <Badge variant="outline">{post.platform}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Campanha:</span>
                      <span className="text-xs">{post.campaign}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{post.scheduledDate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="text-xs">{post.authorAvatar}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">{post.author}</span>
                    </div>
                    {post.clientFeedback && (
                      <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-xs text-red-800">
                          <strong>Feedback:</strong> {post.clientFeedback}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialog de Visualização */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedPost?.title}</DialogTitle>
            <DialogDescription>Detalhes completos do post</DialogDescription>
          </DialogHeader>
          {selectedPost && (
            <div className="space-y-4">
              {selectedPost.image && (
                <ImageWithFallback
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              )}
              <div className="grid gap-3">
                <div>
                  <Label>Status</Label>
                  <div className="mt-1">
                    <Badge variant={getStatusColor(selectedPost.status)} className="gap-1">
                      {getStatusIcon(selectedPost.status)}
                      {selectedPost.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label>Legenda</Label>
                  <p className="mt-1 text-sm">{selectedPost.caption}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Plataforma</Label>
                    <p className="mt-1 text-sm">{selectedPost.platform}</p>
                  </div>
                  <div>
                    <Label>Data Agendada</Label>
                    <p className="mt-1 text-sm">{selectedPost.scheduledDate}</p>
                  </div>
                </div>
                <div>
                  <Label>Campanha</Label>
                  <p className="mt-1 text-sm">{selectedPost.campaign}</p>
                </div>
                <div>
                  <Label>Autor</Label>
                  <p className="mt-1 text-sm">{selectedPost.author}</p>
                </div>
                {selectedPost.clientFeedback && (
                  <div>
                    <Label>Feedback do Cliente</Label>
                    <div className="mt-1 p-3 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-sm text-red-800">{selectedPost.clientFeedback}</p>
                    </div>
                  </div>
                )}
              </div>
              {selectedPost.status === "Aguardando Aprovação" && (
                <div className="flex gap-2 pt-4">
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      handleApprove(selectedPost.id)
                      setIsViewDialogOpen(false)
                    }}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Aprovar Post
                  </Button>
                  <Button 
                    variant="destructive"
                    className="flex-1"
                    onClick={() => {
                      handleReject(selectedPost.id, "Rejeitado pelo cliente")
                      setIsViewDialogOpen(false)
                    }}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Rejeitar Post
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}