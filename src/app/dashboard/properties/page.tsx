'use client';

import { AutoCompleteInput } from '@/components/autocomplete-input';
import PropertyItem from '@/components/property-item';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useDebounce from '@/hooks/use-debounce';
import { fetcher } from '@/lib/fetcher';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

type GooglePrediction = {
  placePrediction: {
    placeId: string;
    place: string;
    text: {
      text: string;
    };
  };
};

// This would typically come from a database or API
const initialProperties = [
  {
    id: 1,
    address: '123 Main St, Anytown, USA',
    price: 350000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    type: 'Single Family',
    status: 'For Sale',
  },
  {
    id: 2,
    address: '456 Oak Ave, Somewhere, USA',
    price: 275000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    type: 'Condo',
    status: 'For Sale',
  },
  {
    id: 3,
    address: '789 Pine Rd, Elsewhere, USA',
    price: 425000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2200,
    type: 'Single Family',
    status: 'Under Contract',
  },
  {
    id: 4,
    address: '101 Cedar Ln, Nowhere, USA',
    price: 199000,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 800,
    type: 'Apartment',
    status: 'For Sale',
  },
  {
    id: 5,
    address: '202 Elm St, Anystate, USA',
    price: 550000,
    bedrooms: 5,
    bathrooms: 4,
    sqft: 3000,
    type: 'Single Family',
    status: 'For Sale',
  },
  {
    id: 6,
    address: '303 Maple Dr, Someplace, USA',
    price: 320000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1600,
    type: 'Townhouse',
    status: 'Under Contract',
  },
  {
    id: 7,
    address: '303 Maple Dr, Someplace, USA',
    price: 320000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1600,
    type: 'Townhouse',
    status: 'Under Contract',
  },
  {
    id: 8,
    address: '303 Maple Dr, Someplace, USA',
    price: 320000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1600,
    type: 'Townhouse',
    status: 'Under Contract',
  },
  {
    id: 9,
    address: '303 Maple Dr, Someplace, USA',
    price: 320000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1600,
    type: 'Townhouse',
    status: 'Under Contract',
  },
  {
    id: 10,
    address: '303 Maple Dr, Someplace, USA',
    price: 320000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1600,
    type: 'Townhouse',
    status: 'Under Contract',
  },
  {
    id: 11,
    address: '303 Maple Dr, Someplace, USA',
    price: 320000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1600,
    type: 'Townhouse',
    status: 'Under Contract',
  },
  {
    id: 12,
    address: '303 Maple Dr, Someplace, USA',
    price: 320000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1600,
    type: 'Townhouse',
    status: 'Under Contract',
  },
];

export default function PropertiesPage() {
  const [properties, setProperties] = useState(initialProperties);
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
        `/api/address/places?placeId=${selectedPlaceId}`
      );
      const data = await response.json();
      // setStreet(data.data.street);
      // setCity(data.data.city);
      // setState(data.data.state);
      // setPostalCode(data.data.postalCode);
    };

    fetchPlaceDetails();
  }, [selectedPlaceId]);

  const { data, isLoading } = useSWR(
    `/api/address/autocomplete?input=${debouncedSearchValue}`,
    fetcher
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

  console.log(`placeId: ${selectedPlaceId}`);

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>Properties</h1>
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
            <form>
              <div className='space-y-4 py-4'>
                <div className='space-y-2'>
                  <Label htmlFor='search'>Search Address</Label>
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
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='City'>City</Label>
                  <Input
                    id='City'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='State'>State</Label>
                  <Input
                    id='State'
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='postalCode'>Postal Code</Label>
                  <Input
                    id='postalCode'
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
      </div>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {properties.map((property) => (
          <PropertyItem key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
