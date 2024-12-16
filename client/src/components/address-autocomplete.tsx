'use client';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import useDebounce from '@/hooks/use-debounce';
import { autocomplete } from '@/lib/google';
import { PlaceAutocompleteResult } from '@googlemaps/google-maps-services-js';
import React, { useEffect, useState } from 'react';
import { ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type AddressAutoCompleteProps = {
  setAddress: (address: string) => any;
};

export default function AddressAutoComplete({
  setAddress,
}: AddressAutoCompleteProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const debouncedInput = useDebounce(input, 500);
  const [predictions, setPredictions] = useState<PlaceAutocompleteResult[]>([]);

  useEffect(() => {
    const fetchPredictions = async () => {
      const googlePredictions = await autocomplete(debouncedInput);
      setPredictions(googlePredictions ?? []);
    };
    fetchPredictions();
  }, [debouncedInput]);

  return (
    <Command>
      <CommandInput
        value={input}
        onValueChange={setInput}
        placeholder='Address...'
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading='Suggestions'>
          {predictions.map((predicition: PlaceAutocompleteResult) => (
            <CommandItem
              key={predicition.place_id}
              onClick={() => setAddress(predicition.description)}
            >
              {predicition.description}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
