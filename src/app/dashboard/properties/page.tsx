import AddProperty from '@/components/add-property';
import { db } from '@/drizzle/db';
import { Properties } from '@/drizzle/schema/properties';
import PropertyItem from '@/components/property-item';
import { count, desc } from 'drizzle-orm';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { PaginationWithLinks } from '@/components/ui/pagination-with-links';

const PROPERTIES_PER_PAGE = 6;

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: { page: string | undefined };
}) {
  const currentPage = searchParams?.page ? parseInt(searchParams.page) : 1;
  const offset = PROPERTIES_PER_PAGE * (currentPage - 1);

  const fetchNumProperties = db.select({ count: count() }).from(Properties);

  const fetchProperties = db
    .select()
    .from(Properties)
    .orderBy(desc(Properties.createdAt))
    .limit(PROPERTIES_PER_PAGE)
    .offset(offset);

  const [numProperties, properties] = await Promise.all([
    fetchNumProperties,
    fetchProperties,
  ]);

  console.log(numProperties);

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
      <div className='mt-8'>
        <PaginationWithLinks
          totalCount={numProperties[0].count}
          pageSize={PROPERTIES_PER_PAGE}
          page={currentPage}
        />
      </div>
    </div>
  );
}
