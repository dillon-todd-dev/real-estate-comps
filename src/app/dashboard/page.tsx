import { Card, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <div className='space-y-6 pt-6'>
      <h1 className='text-3xl font-bold'>Dashboard</h1>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex justify-between items-center space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Properties
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
