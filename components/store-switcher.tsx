"use client";
import { useParams, useRouter } from "next/navigation";
import { PopoverTrigger, Popover, PopoverContent } from "./ui/popover"
import { useStoreModal } from "@/hooks/use-store-modal";
import { cn } from "@/lib/utils";
import { Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList, 
  CommandSeparator} from "./ui/command";
import { Check, ChevronsUpDown, PlusCircle, StoreIcon } from "lucide-react";
import { Store } from "@prisma/client";
import { Button } from "./ui/button";
import { useState } from "react";

type popoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends popoverTriggerProps {
  items: Store[];
}
export default function StoreSwitcher({
  className,
  items = []
}: StoreSwitcherProps) {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id
  }))

  const currentStore = formattedItems.find((item) => item.value === params.storeId)

  const [open, setOpen] = useState(false);

  const onStoreSelect = (store: { value: string, label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
        variant="outline" 
        size="sm" 
        role="combobox" 
        aria-label="Select a project" 
        className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          {currentStore?.label || "Select a store"}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search project..." />
            <CommandEmpty>No project found.</CommandEmpty>
            <CommandGroup heading="Projects">
              {formattedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className="text-sm"
                >
                  <StoreIcon className={cn("mr-2 h-4 w-4")} />
                  {store.label}
                  <Check className={cn("ml-auto h-4 w-4", 
                    currentStore?.value === store.value ? "opacity-100" : "opacity-0"
                  )} />
                </CommandItem>
              ))}
            </CommandGroup> 
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  storeModal.onOpen();
                }}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Project
              </CommandItem>
          </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
