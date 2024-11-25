import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/lib/api';
import { Link } from 'react-router-dom';

// Improved schema with additional validation rules
const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .regex(/[a-zA-Z0-9]/, { message: 'Password must be alphanumeric' }),
});

const LoginTest = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
    onSuccess: () => toast('login successful'),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    signIn(values);
  };

  return (
    <div className='flex flex-col h-screen w-full items-center justify-center px-4'>
      <Card className='mx-auto min-w-md'>
        <CardHeader>
          <CardTitle className='text-2xl text-center'>
            Sign into your account
          </CardTitle>
          <CardDescription>
            Enter your email and password to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <div className='grid gap-4'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem className='grid gap-2'>
                      <FormLabel htmlFor='email'>Email</FormLabel>
                      <FormControl>
                        <Input
                          id='email'
                          placeholder='johndoe@mail.com'
                          type='email'
                          autoComplete='email'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem className='grid gap-2'>
                      <FormLabel htmlFor='password'>Password</FormLabel>
                      <FormControl>
                        <Input
                          id='password'
                          type='password'
                          placeholder='******'
                          autoComplete='current-password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Link
                  to='/password/forgot'
                  className='ml-auto inline-block text-sm underline'
                >
                  Forgot your password?
                </Link>
                <Button type='submit' className='w-full'>
                  Login
                </Button>
              </div>
            </form>
          </Form>
          <div className='mt-4 text-center text-sm'>
            Don&apos;t have an account?{' '}
            <Link to='signup' className='underline'>
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginTest;
