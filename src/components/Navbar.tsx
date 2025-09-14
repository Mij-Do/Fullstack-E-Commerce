import { useColorModeValue } from '@chakra-ui/color-mode';
import {
    Box,
    Flex,
    HStack,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';




const Navbar = () => {

return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <HStack alignItems={'center'}>
                    <HStack as={'nav'} display={{ base: 'none', md: 'flex' }} spaceX={5}>
                        <NavLink to={"/"}>Home</NavLink>
                        <NavLink to={"products"}>Products</NavLink>
                        <NavLink to={"about"}>About</NavLink>
                    </HStack>
                </HStack>
            </Flex>
        </Box>
    )
}

export default Navbar;