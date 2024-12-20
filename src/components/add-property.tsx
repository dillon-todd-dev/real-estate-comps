'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { addProperty } from '@/app/actions';
import { Label } from '@/components/ui/label';
import { AutoCompleteInput } from '@/components/autocomplete-input';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/use-debounce';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

type GooglePrediction = {
  placePrediction: {
    placeId: string;
    place: string;
    text: {
      text: string;
    };
  };
};

export default function AddProperty() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedPlaceId, setSelectedPlaceId] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const debouncedSearchValue = useDebounce(searchValue);

  useEffect(() => {
    if (!selectedPlaceId) return;

    const fetchPlaceDetails = async () => {
      const response = await fetch(
        `/api/address/places?placeId=${selectedPlaceId}`,
      );
      const data = await response.json();
      setStreet(data.data.address.street);
      setCity(data.data.address.city);
      setState(data.data.address.state);
      setPostalCode(data.data.address.postalCode);
    };

    fetchPlaceDetails();
  }, [selectedPlaceId]);

  const { data, isLoading } = useSWR(
    `/api/address/autocomplete?input=${debouncedSearchValue}`,
    fetcher,
  );

  let predictions = data?.data;
  if (predictions) {
    predictions = predictions.map((prediction: GooglePrediction) => {
      return {
        value: prediction.placePrediction.placeId,
        label: prediction.placePrediction.text.text,
      };
    });
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>Add New Property</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add New Property</DialogTitle>
          <DialogDescription>
            Search for an address or enter the details manually.
          </DialogDescription>
        </DialogHeader>
        <form action={addProperty} onSubmit={() => setIsDialogOpen(false)}>
          <div className='space-y-4 py-4'>
            <div className='space-y-2'>
              <Label>Search Address</Label>
              <AutoCompleteInput
                selectedValue={selectedPlaceId}
                onSelectedValueChange={setSelectedPlaceId}
                searchValue={searchValue}
                onSearchValueChange={setSearchValue}
                items={predictions ?? []}
                isLoading={isLoading}
                emptyMessage='No address Found'
                placeholder='Search Address'
              />
            </div>
            <article className='grid grid-cols-[1fr_auto_1fr] gap-4 place-items-center'>
              <span className='border-y w-full'></span>
              <h4 className='text-2xl w-fit'>or</h4>
              <span className='border-y w-full'></span>
            </article>
            <div className='space-y-2'>
              <Label htmlFor='street'>Street</Label>
              <Input
                id='street'
                name='street'
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='city'>City</Label>
              <Input
                id='city'
                name='city'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='state'>State</Label>
              <Input
                id='state'
                name='state'
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='postalCode'>Postal Code</Label>
              <Input
                id='postalCode'
                name='postalCode'
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit'>Add Property</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
