import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// This would typically come from a database or API
const properties = [
  {
    id: 1,
    address: '123 Main St, Anytown, USA',
    price: 350000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    type: 'Single Family',
    status: 'For Sale',
    yearBuilt: 2005,
    lotSize: '0.25 acres',
    description:
      'Beautiful single-family home in a quiet neighborhood. Features an open floor plan, updated kitchen, and a spacious backyard perfect for entertaining.',
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
    yearBuilt: 2010,
    lotSize: 'N/A',
    description:
      'Modern condo in the heart of the city. Enjoy stunning views, high-end appliances, and access to building amenities including a gym and rooftop terrace.',
  },
  // ... (other properties)
];

export default function PropertyDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const property = properties.find((p) => p.id === parseInt(params.id));
  if (!property) {
    notFound();
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>{property.address}</h1>
        <Link href='/dashboard/properties'>
          <Button variant='outline'>
            <ArrowLeft className='mr-2 h-4 w-4' /> Back to Properties
          </Button>
        </Link>
      </div>
    </div>
  );
}
