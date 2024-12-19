'use client';

import PropertyItem from '@/components/property-item';
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

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>Properties</h1>
        <p>Add New Property</p>
      </div>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {properties.map((property) => (
          <PropertyItem key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
