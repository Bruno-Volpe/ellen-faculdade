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
- **Diretrizes WCAG**: 1.4.3 (Contraste mínimo), 1.4.1 (Uso da cor), 1.4.4 (Redimensionar texto), 2.5.3 (Label in Name)

### 2. VLibras
- Intérprete de Libras oficial do governo brasileiro
- Widget flutuante no canto inferior direito
- Tradução automática de todo conteúdo em texto
- **Diretrizes WCAG**: 1.2.6 (Linguagem de sinais para mídia pré-gravada)

### 3. Elementos Semânticos
- Uso adequado de tags HTML5 semânticas
- Estrutura hierárquica de headings (h1, h2, h3, etc.)
- Uso de `role`, `aria-label`, `aria-labelledby` onde apropriado
- **Diretrizes WCAG**: 1.3.1 (Informação e relacionamentos), 2.4.6 (Cabeçalhos e rótulos), 4.1.2 (Nome, papel, valor)

### 4. Imagens e Ícones
- Todas as imagens decorativas têm `aria-hidden="true"`
- Todas as imagens funcionais têm `alt` text descritivo
- Ícones importantes têm `aria-label` quando necessário
- **Diretrizes WCAG**: 1.1.1 (Conteúdo não textual), 1.3.3 (Características sensoriais), 1.4.1 (Uso da cor)

### 5. Navegação por Teclado
- Todos os elementos interativos são acessíveis por teclado
- Indicadores de foco visíveis aprimorados
- Ordem de tabulação lógica
- **Diretrizes WCAG**: 2.1.1 (Teclado), 2.4.3 (Ordem de foco), 2.4.7 (Foco visível)

### 6. Contraste de Cores
- Modo de alto contraste disponível
- Cores atendem WCAG 2.1 Level AA no mínimo
- Informações não dependem apenas de cor
- **Diretrizes WCAG**: 1.4.3 (Contraste mínimo), 1.4.11 (Contraste de elementos não textuais)

### 7. Responsividade
- Layout adaptável para diferentes tamanhos de tela
- Funciona bem com zoom até 200%
- Funcional em dispositivos móveis
- **Diretrizes WCAG**: 1.4.10 (Reflow), 1.4.4 (Redimensionar texto)

## Declaração de Usabilidade por Público

Com base nas diretrizes e recomendações adotadas nas aulas, declaramos que os principais perfis de usuários conseguem utilizar a solução nos seguintes níveis:

- **Pessoas cegas (nível AA)**: estrutura semântica adequada, atalhos de pular conteúdo, labels consistentes e suporte completo a leitores de tela (NVDA, JAWS, VoiceOver), complementados pela Leitura Funcional (Web Speech API) que descreve elementos on-hover.
- **Pessoas surdas (nível AA)**: todo o conteúdo textual é traduzível via widget oficial do VLibras e os fluxos críticos possuem instruções textuais claras, eliminando dependência de áudio.
- **Pessoas disléxicas (nível AA)**: possibilidade de ajustar o tamanho das fontes, ativar alto contraste, alternar modos para daltonismo e utilizar a Leitura Funcional como reforço auditivo, reduzindo carga cognitiva.
- **Pessoas com dificuldades motoras (nível AA)**: navegação integral por teclado, foco visível, componentes Radix com áreas clicáveis amplas e ausência de gestos específicos garantem o cumprimento das recomendações de design para esse público.

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

## Fluxos para Avaliação Externa

Colegas responsáveis pelos testes devem seguir os fluxos abaixo para cobrir cenários críticos:

1. **Ativação de recursos de acessibilidade**: abrir o Menu de Acessibilidade, alternar alto contraste, aplicar um modo daltônico, ajustar tamanho da fonte e habilitar/desabilitar a Leitura Funcional, validando persistência das preferências após recarregar a página.
2. **Navegação pelo layout principal**: usar apenas teclado para acessar o link “Pular para o conteúdo principal”, acionar o menu lateral (SidebarTrigger) e alternar entre as seções Dashboard, Campaigns e Calendar, observando foco visível e ordem de tabulação.
3. **Consulta ao conteúdo com suporte a VLibras**: ativar o widget flutuante, solicitar tradução de um card do Dashboard e verificar se o conteúdo textual é interpretado corretamente sem sobreposições visuais.
4. **Interação com formulários e listas**: em Campaigns ou Posts, percorrer cards e botões de ação conferindo labels, descrições e feedback auditivo/visual (quando a Leitura Funcional estiver ativa).

Cada fluxo deve ser avaliado considerando os perfis descritos na seção “Declaração de Usabilidade por Público”, seguindo as recomendações dos slides da disciplina.

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
