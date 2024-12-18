import DashboardNavbar from '@/components/dashboard-navbar';
import DashboardSidebar from '@/components/dashboard-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className='flex w-full h-screen overflow-hidden'>
        <DashboardSidebar />
        <div className='flex flex-col flex-1 overflow-hidden'>
          <DashboardNavbar />
          <main className='flex-1 overflow-auto px-4 md:px-6'>
            <div className='py-6'>{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
