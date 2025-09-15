import { useColorModeValue } from '@chakra-ui/color-mode';
import {
    Box,
    Flex,
    HStack,
    IconButton,
    Stack,
    useDisclosure,
} from '@chakra-ui/react';
import {FaWindowClose} from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import Nav from './ui/Nav';



const Navbar = () => {
const { open, onOpen, onClose } = useDisclosure();
return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <IconButton
                    size="md"
                    aria-label="Open Menu"
                    display={{ md: "none" }}
                    onClick={open ? onClose : onOpen}
                >
                    {open ? <FaWindowClose /> : <GiHamburgerMenu />}
                </ IconButton>

                <Box>My App</Box>
                <HStack alignItems={'center'}>
                    <HStack as={'nav'} display={{ base: 'none', md: 'flex' }} spaceX={5}>
                        <Nav />
                    </HStack>
                </HStack>
            </Flex>
            {/* responsive nav */}
            {open ? (
                <Box pb={4} display={{ md: 'none' }}>
                    <Stack as={'nav'}>
                        <Nav />
                    </Stack>
                </Box>
        ) : null}
        </Box>
    )
}

export default Navbar;