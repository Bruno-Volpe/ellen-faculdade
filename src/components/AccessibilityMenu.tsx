import { useState, useEffect, useRef } from "react"
import { 
  Accessibility,
  Eye, 
  Type, 
  Volume2, 
  VolumeX,
  Sun,
  Contrast,
  Minus,
  Plus
} from "lucide-react"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "./ui/dropdown-menu"
import { Slider } from "./ui/slider"
import { Switch } from "./ui/switch"
import { Label } from "./ui/label"

type ColorBlindMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia'

interface AccessibilitySettings {
  highContrast: boolean
  colorBlindMode: ColorBlindMode
  fontSize: number
  textToSpeech: boolean
}

const colorBlindModes = [
  { value: 'none', label: 'Normal' },
  { value: 'protanopia', label: 'Protanopia (Vermelho)' },
  { value: 'deuteranopia', label: 'Deuteranopia (Verde)' },
  { value: 'tritanopia', label: 'Tritanopia (Azul)' },
  { value: 'achromatopsia', label: 'Acromatopsia (P&B)' },
]

export function AccessibilityMenu() {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    colorBlindMode: 'none',
    fontSize: 14,
    textToSpeech: false,
  })
  
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)
  const isReadingActiveRef = useRef(false)

  // Carregar preferências salvas
  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibility-settings')
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings)
      setSettings(parsed)
      applySettings(parsed)
      
      // Se a leitura estava ativada, iniciar
      if (parsed.textToSpeech && 'speechSynthesis' in window) {
        setSpeechSupported(true)
        // Aguardar um pouco para garantir que o DOM está pronto
        setTimeout(() => {
          startReading()
        }, 500)
      }
    }

    // Verificar suporte a Web Speech API
    if ('speechSynthesis' in window) {
      setSpeechSupported(true)
    }
  }, [])

  // Salvar preferências
  const saveSettings = (newSettings: AccessibilitySettings) => {
    localStorage.setItem('accessibility-settings', JSON.stringify(newSettings))
    setSettings(newSettings)
    applySettings(newSettings)
  }

  // Aplicar configurações de acessibilidade
  const applySettings = (newSettings: AccessibilitySettings) => {
    const root = document.documentElement

    // Alto contraste
    if (newSettings.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }

    // Modo daltônico
    root.setAttribute('data-colorblind-mode', newSettings.colorBlindMode)

    // Tamanho da fonte
    root.style.setProperty('--font-size', `${newSettings.fontSize}px`)
  }

  const toggleHighContrast = () => {
    const newSettings = { ...settings, highContrast: !settings.highContrast }
    saveSettings(newSettings)
  }

  const setColorBlindMode = (mode: ColorBlindMode) => {
    const newSettings = { ...settings, colorBlindMode: mode }
    saveSettings(newSettings)
  }

  const setFontSize = (size: number) => {
    const newSettings = { ...settings, fontSize: size }
    saveSettings(newSettings)
  }

  const increaseFontSize = () => {
    const newSize = Math.min(settings.fontSize + 2, 24)
    setFontSize(newSize)
  }

  const decreaseFontSize = () => {
    const newSize = Math.max(settings.fontSize - 2, 10)
    setFontSize(newSize)
  }

  const resetFontSize = () => {
    setFontSize(14)
  }

  const toggleTextToSpeech = () => {
    const newValue = !settings.textToSpeech
    const newSettings = { ...settings, textToSpeech: newValue }
    saveSettings(newSettings)
  }

  const startReading = () => {
    if (!speechSupported) {
      alert('Seu navegador não suporta leitura de texto.')
      return
    }

    console.log('Iniciando leitura...')
    stopReading() // Para qualquer leitura anterior

    // Ativar a ref
    isReadingActiveRef.current = true
    setIsSpeaking(true)
    
    // Ler o título da página
    const titleElement = document.querySelector('h1, h2')
    if (titleElement) {
      console.log('Lendo título:', titleElement.textContent)
      speakText(titleElement.textContent || '')
    }

    // Configurar leitura ao passar o mouse (hover)
    document.addEventListener('mouseover', handleMouseOver)
    console.log('Event listener adicionado')
  }

  const stopReading = () => {
    console.log('Parando leitura...')
    
    // Desativar a ref
    isReadingActiveRef.current = false
    
    if (speechSupported) {
      window.speechSynthesis.cancel()
    }
    setIsSpeaking(false)
    document.removeEventListener('mouseover', handleMouseOver)
  }

  const handleMouseOver = (event: MouseEvent) => {
    // Verificar se a leitura está ativa usando ref
    if (!isReadingActiveRef.current) {
      return
    }
    
    const target = event.target as HTMLElement
    
    // Elementos que devem ser lidos
    const readableElements = ['BUTTON', 'A', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'LABEL', 'SPAN', 'LI', 'TD', 'TH', 'DIV']
    
    // Ler aria-label se disponível (prioridade)
    const ariaLabel = target.getAttribute('aria-label')
    if (ariaLabel && ariaLabel.trim().length > 0) {
      speakText(ariaLabel)
      return
    }

    // Ler title se disponível
    const title = target.getAttribute('title')
    if (title && title.trim().length > 0) {
      speakText(title)
      return
    }
    
    if (readableElements.includes(target.tagName)) {
      const text = target.textContent?.trim()
      if (text && text.length > 0 && text.length < 300) {
        // Evitar ler textos muito longos ou vazios
        speakText(text)
      }
    }
  }

  const speakText = (text: string) => {
    if (!speechSupported || !isReadingActiveRef.current) return

    // Cancelar leitura anterior
    window.speechSynthesis.cancel()

    // Limpar o texto
    const cleanText = text.replace(/\s+/g, ' ').trim()
    if (!cleanText || cleanText.length === 0) return

    console.log('Falando:', cleanText.substring(0, 50))

    const utterance = new SpeechSynthesisUtterance(cleanText)
    utterance.lang = 'pt-BR'
    utterance.rate = 0.9
    utterance.pitch = 1.0
    utterance.volume = 1.0
    
    // Adicionar pequeno delay para evitar múltiplas leituras
    setTimeout(() => {
      window.speechSynthesis.speak(utterance)
    }, 50)
  }

  // Monitorar mudanças no textToSpeech
  useEffect(() => {
    console.log('useEffect triggered - textToSpeech:', settings.textToSpeech, 'isSpeaking:', isSpeaking, 'speechSupported:', speechSupported)
    
    if (settings.textToSpeech && speechSupported && !isSpeaking) {
      console.log('Condição para iniciar leitura atendida')
      startReading()
    } else if (!settings.textToSpeech && isSpeaking) {
      console.log('Condição para parar leitura atendida')
      stopReading()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.textToSpeech])

  // Cleanup effect
  useEffect(() => {
    return () => {
      stopReading()
    }
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="default"
          className="flex items-center gap-2 h-10 px-4 hover:scale-105 transition-transform duration-200 focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Menu de acessibilidade - Abrir opções de acessibilidade"
          title="Opções de Acessibilidade"
        >
          <Accessibility className="h-5 w-5" aria-hidden="true" />
          <span className="font-medium">Menu de Acessibilidade</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel>Acessibilidade</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Alto Contraste */}
        <DropdownMenuGroup>
          <div className="flex items-center justify-between px-2 py-3">
            <div className="flex items-center gap-2">
              <Contrast className="h-4 w-4" />
              <Label htmlFor="high-contrast" className="cursor-pointer">
                Alto Contraste
              </Label>
            </div>
            <Switch
              id="high-contrast"
              checked={settings.highContrast}
              onCheckedChange={toggleHighContrast}
              aria-label="Ativar ou desativar alto contraste"
            />
          </div>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Modo Daltônico */}
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Eye className="mr-2 h-4 w-4" />
              <span>Modo Daltônico</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              {colorBlindModes.map((mode) => (
                <DropdownMenuItem
                  key={mode.value}
                  onClick={() => setColorBlindMode(mode.value as ColorBlindMode)}
                  className={settings.colorBlindMode === mode.value ? 'bg-accent' : ''}
                >
                  {mode.label}
                  {settings.colorBlindMode === mode.value && (
                    <span className="ml-auto">✓</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Tamanho da Fonte */}
        <DropdownMenuGroup>
          <div className="px-2 py-3 space-y-3">
            <div className="flex items-center gap-2">
              <Type className="h-4 w-4" />
              <Label>Tamanho da Fonte</Label>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={decreaseFontSize}
                aria-label="Diminuir tamanho da fonte"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <div className="flex-1 text-center">
                <span className="text-sm">{settings.fontSize}px</span>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={increaseFontSize}
                aria-label="Aumentar tamanho da fonte"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <Slider
              value={[settings.fontSize]}
              onValueChange={(values) => setFontSize(values[0])}
              min={10}
              max={24}
              step={1}
              className="w-full"
              aria-label="Ajustar tamanho da fonte"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={resetFontSize}
              className="w-full"
            >
              Resetar
            </Button>
          </div>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Leitura de Tela */}
        <DropdownMenuGroup>
          <div className="flex items-center justify-between px-2 py-3">
            <div className="flex items-center gap-2">
              {isSpeaking ? (
                <Volume2 className="h-4 w-4" />
              ) : (
                <VolumeX className="h-4 w-4" />
              )}
              <Label htmlFor="text-to-speech" className="cursor-pointer">
                Leitura Funcional
              </Label>
            </div>
            <Switch
              id="text-to-speech"
              checked={settings.textToSpeech}
              onCheckedChange={toggleTextToSpeech}
              disabled={!speechSupported}
              aria-label="Ativar ou desativar leitura funcional"
            />
          </div>
          {settings.textToSpeech && (
            <div className="px-2 pb-2">
              <p className="text-xs text-muted-foreground">
                Passe o mouse sobre os elementos para ouvi-los
              </p>
            </div>
          )}
          {!speechSupported && (
            <div className="px-2 pb-2">
              <p className="text-xs text-destructive">
                Navegador não suporta leitura de texto
              </p>
            </div>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}