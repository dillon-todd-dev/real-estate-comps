'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { Bath, Bed, Building, DollarSign, Ruler } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

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
];

export default function PropertiesPage() {
  const [properties, setProperties] = useState(initialProperties);
  const [newAddress, setNewAddress] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAddress) {
      const newProperty = {
        id: properties.length + 1,
        address: newAddress,
        price: 0,
        bedrooms: 0,
        bathrooms: 0,
        sqft: 0,
        type: 'Unknown',
        status: 'For Sale',
      };
      setProperties([...properties, newProperty]);
      setNewAddress('');
      setIsDialogOpen(false);
    }
  };

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
                Enter the address of the new property here. You can fill in
                additional details later.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddProperty}>
              <div className='grid gap-4 py-4'>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='address' className='text-right'>
                    Address
                  </Label>
                  <Input
                    id='address'
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    className='col-span-3'
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
          <Card key={property.id}>
            <CardHeader>
              <CardTitle>{property.address}</CardTitle>
              <Badge
                variant={
                  property.status === 'For Sale' ? 'default' : 'secondary'
                }
              >
                {property.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-2 gap-4'>
                <div className='flex items-center'>
                  <DollarSign className='h-4 w-4 mr-2 text-muted-foreground' />
                  <span className='font-semibold'>
                    ${property.price.toLocaleString()}
                  </span>
                </div>
                <div className='flex items-center'>
                  <Building className='h-4 w-4 mr-2 text-muted-foreground' />
                  <span>{property.type}</span>
                </div>
                <div className='flex items-center'>
                  <Bed className='h-4 w-4 mr-2 text-muted-foreground' />
                  <span>{property.bedrooms} Beds</span>
                </div>
                <div className='flex items-center'>
                  <Bath className='h-4 w-4 mr-2 text-muted-foreground' />
                  <span>{property.bathrooms} Baths</span>
                </div>
                <div className='flex items-center col-span-2'>
                  <Ruler className='h-4 w-4 mr-2 text-muted-foreground' />
                  <span>{property.sqft.toLocaleString()} sqft</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link
                href={`/dashboard/properties/${property.id}`}
                className='w-full'
              >
                <Button variant='outline' className='w-full'>
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
