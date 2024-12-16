import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { CirclePlus } from 'lucide-react';

export default function Dashboard() {
  const cards = [
    {
      id: 1,
      title: 'Card 1',
      description: 'This is the description for card 1.',
    },
    {
      id: 2,
      title: 'Card 2',
      description: 'This is the description for card 2.',
    },
    {
      id: 3,
      title: 'Card 3',
      description: 'This is the description for card 3.',
    },
    {
      id: 4,
      title: 'Card 4',
      description: 'This is the description for card 4.',
    },
    {
      id: 5,
      title: 'Card 5',
      description: 'This is the description for card 5.',
    },
    {
      id: 6,
      title: 'Card 6',
      description: 'This is the description for card 6.',
    },
    {
      id: 7,
      title: 'Card 7',
      description: 'This is the description for card 7.',
    },
    {
      id: 8,
      title: 'Card 8',
      description: 'This is the description for card 8.',
    },
    {
      id: 9,
      title: 'Card 9',
      description: 'This is the description for card 9.',
    },
  ];
  return (
    <main className='flex flex-col justify-center gap-6 min-h-screen max-w-5xl mx-auto'>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-bold ml-4'>Properties</h1>
        <p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='ghost' className='inline-flex gap-2 mr-4'>
                <CirclePlus className='h-4 w-4' />
                Add Property
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Add Property</DialogTitle>
              </DialogHeader>
              <div className='flex flex-col gap-3 mt-3'>
                <div>
                  <Input placeholder='Street Address' />
                </div>
                <div className='relative flex py-5 items-center'>
                  <div className='flex-grow border-t border-gray-400'></div>
                  <span className='flex-shrink mx-4 text-gray-400'>Or</span>
                  <div className='flex-grow border-t border-gray-400'></div>
                </div>
                <div className='flex flex-col gap-1'>
                  <Input placeholder='Street Address' />
                </div>
                <div className='flex flex-col gap-1'>
                  <Input placeholder='City' />
                </div>
                <div className='flex flex-col gap-1'>
                  <Input placeholder='State' />
                </div>
                <div className='flex flex-col gap-1'>
                  <Input placeholder='Postal Code' />
                </div>
                <Button>Add Property</Button>
              </div>
            </DialogContent>
          </Dialog>
        </p>
      </div>
      <div className='grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3'>
        {cards.map((card) => (
          <Card
            key={card.id}
            className='rounded-lg shadow-md transition-all hover:scale-105 focus-within:scale-105'
          >
            <CardHeader className='font-bold text-lg'>{card.title}</CardHeader>
            <CardContent>{card.description}</CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
