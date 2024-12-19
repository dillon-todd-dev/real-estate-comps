'use client';

import { KeyboardEvent, useCallback, useRef, useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { cn } from '@/lib/utils';
import { CommandLoading } from 'cmdk';
import { Skeleton } from './ui/skeleton';
import { Check } from 'lucide-react';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

export type Option = Record<'value' | 'label', string> & Record<string, string>;

type AutoCompleteProps = {
  options: Option[];
  emptyMessage: string;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
};

export default function AutoComplete({
  options,
  emptyMessage,
  onValueChange,
  disabled,
  placeholder,
}: AutoCompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option>(value as Option);
  const [inputValue, setInputValue] = useState<string>('');

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) {
        return;
      }

      // Keep the options displayed when the user is typing
      if (!isOpen) {
        setOpen(true);
      }

      // This is not a default behaviour of the <input /> field
      if (event.key === 'Enter' && input.value !== '') {
        const optionToSelect = options.find(
          (option) => option.label === input.value
        );
        if (optionToSelect) {
          setSelected(optionToSelect);
          onValueChange?.(optionToSelect);
        }
      }

      if (event.key === 'Escape') {
        input.blur();
      }
    },
    [isOpen, options, onValueChange]
  );

  const handleBlur = useCallback(() => {
    setOpen(false);
    setInputValue(selected?.label);
  }, [selected]);

  const handleSelectOption = useCallback(
    (selectedOption: Option) => {
      setInputValue(selectedOption.label);

      setSelected(selectedOption);
      onValueChange?.(selectedOption);

      // This is a hack to prevent the input from being focused after the user selects an option
      // We can call this hack: "The next tick"
      setTimeout(() => {
        inputRef?.current?.blur();
      }, 0);
    },
    [onValueChange]
  );

  const { data, isLoading } = useSWR(
    `/api/address/mock-autocomplete?input=${debouncedInput}`,
    fetcher
  );

  return (
    <Command onKeyDown={handleKeyDown}>
      <div>
        <CommandInput
          ref={inputRef}
          value={inputValue}
          onValueChange={isLoading ? undefined : setInputValue}
          onBlur={handleBlur}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          className='text-base'
        />
      </div>
      <div className='relative mt-1'>
        <div
          className={cn(
            'animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 w-full rounded-xl bg-white outline-none',
            isOpen ? 'block' : 'hidden'
          )}
        >
          <CommandList className='rounded-lg ring-1 ring-slate-200'>
            {isLoading ? (
              <CommandLoading>
                <div className='p-1'>
                  <Skeleton className='h-8 w-full' />
                </div>
              </CommandLoading>
            ) : null}
            {options.length > 0 && !isLoading ? (
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selected?.value === option.value;
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                      onSelect={() => handleSelectOption(option)}
                      className={cn(
                        'flex w-full items-center gap-2',
                        !isSelected ? 'pl-8' : null
                      )}
                    >
                      {isSelected ? <Check className='w-4' /> : null}
                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ) : null}
            {!isLoading ? (
              <CommandEmpty className='select-none rounded-sm px-2 py-3 text-center text-sm'>
                {emptyMessage}
              </CommandEmpty>
            ) : null}
          </CommandList>
        </div>
      </div>
    </Command>
  );
}
