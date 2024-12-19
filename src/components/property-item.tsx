import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bath, Bed, Building, DollarSign, Ruler } from 'lucide-react';

export default function PropertyItem({ property }: any) {
  return (
    <Card key={property.id}>
      <CardHeader>
        <CardTitle>{property.address}</CardTitle>
        <Badge
          variant={property.status === 'For Sale' ? 'default' : 'secondary'}
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
        <Link href={`/dashboard/properties/${property.id}`} className='w-full'>
          <Button variant='outline' className='w-full'>
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
