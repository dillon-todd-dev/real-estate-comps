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
import axios from 'axios';

const SideBar = () => {
  const [user, setUser] = useState({ firstName: '', lastName: '' });
  const { clearToken, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/api/users/currentUser', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      if (res.status === 200) {
        setUser({ firstName: res.data.firstName, lastName: res.data.lastName });
      }
    }).catch((err) => {
      console.log(err);
    })
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
                <span>{user.firstName} {user.lastName}</span>
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
