import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type ComboBoxType = {
  value: string;
  label: string;
};

type ComboBoxProps = {
  values: ComboBoxType[];
  baseMessage: string;
  noValueFound: string;
};

const ComboBox = ({ values, baseMessage, noValueFound }: ComboBoxProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? values.find((val) => val.value === value)?.label
            : baseMessage}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={baseMessage} />
          <CommandList>
            <CommandEmpty>{noValueFound}</CommandEmpty>
            <CommandGroup>
              {values.map((val) => (
                <CommandItem
                  key={val.value}
                  value={val.value}
                  onSelect={(currVal) => {
                    setValue(currVal === value ? '' : currVal);
                    setOpen(false);
                  }}
                >
                  {val.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === val.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboBox;
