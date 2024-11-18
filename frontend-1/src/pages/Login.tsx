import {
  Box,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Link as ChakraLink,
  Button,
  Text,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { login } from '../lib/api';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { loginSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';

const Login = () => {
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

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    signIn(data);
  };

  return (
    <Flex minH='100vh' align='center' justify='center'>
      <Container mx='auto' maxW='md' py={12} px={6} textAlign='center'>
        <Heading fontSize='4xl' mb={8}>
          Sign into your account
        </Heading>
        <Box rounded='lg' bg='gray.700' boxShadow='lg' p={8}>
          {isError && (
            <Box mb={3} color='red.400'>
              Invalid email or password
            </Box>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl id='email'>
                <FormLabel>Email</FormLabel>
                <Input type='email' autoFocus {...register('email')} />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl id='password'>
                <FormLabel>Password</FormLabel>
                <Input type='password' {...register('password')} />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>

              <ChakraLink
                as={Link}
                to='/password/forgot'
                fontSize='sm'
                textAlign={{ base: 'center', sm: 'right' }}
              >
                Forgot password?
              </ChakraLink>
              <Button my={2} isLoading={isPending} type='submit'>
                Sign in
              </Button>
              <Text align='center' fontSize='sm' color='text.muted'>
                Don&apos;t have an account?{' '}
                <ChakraLink as={Link} to='/register'>
                  Sign up
                </ChakraLink>
              </Text>
            </Stack>
          </form>
        </Box>
      </Container>
    </Flex>
  );
};

export default Login;
