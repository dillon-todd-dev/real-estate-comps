'use client';

import { useTheme } from 'next-themes';
import { Moon, Search, Sun } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function DashboardNavbar() {
  const { setTheme, theme } = useTheme();

  return (
    <header className='w-full sticky top-0 z-50 border-b bg-sidebar'>
      <div className='flex h-14 items-center px-4 md:px-6'>
        <SidebarTrigger className='mr-4' />
        <div className='flex flex-1 items-center space-x-4'>
          <form className='flex-1'>
            <div className='relative'>
              <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search'
                className='pl-8 w-full max-w-[400px]'
              />
            </div>
          </form>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            <Sun className='h[1.5rem] w-[1.3rem] dark:hidden' />
            <Moon className='hidden h-5 w-5 dark:block' />
            <span className='sr-only'>Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
