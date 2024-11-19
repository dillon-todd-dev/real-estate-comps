import {
  Alert,
  AlertIcon,
  Container,
  Flex,
  VStack,
  Link as ChakraLink,
} from '@chakra-ui/react';
import ResetPasswordForm from '../components/ResetPasswordForm';
import { Link, useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const exp = Number(searchParams.get('exp'));
  const now = Date.now();
  const linkIsValid = code && exp && exp > now;

  return (
    <Flex minH='100vh' justify='center'>
      <Container mx='auto' maxW='md' py={12} px={6} textAlign='center'>
        {linkIsValid ? (
          <ResetPasswordForm code={code} />
        ) : (
          <VStack align='center' spacing={6}>
            <Alert status='error' w='fit-content' borderRadius={12}>
              <AlertIcon />
              The link you've provided is invalid or expired. Please try again.
            </Alert>
            <ChakraLink as={Link} to='/password/forgot' replace>
              Request a new password reset link
            </ChakraLink>
          </VStack>
        )}
      </Container>
    </Flex>
  );
};

export default ResetPassword;
