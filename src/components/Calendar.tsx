import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Calendar as CalendarIcon, Clock, Plus, Filter } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useState } from "react"

export function Calendar() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newPost, setNewPost] = useState({
    title: "",
    date: "",
    time: "",
    platform: "",
    type: "",
    client: "",
    preview: "",
    assignee: ""
  })
  const [posts, setPosts] = useState([
    {
      id: 1,
      date: "2025-08-19",
      time: "09:00",
      title: "Post Campanha Verão - Biquíni Tropical",
      platform: "Instagram",
      type: "Post",
      client: "BeachWear Co.",
      status: "Agendado",
      assignee: "MS",
      preview: "🌴 Novo biquíni tropical chegou! Tendência verão 2025..."
    },
    {
      id: 2,
      date: "2025-08-19",
      time: "14:30",
      title: "Stories - Bastidores Produção",
      platform: "Instagram",
      type: "Story",
      client: "BeachWear Co.",
      status: "Agendado",
      assignee: "JS",
      preview: "Vem ver como foi a produção do nosso novo catálogo! 📸"
    },
    {
      id: 3,
      date: "2025-08-20",
      time: "10:00",
      title: "Lançamento Produto X",
      platform: "LinkedIn",
      type: "Post",
      client: "TechStart",
      status: "Agendado",
      assignee: "PL",
      preview: "Revolucione sua produtividade com o Produto X..."
    },
    {
      id: 4,
      date: "2025-08-20",
      time: "16:00",
      title: "Reels - Tutorial Produto",
      platform: "Instagram",
      type: "Reel",
      client: "TechStart",
      status: "Em Aprovação",
      assignee: "MS",
      preview: "Como usar o Produto X em 60 segundos! ⚡"
    },
    {
      id: 5,
      date: "2025-08-21",
      time: "11:00",
      title: "Post Educativo - Nutrição",
      platform: "Facebook",
      type: "Post",
      client: "RestaurantePlus",
      status: "Rascunho",
      assignee: "JS",
      preview: "5 dicas para uma alimentação mais saudável..."
    }
  ])

  const handleAddPost = () => {
    if (newPost.title && newPost.date && newPost.time && newPost.platform && newPost.client) {
      const post = {
        id: posts.length + 1,
        ...newPost,
        status: "Rascunho"
      }
      setPosts([...posts, post])
      setNewPost({
        title: "",
        date: "",
        time: "",
        platform: "",
        type: "",
        client: "",
        preview: "",
        assignee: ""
      })
      setIsDialogOpen(false)
    }
  }

  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()
  
  // Generate calendar days for current month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
  const firstDayWeekday = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()
  
  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ]
  
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

  const scheduledPosts = posts

  const upcomingPosts = scheduledPosts
    .filter(post => new Date(post.date + "T" + post.time) >= new Date())
    .sort((a, b) => new Date(a.date + "T" + a.time).getTime() - new Date(b.date + "T" + b.time).getTime())
    .slice(0, 5)

  const getPostsForDate = (date: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`
    return scheduledPosts.filter(post => post.date === dateStr)
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "Instagram":
        return "bg-pink-100 text-pink-800"
      case "Facebook":
        return "bg-blue-100 text-blue-800"
      case "LinkedIn":
        return "bg-indigo-100 text-indigo-800"
      case "TikTok":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Agendado":
        return "default"
      case "Em Aprovação":
        return "secondary"
      case "Rascunho":
        return "outline"
      case "Publicado":
        return "success"
      default:
        return "outline"
    }
  }

  const calendarDays = []
  
  // Empty cells for days before month starts
  for (let i = 0; i < firstDayWeekday; i++) {
    calendarDays.push(null)
  }
  
  // Days of the month
  for (let date = 1; date <= daysInMonth; date++) {
    calendarDays.push(date)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Calendário</h1>
          <p className="text-muted-foreground">
            Gerencie suas postagens e campanhas
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nova Postagem
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Criar Nova Postagem</DialogTitle>
                <DialogDescription>
                  Preencha os detalhes da nova postagem para a agenda.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Título
                  </Label>
                  <Input
                    id="title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    className="col-span-3"
                    placeholder="Título da postagem"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Data
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={newPost.date}
                    onChange={(e) => setNewPost({...newPost, date: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time" className="text-right">
                    Hora
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={newPost.time}
                    onChange={(e) => setNewPost({...newPost, time: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="platform" className="text-right">
                    Plataforma
                  </Label>
                  <Select value={newPost.platform} onValueChange={(value: string) => setNewPost({...newPost, platform: value})}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione a plataforma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="Facebook">Facebook</SelectItem>
                      <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                      <SelectItem value="TikTok">TikTok</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Tipo
                  </Label>
                  <Select value={newPost.type} onValueChange={(value: string) => setNewPost({...newPost, type: value})}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Post">Post</SelectItem>
                      <SelectItem value="Story">Story</SelectItem>
                      <SelectItem value="Reel">Reel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="client" className="text-right">
                    Cliente
                  </Label>
                  <Input
                    id="client"
                    value={newPost.client}
                    onChange={(e) => setNewPost({...newPost, client: e.target.value})}
                    className="col-span-3"
                    placeholder="Nome do cliente"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="assignee" className="text-right">
                    Responsável
                  </Label>
                  <Input
                    id="assignee"
                    value={newPost.assignee}
                    onChange={(e) => setNewPost({...newPost, assignee: e.target.value})}
                    className="col-span-3"
                    placeholder="Iniciais (ex: MS)"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="preview" className="text-right">
                    Preview
                  </Label>
                  <Textarea
                    id="preview"
                    value={newPost.preview}
                    onChange={(e) => setNewPost({...newPost, preview: e.target.value})}
                    className="col-span-3"
                    placeholder="Texto da postagem"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddPost}>
                  Criar Postagem
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="calendar" className="space-y-4">
        <TabsList>
          <TabsTrigger value="calendar">Calendário</TabsTrigger>
          <TabsTrigger value="list">Lista</TabsTrigger>
          <TabsTrigger value="upcoming">Próximas</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5" />
                <span>{monthNames[currentMonth]} {currentYear}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4 text-center">
                {weekDays.map((day) => (
                  <div key={day} className="p-2 text-sm text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((date, index) => {
                  if (!date) {
                    return <div key={index} className="p-2 h-24"></div>
                  }
                  
                  const posts = getPostsForDate(date)
                  const isToday = date === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()
                  
                  return (
                    <div
                      key={date}
                      className={`p-2 h-24 border rounded-md cursor-pointer hover:bg-muted/50 ${
                        isToday ? "bg-primary/10 border-primary" : ""
                      }`}
                    >
                      <div className={`text-sm mb-1 ${isToday ? "text-primary font-medium" : ""}`}>
                        {date}
                      </div>
                      <div className="space-y-1">
                        {posts.slice(0, 2).map((post) => (
                          <div
                            key={post.id}
                            className="text-xs p-1 rounded bg-primary/10 text-primary truncate"
                          >
                            {post.time} - {post.platform}
                          </div>
                        ))}
                        {posts.length > 2 && (
                          <div className="text-xs text-muted-foreground">
                            +{posts.length - 2} mais
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <div className="space-y-4">
            {scheduledPosts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{post.title}</h3>
                        <Badge className={getPlatformColor(post.platform)}>
                          {post.platform}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {post.type}
                        </Badge>
                        <Badge variant={getStatusColor(post.status)}>
                          {post.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{post.preview}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <CalendarIcon className="h-4 w-4" />
                          <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.time}</span>
                        </div>
                        <span>•</span>
                        <span>{post.client}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">{post.assignee}</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Próximas Postagens</CardTitle>
              <CardDescription>
                Postagens agendadas para os próximos dias
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingPosts.map((post) => (
                <div key={post.id} className="flex items-center space-x-4 p-3 border rounded-md">
                  <div className="text-center min-w-[60px]">
                    <p className="text-sm text-muted-foreground">
                      {new Date(post.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                    </p>
                    <p className="text-sm">{post.time}</p>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-sm">{post.title}</h4>
                      <Badge className={getPlatformColor(post.platform)} size="sm">
                        {post.platform}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{post.client}</p>
                    <p className="text-xs text-muted-foreground truncate">{post.preview}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">{post.assignee}</AvatarFallback>
                    </Avatar>
                    <Badge variant={getStatusColor(post.status)} size="sm">
                      {post.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}