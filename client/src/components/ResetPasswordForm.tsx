import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { resetPasswordSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '../lib/api';

type ResetPasswordProps = {
  code: string;
};

const ResetPasswordForm = ({ code }: ResetPasswordProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: resetPassword,
  });

  const onSubmit = (data: z.infer<typeof resetPasswordSchema>) => {
    mutate({ ...data, verificationCode: code });
  };

  return (
    <>
      <Heading fontSize='4xl' mb={8}>
        Change your password
      </Heading>
      <Box rounded='lg' bg='gray.700' boxShadow='lg' p={8}>
        {isError && (
          <Box mb={3} color='red.400'>
            {error.message || 'An error occurred while updating the password.'}
          </Box>
        )}
        {isSuccess ? (
          <Box mb={3} color='green.400'>
            <Alert status='success' borderRadius={12} mb={3}>
              <AlertIcon />
              Password updated successfully!
            </Alert>
            <ChakraLink as={Link} to='/login' replace>
              Log in now
            </ChakraLink>
          </Box>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
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
                variant='primary'
                isLoading={isPending}
                isDisabled={
                  !!formErrors.password || !!formErrors.confirmPassword
                }
              >
                Send reset link
              </Button>
            </Stack>
          </form>
        )}
      </Box>
    </>
  );
};

export default ResetPasswordForm;
