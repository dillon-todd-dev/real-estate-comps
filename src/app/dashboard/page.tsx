import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Building, DollarSign, ClipboardCheck, Clock } from 'lucide-react';
import { db } from '@/drizzle/db';
import { count, desc } from 'drizzle-orm';
import { Properties } from '@/drizzle/schema/properties';

export default async function DashboardPage() {
  const fetchTotalProperties = db.select({ count: count() }).from(Properties);
  const fetchRecentProperties = db
    .select()
    .from(Properties)
    .orderBy(desc(Properties.createdAt))
    .limit(10);

  const [totalProperties, recentProperties] = await Promise.all([
    fetchTotalProperties,
    fetchRecentProperties,
  ]);

  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold'>Dashboard</h1>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Properties
            </CardTitle>
            <Building className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{totalProperties[0].count}</div>
            <p className='text-xs text-muted-foreground'>
              +20% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Average Value</CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>$350,000</div>
            <p className='text-xs text-muted-foreground'>+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Evaluations
            </CardTitle>
            <ClipboardCheck className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>5,678</div>
            <p className='text-xs text-muted-foreground'>
              +15% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center'>
            <Clock className='mr-2 h-5 w-5' />
            Recently Added Properties
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Address</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Date Added</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>{property.street}</TableCell>
                  <TableCell>$100,000</TableCell>
                  <TableCell>
                    {property.createdAt.toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
