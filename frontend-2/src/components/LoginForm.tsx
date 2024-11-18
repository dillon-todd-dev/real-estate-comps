import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { loginSchema } from '@/schemas';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/lib/api';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    mutate: signIn,
    isPending,
    isError,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => navigate('/', { replace: true }),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    signIn(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md'
    >
      <div>
        <Label
          htmlFor='email'
          className='block text-sm font-medium dark:text-gray-300'
        >
          Email
        </Label>
        <Input
          id='email'
          type='email'
          {...register('email')}
          placeholder='Enter your email'
          className='mt-1 dark:bg-gray-700 dark:text-gray-300'
        />
        {errors.email && (
          <p className='text-sm text-red-600 mt-1'>{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label
          htmlFor='password'
          className='block text-sm font-medium dark:text-gray-300'
        >
          Password
        </Label>
        <Input
          id='password'
          type='password'
          {...register('password')}
          placeholder='Enter your password'
          className='mt-1 dark:bg-gray-700 dark:text-gray-300'
        />
        {errors.password && (
          <p className='text-sm text-red-600 mt-1'>{errors.password.message}</p>
        )}
      </div>

      <Button
        type='submit'
        disabled={isPending}
        className='w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600'
      >
        {isPending ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
};

export default LoginForm;
