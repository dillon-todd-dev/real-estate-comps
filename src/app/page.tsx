import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Building, Search, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen'>
      {/* Header */}
      <header className='flex items-center h-14 px-4 sticky top-0 z-50 lg:px-6'>
        <Link className='flex items-center justify-center gap-2' href='#'>
          <Building className='h-6 w-6' />
          <span className='font-bold'>TrueQuest</span>
        </Link>
        <nav className='flex items-center gap-4 ml-auto sm:gap-6'>
          <Link
            className='text-sm font-medium underline-offset-4 hover:underline'
            href='#features'
          >
            Features
          </Link>
          <Link
            className='text-sm font-medium underline-offset-4 hover:underline'
            href='#how-it-works'
          >
            How It Works
          </Link>
          <Link
            className='text-sm font-medium underline-offset-4 hover:underline'
            href='#Pricing'
          >
            Pricing
          </Link>
          <Button>Get Started</Button>
        </nav>
      </header>

      <main className='flex-1'>
        {/* Hero Section */}
        <section className='flex justify-center w-full py-12 md:py-24 lg:py-32 xl:py-48'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'>
                  Discover True Property Value with TrueQuest
                </h1>
                <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400'>
                  Accurate real estate evaluations powered by advanced AI. Make
                  informed decisions with confidence.
                </p>
              </div>
              <div className='space-x-4'>
                <Button size='lg'>Get Started</Button>
                <Button variant='outline' size='lg'>
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section
          id='features'
          className='flex justify-center w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800'
        >
          <div className='container px-4 md:px-6'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12'>
              Key Features
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              <Card>
                <CardHeader>
                  <BarChart className='h-8 w-8 mb-2' />
                  <CardTitle>Accurate Valuations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Get precise property valuations using our advanced AI
                    algorithms and extensive data analysis.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Search className='h-8 w-8 mb-2' />
                  <CardTitle>Comprehensive Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Access detailed reports with market trends, comparable
                    properties, and future value projections.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Zap className='h-8 w-8 mb-2' />
                  <CardTitle>Real-Time Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Stay informed with real-time market data and instant
                    property value updates.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id='how-it-works'
          className='flex justify-center w-full py-12 md:py-24 lg:py-32'
        >
          <div className='container px-4 md:px-6'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12'>
              How It Works
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <div className='flex flex-col items-center text-center'>
                <div className='rounded-full bg-primary text-primary-foreground p-3 mb-4'>
                  1
                </div>
                <h3 className='text-xl font-bold mb-2'>
                  Enter Property Details
                </h3>
                <p>
                  Provide basic information about the property you want to
                  evaluate.
                </p>
              </div>
              <div className='flex flex-col items-center text-center'>
                <div className='rounded-full bg-primary text-primary-foreground p-3 mb-4'>
                  2
                </div>
                <h3 className='text-xl font-bold mb-2'>AI Analysis</h3>
                <p>
                  Our advanced AI analyzes the data and compares it with market
                  trends.
                </p>
              </div>
              <div className='flex flex-col items-center text-center'>
                <div className='rounded-full bg-primary text-primary-foreground p-3 mb-4'>
                  3
                </div>
                <h3 className='text-xl font-bold mb-2'>Get Your Valuation</h3>
                <p>
                  Receive a comprehensive report with an accurate property
                  valuation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className='flex justify-center w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
                  Ready to Discover True Property Value?
                </h2>
                <p className='mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl'>
                  Join TrueQuest today and make informed real estate decisions
                  with confidence.
                </p>
              </div>
              <Button size='lg' variant='secondary'>
                Get Started Now
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className='flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t'>
        <p className='text-xs text-gray-500 dark:text-gray-400'>
          © 2024 TrueQuest. All rights reserved.
        </p>
        <nav className='sm:ml-auto flex gap-4 sm:gap-6'>
          <a className='text-xs hover:underline underline-offset-4' href='#'>
            Terms of Service
          </a>
          <a className='text-xs hover:underline underline-offset-4' href='#'>
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  );
}
