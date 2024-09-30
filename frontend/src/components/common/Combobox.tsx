"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon, SearchIcon } from "lucide-react";

type Option = {
  label: string;
  value: string;
};

interface ComboboxProps {
  options: Option[];
  disabled?: boolean;
  onChange: (value: string) => void;
  formValue?: string;
}

export function Combobox({
  options,
  disabled,
  onChange,
  formValue
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-start gap-2"
          disabled={disabled}
        >
          <SearchIcon className="size-4 shrink-0 opacity-50" />
          {formValue
            ? options.find((option) => option.value === formValue)?.label
            : "Buscar..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <div className="flex items-center px-2">
            <SearchIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              type="text"
              placeholder="Buscar..."
              className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <CommandList>
            <CommandEmpty>Sin resultados.</CommandEmpty>
            <CommandGroup>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      onChange(option.value);
                      setOpen(false);
                      setInputValue("");
                    }}
                    className="cursor-pointer"
                  >
                    {option.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        formValue === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))
              ) : (
                <CommandEmpty>No se encontraron opciones.</CommandEmpty>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
