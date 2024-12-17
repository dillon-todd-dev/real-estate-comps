import AppNavbar from '@/components/features/app-navbar';
import AppSidebar from '@/components/features/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppNavbar />
        <section className='p-5'>{children}</section>
      </SidebarInset>
    </SidebarProvider>
  );
}
