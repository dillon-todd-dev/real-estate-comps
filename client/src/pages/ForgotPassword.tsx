import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { forgotPasswordSchema } from '../schemas';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { sendPasswordResetEmail } from '../lib/api';
import { useMutation } from '@tanstack/react-query';
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Link as ChakraLink,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: sendPasswordResetEmail,
  });

  const onSubmit = (data: z.infer<typeof forgotPasswordSchema>) => {
    mutate(data);
  };

  return (
    <Flex minH='100vh' align='center' justify='center'>
      <Container mx='auto' maxW='md' py={12} px={6} textAlign='center'>
        <Heading fontSize='4xl' mb={8}>
          Reset your password
        </Heading>
        <Box rounded='lg' bg='gray.700' boxShadow='lg' p={8}>
          {isError && (
            <Box mb={3} color='red.400'>
              {error?.message ||
                'An error occurred while sending the password reset link.'}
            </Box>
          )}
          <Stack spacing={4}>
            {isSuccess ? (
              <Alert status='success' borderRadius={12}>
                <AlertIcon />
                Email sent! Check your inbox for the password reset link.
              </Alert>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={4}>
                  <FormControl id='email' isInvalid={!!formErrors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type='email'
                      placeholder='Enter your email'
                      autoFocus
                      {...register('email')}
                    />
                    <FormErrorMessage>
                      {formErrors.email?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <Button
                    type='submit'
                    isLoading={isPending}
                    disabled={!!formErrors.email}
                  >
                    Send reset link
                  </Button>
                </Stack>
              </form>
            )}
            <Text align='center' fontSize='sm' color='text.muted'>
              <ChakraLink as={Link} to='/login'>
                Back to login
              </ChakraLink>
            </Text>
          </Stack>
        </Box>
      </Container>
    </Flex>
  );
};

export default ForgotPassword;
