import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/drizzle/db';
import { Properties } from '@/drizzle/schema/properties';
import { eq } from 'drizzle-orm';

export default async function PropertyDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const result = await db
    .select()
    .from(Properties)
    .where(eq(Properties.id, params.id));

  if (result.length === 0) {
    notFound();
  }

  const property = result[0];

  console.log(result);
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col text-3xl font-bold'>
          <div>{property.street}</div>
          <div>
            {property.city}, {property.state}
          </div>
          <div>{property.postalCode}</div>
        </div>
        <Link href='/dashboard/properties'>
          <Button variant='outline'>
            <ArrowLeft className='mr-2 h-4 w-4' /> Back to Properties
          </Button>
        </Link>
      </div>
    </div>
  );
}
