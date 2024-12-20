import AddProperty from '@/components/add-property';
import { db } from '@/drizzle/db';
import { Properties } from '@/drizzle/schema/properties';
import PropertyItem from '@/components/property-item';

export default async function PropertiesPage() {
  const properties = await db.select().from(Properties);

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>Properties</h1>
        <AddProperty />
      </div>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {properties.map((property: typeof Properties.$inferSelect) => (
          <PropertyItem key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
