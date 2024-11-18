import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { forgotPasswordSchema } from '../schemas';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { forgotPassword } from '../lib/api';
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
} from '@chakra-ui/react';

const ForgotPassword = () => {
  const navigate = useNavigate();

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

  const { mutate, isPending, isError } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => navigate('/password/reset', { replace: true }),
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
          <Stack spacing={4}>
            <FormControl id='email' isInvalid={!!formErrors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                type='email'
                placeholder='Enter your email'
                autoFocus
                {...register('email')}
              />
              <FormErrorMessage>{formErrors.email?.message}</FormErrorMessage>
            </FormControl>
            <Button
              type='submit'
              isLoading={isPending}
              disabled={!!formErrors.email}
            >
              Send reset link
            </Button>
          </Stack>
        </Box>
      </Container>
    </Flex>
  );
};

export default ForgotPassword;
