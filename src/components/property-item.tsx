import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Properties } from '@/drizzle/schema/properties';
import Image from 'next/image';

export default function PropertyItem({
  property,
}: {
  property: typeof Properties.$inferSelect;
}) {
  return (
    <Card className='overflow-hidden hover:shadow-lg transition duration-300'>
      <div className='relative w-full h-64'>
        <Image
          src='https://lh3.googleusercontent.com/places/ANXAkqFC9YjS5U75TcpRHsz1O7RxBGdxjcC3RrhOkSQQZy7hfkFLNC5Mg0ra5EJXZpWWDliNjgfZeQRRnO3YjixEBIFWfHC1SD9Vgs0=s4800-h1600'
          alt='home'
          fill
          className='object-cover'
        />
      </div>

      <CardContent className='p-4'>
        <h3 className='text-xl font-bold mb-2'>{property.street}</h3>
        <p className='text-md mb-4'>
          {property.city}, {property.state} {property.postalCode}
        </p>
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
