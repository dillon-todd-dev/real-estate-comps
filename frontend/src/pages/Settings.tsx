import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Account from './Account';
import Preferences from './Preferences';

const Settings = () => {
  const navigate = useNavigate();

  return (
    // <div className="flex flex-col w-full min-h-screen">
    //   <section className="flex min-h-[calc(100vh_-_theme(spacing.16))] bg-gray-100/40 flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-gray-800/40">
    //     <div className="max-w-6xl w-full mx-auto grid gap-2">
    //       <h1 className="font-semibold text-3xl">Settings</h1>
    //     </div>
    //     <div className="grid md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr] items-start gap-6 max-w-6xl w-full mx-auto">
    //       <nav className="text-sm text-gray-500 grid gap-4 dark:text-gray-400">
    //         <Button
    //           variant="ghost"
    //           onClick={() => navigate('/settings/account', { replace: true })}
    //         >
    //           Account
    //         </Button>
    //         <Button
    //           variant="ghost"
    //           onClick={() =>
    //             navigate('/settings/preferences', { replace: true })
    //           }
    //         >
    //           Preferences
    //         </Button>
    //       </nav>
    //       <Outlet />
    //     </div>
    //   </section>
    // </div>
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mt-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="preferences">Preferences</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Account />
      </TabsContent>
      <TabsContent value="preferences">
        <Preferences />
      </TabsContent>
    </Tabs>
  );
};

export default Settings;
