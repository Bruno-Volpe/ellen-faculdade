# Diretrizes de Acessibilidade - Marketing Hub

## Recursos Implementados

### 1. Menu de Acessibilidade
- **Localização**: Canto superior direito
- **Ícone**: Grande e facilmente identificável
- **Funcionalidades**:
  - Alto Contraste
  - Modos para Daltônicos
  - Ajuste de Tamanho de Fonte
  - Leitura Funcional (Text-to-Speech)

### 2. VLibras
- Intérprete de Libras oficial do governo brasileiro
- Widget flutuante no canto inferior direito
- Tradução automática de todo conteúdo em texto

### 3. Elementos Semânticos
- Uso adequado de tags HTML5 semânticas
- Estrutura hierárquica de headings (h1, h2, h3, etc.)
- Uso de `role`, `aria-label`, `aria-labelledby` onde apropriado

### 4. Imagens e Ícones
- Todas as imagens decorativas têm `aria-hidden="true"`
- Todas as imagens funcionais têm `alt` text descritivo
- Ícones importantes têm `aria-label` quando necessário

### 5. Navegação por Teclado
- Todos os elementos interativos são acessíveis por teclado
- Indicadores de foco visíveis aprimorados
- Ordem de tabulação lógica

### 6. Contraste de Cores
- Modo de alto contraste disponível
- Cores atendem WCAG 2.1 Level AA no mínimo
- Informações não dependem apenas de cor

### 7. Responsividade
- Layout adaptável para diferentes tamanhos de tela
- Funciona bem com zoom até 200%
- Funcional em dispositivos móveis

## Diretrizes para Desenvolvedores

### Ao adicionar imagens:
```tsx
// Imagem decorativa
<img src="..." alt="" aria-hidden="true" />

// Imagem funcional
<ImageWithFallback src="..." alt="Descrição clara do conteúdo da imagem" />

// Avatar com AvatarImage
<Avatar>
  <AvatarImage src="..." alt="Nome da pessoa ou descrição" />
  <AvatarFallback>Iniciais</AvatarFallback>
</Avatar>
```

### Ao adicionar botões:
```tsx
// Botão com texto visível
<Button>Salvar</Button>

// Botão apenas com ícone
<Button aria-label="Fechar janela">
  <X className="h-4 w-4" aria-hidden="true" />
</Button>
```

### Ao adicionar formulários:
```tsx
<Label htmlFor="email">E-mail</Label>
<Input 
  id="email" 
  type="email"
  aria-required="true"
  aria-describedby="email-error"
/>
<span id="email-error" role="alert">Mensagem de erro</span>
```

### Ao adicionar listas:
```tsx
<ul role="list" aria-label="Lista de projetos">
  {items.map(item => (
    <li key={item.id}>
      {item.name}
    </li>
  ))}
</ul>
```

### Ao adicionar seções:
```tsx
<section aria-labelledby="section-heading">
  <h2 id="section-heading">Título da Seção</h2>
  {/* conteúdo */}
</section>
```

## Testes de Acessibilidade

### Testes Manuais:
1. ✅ Navegação completa apenas com teclado
2. ✅ Leitores de tela (NVDA, JAWS, VoiceOver)
3. ✅ Zoom até 200%
4. ✅ Alto contraste
5. ✅ Modos de daltonismo

### Ferramentas Recomendadas:
- axe DevTools (extensão Chrome/Firefox)
- WAVE (Web Accessibility Evaluation Tool)
- Lighthouse (Chrome DevTools)
- Screen Reader (NVDA para Windows, VoiceOver para Mac)

## Conformidade WCAG 2.1

O sistema está em conformidade com:
- ✅ Nível A - Todos os critérios
- ✅ Nível AA - Maioria dos critérios
- 🔄 Nível AAA - Em progresso

## Recursos Adicionais

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [VLibras](https://www.gov.br/governodigital/pt-br/vlibras)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
