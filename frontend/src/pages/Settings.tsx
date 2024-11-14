import { Link, Outlet } from 'react-router-dom';

const Settings = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <section className="flex min-h-[calc(100vh_-_theme(spacing.16))] bg-gray-100/40 flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-gray-800/40">
        <div className="max-w-6xl w-full mx-auto grid gap-2">
          <h1 className="font-semibold text-3xl">Settings</h1>
        </div>
        <div className="grid md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr] items-start gap-6 max-w-6xl w-full mx-auto">
          <nav className="text-sm text-gray-500 grid gap-4 dark:text-gray-400">
            <Link to="/settings/account">Account</Link>
            <Link to="/settings/preferences">Preferences</Link>
          </nav>
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default Settings;
