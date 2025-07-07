'use client';

import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface FilterDropdownProps {
  title: string;
  options: string[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  multiSelect?: boolean;
}

export function FilterDropdown({ 
  title, 
  options, 
  selectedValues, 
  onSelectionChange, 
  multiSelect = false 
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    if (multiSelect) {
      const newValues = selectedValues.includes(value)
        ? selectedValues.filter(v => v !== value)
        : [...selectedValues, value];
      onSelectionChange(newValues);
    } else {
      onSelectionChange(selectedValues.includes(value) ? [] : [value]);
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between min-w-[200px] bg-white/60 backdrop-blur-sm border-white/30 hover:bg-white/80 transition-all duration-200"
        >
          <div className="flex items-center gap-2">
            <span className="truncate">
              {selectedValues.length === 0
                ? title
                : multiSelect
                ? `${title} (${selectedValues.length})`
                : selectedValues[0]}
            </span>
            {selectedValues.length > 0 && multiSelect && (
              <Badge variant="secondary" className="ml-1">
                {selectedValues.length}
              </Badge>
            )}
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={`Search ${title.toLowerCase()}...`} />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={() => handleSelect(option)}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedValues.includes(option) ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}