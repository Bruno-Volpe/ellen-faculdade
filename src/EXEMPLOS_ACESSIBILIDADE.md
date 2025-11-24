# 📚 Exemplos de Código Acessível

## Botões

### ✅ Correto - Botão com texto visível
```tsx
<Button>Salvar</Button>
```

### ✅ Correto - Botão apenas com ícone
```tsx
<Button aria-label="Fechar janela">
  <X className="h-4 w-4" aria-hidden="true" />
</Button>
```

### ✅ Correto - Botão com ícone e texto
```tsx
<Button aria-label="Criar novo post">
  <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
  Novo Post
</Button>
```

### ❌ Incorreto - Botão sem descrição
```tsx
<Button>
  <X className="h-4 w-4" />
</Button>
```

## Imagens

### ✅ Correto - Imagem funcional
```tsx
<ImageWithFallback 
  src="https://example.com/image.jpg" 
  alt="Coleção de roupas de verão em tons azul e amarelo" 
/>
```

### ✅ Correto - Imagem decorativa
```tsx
<img 
  src="decorative.jpg" 
  alt="" 
  aria-hidden="true" 
/>
```

### ✅ Correto - Avatar
```tsx
<Avatar>
  <AvatarImage 
    src="avatar.jpg" 
    alt="Foto de perfil de Maria Silva" 
  />
  <AvatarFallback>MS</AvatarFallback>
</Avatar>
```

### ❌ Incorreto - Sem alt
```tsx
<img src="image.jpg" />
```

## Formulários

### ✅ Correto - Input com label
```tsx
<div className="grid gap-2">
  <Label htmlFor="email">E-mail</Label>
  <Input 
    id="email" 
    type="email"
    placeholder="seu@email.com"
    aria-required="true"
  />
</div>
```

### ✅ Correto - Input com erro
```tsx
<div className="grid gap-2">
  <Label htmlFor="password">Senha</Label>
  <Input 
    id="password" 
    type="password"
    aria-required="true"
    aria-invalid="true"
    aria-describedby="password-error"
  />
  <span id="password-error" role="alert" className="text-sm text-destructive">
    A senha deve ter no mínimo 8 caracteres
  </span>
</div>
```

### ✅ Correto - Select acessível
```tsx
<div className="grid gap-2">
  <Label htmlFor="platform">Plataforma</Label>
  <Select>
    <SelectTrigger id="platform" aria-label="Selecione a plataforma">
      <SelectValue placeholder="Escolha uma plataforma" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="instagram">Instagram</SelectItem>
      <SelectItem value="facebook">Facebook</SelectItem>
    </SelectContent>
  </Select>
</div>
```

### ❌ Incorreto - Input sem label
```tsx
<Input placeholder="Digite seu nome" />
```

## Navegação

### ✅ Correto - Menu lateral
```tsx
<SidebarMenu role="navigation" aria-label="Menu principal">
  {items.map((item) => (
    <SidebarMenuItem key={item.key}>
      <SidebarMenuButton 
        asChild
        isActive={activeSection === item.key}
      >
        <button 
          onClick={() => setActiveSection(item.key)}
          aria-label={`Navegar para ${item.title}`}
          aria-current={activeSection === item.key ? 'page' : undefined}
        >
          <item.icon aria-hidden="true" />
          <span>{item.title}</span>
        </button>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ))}
</SidebarMenu>
```

### ✅ Correto - Tabs acessíveis
```tsx
<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger 
      value="all" 
      aria-label="Mostrar todos os posts"
    >
      Todos ({posts.length})
    </TabsTrigger>
    <TabsTrigger 
      value="draft" 
      aria-label="Mostrar apenas rascunhos"
    >
      Rascunhos ({drafts.length})
    </TabsTrigger>
  </TabsList>
</Tabs>
```

### ✅ Correto - Skip link
```tsx
<a 
  href="#main-content" 
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
>
  Pular para o conteúdo principal
</a>
```

## Listas

### ✅ Correto - Lista de projetos
```tsx
<ul 
  className="space-y-4" 
  aria-labelledby="recent-projects-heading"
  role="list"
>
  <h3 id="recent-projects-heading">Projetos Recentes</h3>
  {projects.map((project) => (
    <li key={project.id}>
      <h4>{project.name}</h4>
      <p>{project.description}</p>
    </li>
  ))}
</ul>
```

### ✅ Correto - Lista de tarefas
```tsx
<ul role="list" aria-label="Lista de tarefas">
  {tasks.map((task) => (
    <li 
      key={task.id}
      role="article"
      aria-label={task.ariaLabel}
    >
      <h4>{task.title}</h4>
      <p>{task.description}</p>
    </li>
  ))}
</ul>
```

## Seções e Landmarks

### ✅ Correto - Seção com heading
```tsx
<section aria-labelledby="metrics-heading">
  <h3 id="metrics-heading" className="sr-only">
    Métricas principais
  </h3>
  <div className="grid gap-4">
    {/* conteúdo */}
  </div>
</section>
```

### ✅ Correto - Main content
```tsx
<main 
  id="main-content" 
  role="main" 
  aria-live="polite"
>
  {renderContent()}
</main>
```

### ✅ Correto - Header
```tsx
<header>
  <h2 id="posts-heading">Posts e Conteúdo</h2>
  <p className="text-muted-foreground">
    Gerencie e agende postagens para suas redes sociais
  </p>
</header>
```

## Ícones

### ✅ Correto - Ícone decorativo
```tsx
<Calendar className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
<span className="text-xs">15/08/2025 14:00</span>
```

### ✅ Correto - Ícone com significado
```tsx
<CheckCircle 
  className="h-4 w-4 text-green-600" 
  aria-label="Tarefa concluída"
/>
```

### ✅ Correto - Ícone em badge
```tsx
<Badge aria-label="Status do projeto: Aprovado">
  <CheckCircle className="h-3 w-3 mr-1" aria-hidden="true" />
  Aprovado
</Badge>
```

## Dialogs e Modais

### ✅ Correto - Dialog acessível
```tsx
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    <Button aria-label="Abrir detalhes do post">
      Ver Detalhes
    </Button>
  </DialogTrigger>
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle>Detalhes do Post</DialogTitle>
      <DialogDescription>
        Informações completas sobre este post
      </DialogDescription>
    </DialogHeader>
    {/* conteúdo */}
    <DialogFooter>
      <Button onClick={() => setIsOpen(false)}>
        Fechar
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Dropdown Menus

### ✅ Correto - Dropdown com aria-label
```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button 
      variant="ghost" 
      size="sm"
      aria-label={`Opções para ${item.name}`}
    >
      <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem onClick={handleView}>
      <Eye className="h-4 w-4 mr-2" aria-hidden="true" />
      Ver Detalhes
    </DropdownMenuItem>
    <DropdownMenuItem onClick={handleEdit}>
      <Edit className="h-4 w-4 mr-2" aria-hidden="true" />
      Editar
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Cards

### ✅ Correto - Card de projeto
```tsx
<Card className="transition-all duration-200 hover:shadow-md">
  <CardHeader>
    <CardTitle>{project.name}</CardTitle>
    <CardDescription>{project.description}</CardDescription>
  </CardHeader>
  <CardContent>
    <Progress 
      value={project.progress} 
      aria-label={`Progresso do projeto: ${project.progress}%`}
    />
  </CardContent>
</Card>
```

## Métricas e Valores

### ✅ Correto - Métrica com aria-label
```tsx
<div 
  className="text-2xl font-bold"
  aria-label="12 projetos ativos, aumento de 2 projetos este mês"
>
  12
</div>
<p className="text-xs text-muted-foreground">
  +2 este mês
</p>
```

### ✅ Correto - Data e hora
```tsx
<time 
  className="text-xs text-muted-foreground"
  dateTime="2025-08-15T14:00"
  aria-label="15 de agosto de 2025 às 14 horas"
>
  15/08/2025 14:00
</time>
```

## Progress Bars

### ✅ Correto - Barra de progresso
```tsx
<div className="space-y-1">
  <div className="flex items-center justify-between text-xs">
    <span>Progresso</span>
    <span aria-label="75% concluído">75%</span>
  </div>
  <Progress 
    value={75} 
    aria-label="Progresso do projeto: 75%"
  />
</div>
```

## Badges de Status

### ✅ Correto - Badge com aria-label
```tsx
<Badge 
  variant={statusColor}
  aria-label={`Status: ${status}`}
>
  {statusIcon}
  {status}
</Badge>
```

## Tooltips

### ✅ Correto - Tooltip acessível
```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <Button 
      variant="ghost" 
      size="sm"
      aria-label="Informações sobre este recurso"
    >
      <Info className="h-4 w-4" aria-hidden="true" />
    </Button>
  </TooltipTrigger>
  <TooltipContent>
    <p>Este recurso permite gerenciar posts</p>
  </TooltipContent>
</Tooltip>
```

## Checklist Rápido

Antes de fazer commit, verifique:

- [ ] Todos os botões têm texto ou aria-label
- [ ] Todas as imagens têm alt (ou alt="" se decorativas)
- [ ] Todos os inputs têm label associado
- [ ] Ícones decorativos têm aria-hidden="true"
- [ ] Ícones funcionais têm aria-label
- [ ] Seções têm headings apropriados
- [ ] Listas têm role="list" quando necessário
- [ ] Links têm textos descritivos
- [ ] Dialogs têm título e descrição
- [ ] Navegação tem aria-current para página ativa

## Recursos

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/pt-BR/docs/Web/Accessibility)
- [WebAIM](https://webaim.org/)

---

**Lembre-se**: Acessibilidade não é opcional, é essencial!
