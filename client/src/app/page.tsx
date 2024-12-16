import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    // <main className='flex flex-col justify-center gap-6 text-center min-h-screen max-w-5xl mx-auto'>
    //   <h1 className='text-5xl font-bold'>Real Estate Evaluations</h1>
    //   <p>
    //     <Button asChild>
    //       <Link href='/dashboard'>Get Started</Link>
    //     </Button>
    //   </p>
    // </main>
    <section>
      <div className='mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center'>
        <div className='mx-auto max-w-5xl text-center'>
          <h1 className='text-3xl font-extrabold sm:text-5xl'>
            Make Profitable Investment Decisions
          </h1>
          <p className='mt-4 sm:text-xl/relaxed'>
            Real Estate Evaluations is an evaluation tool for single-family real
            estate investing
          </p>
          <div className='mt-8 flex flex-wrap justify-center gap-4'>
            <Button asChild>
              <Link href='/dashboard'>Get Started</Link>
            </Button>
            <Button variant='secondary' asChild>
              <Link href='/learn'>Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
