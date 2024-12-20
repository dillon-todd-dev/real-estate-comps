import Link from 'next/link';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Properties } from '@/drizzle/schema/properties';

export default function PropertyItem({
  property,
}: {
  property: typeof Properties.$inferSelect;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{property.street}</CardTitle>
      </CardHeader>
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
