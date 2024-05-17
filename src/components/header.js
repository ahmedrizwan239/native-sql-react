// Chakra imports
import {
  Box,
  Flex,
  IconButton,
  useDisclosure,
  useColorMode,
  useColorModeValue,
  Link,
  Heading,
} from '@chakra-ui/react';

// Assets import
import { FaMoon, FaSun } from 'react-icons/fa';
// import { HamburgerIcon, CloseIcon, SunIcon } from '@chakra-ui/icons';

export default function Header() {
  
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex as='nav' borderBottom={1} borderStyle={"solid"} shadow="sm" borderColor={useColorModeValue("gray.100", "gray.900")} bg={useColorModeValue("gray.50", "gray.900")} color={useColorModeValue("gray.600", "white")} >

        <Flex py={4} w={'80%'} mx={'auto'} alignItems={'center'} justifyContent={'space-between'}>
            
          {/* Logo   */}
          <Box>
              <Heading size={'lg'}>NativeSQL</Heading>
          </Box>

          {/* Dark Mode and Drawer */}
          <Flex>
            <IconButton
            size={'lg'}
            icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
            aria-label={'Dark Mode'}
            bg="none"
            onClick={toggleColorMode} 
            />
            {/* <IconButton
              size={'lg'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              bg="none"
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            /> */}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}