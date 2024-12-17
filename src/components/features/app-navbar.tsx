import { SidebarTrigger } from '@/components/ui/sidebar';

export default function AppNavbar() {
  return (
    <header className='flex h-16 w-full shrink-0 items-center gap-2 border-b px-4'>
      <SidebarTrigger />
    </header>
  );
}
