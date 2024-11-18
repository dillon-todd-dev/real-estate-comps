import { useState } from 'react';
import { Button } from '@/components/ui/button';
import LoginForm from '@/components/LoginForm';

const LoginPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900'>
      <div className='absolute top-4 right-4'>
        <Button
          variant='outline'
          onClick={toggleDarkMode}
          className='px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-300'
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </div>
      <div className='max-w-md w-full'>
        <h1 className='text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-200'>
          Sign in to your account
        </h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
