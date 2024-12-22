'use client';

import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import {
  Building,
  Home,
  LogOut,
  PieChart,
  Settings,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: Building, label: 'Properties', href: '/dashboard/properties' },
  { icon: PieChart, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: Users, label: 'Clients', href: '/dashboard/clients' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className='border-b'>
        <Link href='/dashboard' className='flex items-center gap-2 px-4 py-2'>
          <Building className='h-6 w-6' />
          <span className='font-bold'>TrueQuest</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <Link href={item.href}>
                  <item.icon className='h-4 w-4' />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className='border-t p-6'>
        <Button variant='outline' className='w-full'>
          <LogOut className='mr-1 h-4 w-4' />
          Logout
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
