import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover"

const clients = [
  {
    id: 1,
    name: "BeachWear Co.",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=BeachWear",
    initials: "BW"
  },
  {
    id: 2,
    name: "TechStart",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=TechStart",
    initials: "TS"
  },
  {
    id: 3,
    name: "RestaurantePlus",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=RestaurantePlus",
    initials: "RP"
  },
  {
    id: 4,
    name: "FitLife Academia",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=FitLife",
    initials: "FL"
  },
  {
    id: 5,
    name: "EcoStore",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=EcoStore",
    initials: "ES"
  },
]

export function ClientSelector() {
  const [open, setOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState(clients[0])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label={`Cliente selecionado: ${selectedClient.name}. Clique para alterar.`}
          className="w-full justify-between"
        >
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage 
                src={selectedClient.image} 
                alt={`Logo do cliente ${selectedClient.name}`} 
              />
              <AvatarFallback>{selectedClient.initials}</AvatarFallback>
            </Avatar>
            <span>{selectedClient.name}</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder="Buscar cliente..." aria-label="Buscar cliente" />
          <CommandList>
            <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>
            <CommandGroup heading="Clientes" aria-label="Lista de clientes">
              {clients.map((client) => (
                <CommandItem
                  key={client.id}
                  value={client.name}
                  onSelect={() => {
                    setSelectedClient(client)
                    setOpen(false)
                  }}
                >
                  <div className="flex items-center gap-2 flex-1">
                    <Avatar className="h-6 w-6">
                      <AvatarImage 
                        src={client.image} 
                        alt={`Logo do cliente ${client.name}`} 
                      />
                      <AvatarFallback>{client.initials}</AvatarFallback>
                    </Avatar>
                    <span>{client.name}</span>
                  </div>
                  <Check
                    className={`ml-auto h-4 w-4 ${
                      selectedClient.id === client.id ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden="true"
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}