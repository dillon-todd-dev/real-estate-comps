import { Alert, AlertIcon, Center, Heading, Text } from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <Center my={16} flexDir='column'>
      <Heading mb={4}>My Account</Heading>
      {!currentUser?.verified && (
        <Alert status='warning' w='fit-content' borderRadius={12} mb={3}>
          <AlertIcon />
          Please verify your email
        </Alert>
      )}
      <Text color='white' mb={2}>
        Name:{' '}
        <Text as='span' color='gray.300'>
          {currentUser?.firstName} {currentUser?.lastName}
        </Text>
      </Text>
      <Text color='white' mb={2}>
        Email:{' '}
        <Text as='span' color='gray.300'>
          {currentUser?.email}
        </Text>
      </Text>
      <Text color='white' mb={2}>
        Created on:{' '}
        <Text as='span' color='gray.300'>
          {new Date().toLocaleString('en-US')}
        </Text>
      </Text>
    </Center>
  );
};

export default Profile;
