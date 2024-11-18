import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Link as ChakraLink,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { registerSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { createAccount } from '../lib/api';

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createAccount,
    onSuccess: () => navigate('/', { replace: true }),
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    mutate(data);
  };

  return (
    <Flex minH='100vh' align='center' justify='center'>
      <Container mx='auto' maxW='md' py={12} px={6} textAlign='center'>
        <Heading fontSize='4xl' mb={8}>
          Create a new account
        </Heading>
        <Box rounded='lg' bg='gray.700' boxShadow='lg' p={8}>
          {isError && (
            <Box mb={3} color='red.400'>
              {error?.message ||
                'An error occurred while creating the account. Please try again.'}
            </Box>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl id='firstName' isInvalid={!!formErrors.firstName}>
                <FormLabel>First Name</FormLabel>
                <Input
                  autoFocus
                  placeholder='John'
                  {...register('firstName')}
                />
                <FormErrorMessage>
                  {formErrors.firstName?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl id='lastName' isInvalid={!!formErrors.lastName}>
                <FormLabel>Last Name</FormLabel>
                <Input placeholder='Doe' {...register('lastName')} />
                <FormErrorMessage>
                  {formErrors.lastName?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl id='email' isInvalid={!!formErrors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  type='email'
                  placeholder='JohnDoe@example.com'
                  {...register('email')}
                />
                <FormErrorMessage>{formErrors.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl id='password' isInvalid={!!formErrors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  type='password'
                  placeholder='******'
                  {...register('password')}
                />
                <FormErrorMessage>
                  {formErrors.password?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                id='confirmPassword'
                isInvalid={!!formErrors.confirmPassword}
              >
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type='password'
                  placeholder='******'
                  {...register('confirmPassword')}
                />
                <FormErrorMessage>
                  {formErrors.confirmPassword?.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                type='submit'
                my={2}
                isLoading={isPending}
                isDisabled={
                  !!formErrors.firstName ||
                  !!formErrors.lastName ||
                  !!formErrors.email ||
                  !!formErrors.password ||
                  !!formErrors.confirmPassword
                }
              >
                Register
              </Button>
              <Text align='center' fontSize='sm' color='text.muted'>
                Already have an account?{' '}
                <ChakraLink as={Link} to='/login'>
                  Login
                </ChakraLink>
              </Text>
            </Stack>
          </form>
        </Box>
      </Container>
    </Flex>
  );
};

export default Register;
