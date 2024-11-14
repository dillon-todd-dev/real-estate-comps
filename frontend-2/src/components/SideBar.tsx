import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { Home, Settings, ChevronUp, LogOut } from 'lucide-react';
import { useAuth } from '@/providers/authProvider';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/services';

const SideBar = () => {
  const [user, setUser] = useState({ firstName: '', lastName: '' });
  const { clearToken, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { firstName, lastName } = await getCurrentUser(token);
      setUser({ firstName, lastName });
    };
    getUser();
  }, []);

  return (
    <Sidebar>
      <SidebarHeader>
        <span className="p-3">COMPS Dashboard</span>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => navigate('/properties', { replace: true })}
            >
              <Home />
              <span>Properties</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <span>
                  {user.firstName} {user.lastName}
                </span>
                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              className="w-[--radix-popper-anchor-width]"
            >
              <DropdownMenuItem
                onClick={() => navigate('/settings/account', { replace: true })}
              >
                <Settings />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => clearToken()}>
                <LogOut />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default SideBar;
