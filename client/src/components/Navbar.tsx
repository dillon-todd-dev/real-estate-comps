import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu as ChakraMenu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { Menu, X, ChevronDown } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import { logout } from '../lib/api';
import { useMutation } from '@tanstack/react-query';
import queryClient from '../config/clientQuery';
import { Link, useNavigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const Links = ['Dashboard', 'Projects', 'Team'];

const NavLink = (props: Props) => {
  const { children } = props;
  return (
    <Box
      as='a'
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}
    >
      {children}
    </Box>
  );
};

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const { mutate: signOut } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.clear();
      navigate('/login', { replace: true });
    },
  });

  return (
    <Box bg='theme.primary' px={4}>
      <Flex
        h={16}
        alignItems={'center'}
        justifyContent={'space-between'}
        mx={2}
      >
        <IconButton
          size={'md'}
          icon={isOpen ? <X /> : <Menu />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Box>Real Estate Evaluations</Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            <ChakraLink
              as={Link}
              to='/properties'
              px={2}
              py={1}
              rounded='md'
              _hover={{ textDecoration: 'none', bg: 'gray.700' }}
            >
              Properties
            </ChakraLink>
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          <ChakraMenu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDown />}
              cursor='pointer'
            >
              {currentUser?.firstName} {currentUser?.lastName}
            </MenuButton>
            <MenuList>
              <MenuItem>Preferences</MenuItem>
              <MenuItem>Account</MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => signOut()}>Logout</MenuItem>
            </MenuList>
          </ChakraMenu>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
