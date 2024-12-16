import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex flex-col justify-center gap-6 text-center h-full max-w-5xl mx-auto'>
      <h1 className='text-5xl font-bold'>Real Estate Evaluations</h1>
      <p>
        <Button asChild>
          <Link href='/dashboard'>Get Started</Link>
        </Button>
      </p>
    </main>
  );
}
