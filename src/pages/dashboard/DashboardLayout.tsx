import { useColorModeValue } from "@chakra-ui/color-mode";
import {
    Box,
    Flex,
    Text,
    Stack,
    HStack,
    Button,
    IconButton,
    Drawer,
    CloseButton,
    useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { NavLink, Outlet } from "react-router-dom";


function SidebarContent() {
    return (
        <Stack>
            <Text fontSize="2xl" fontWeight="bold">
                My Dashboard
            </Text>
            <Button asChild _hover={{bg: "#2d2146ff", p: 2, color: "white", transition: "all"}} justifyContent="flex-start" variant="ghost">
                <NavLink to={"/dashboard"}>Home</NavLink>
            </Button>
            <Button asChild _hover={{bg: "#2d2146ff", p: 2, color: "white", transition: "all"}} justifyContent="flex-start" variant="ghost">
                <NavLink to={"/dashboard/products"}>Products</NavLink>
            </Button>
        </Stack>
    );
}

const DashboardLayout = () => {
    const sidebarBg = useColorModeValue("gray.100", "gray.900");
    const [open, setOpen] = useState(false);
    const isDesktop = useBreakpointValue({ base: false, md: true });

    useEffect(() => {
        if (isDesktop) {
            setOpen(false);
        }
    }, [isDesktop]);

        const onClose = () => setOpen(false);
        const onOpen = () => setOpen(true);
    

    return (
        <Flex h="100vh" bg={useColorModeValue("gray.50", "gray.800")}>

        {open ?
            <Drawer.Root open={open} onInteractOutside={onClose}>
                <Drawer.Content bg={sidebarBg} display={{ base: "block", md: "none" }} w={"100vh"}>
                    <Drawer.CloseTrigger asChild>
                        <CloseButton size="md" onClick={onClose}/>
                    </Drawer.CloseTrigger>
                    <Drawer.Header>Menu</Drawer.Header>
                    <Drawer.Body>
                        <SidebarContent />
                    </Drawer.Body>
                </Drawer.Content>
            </Drawer.Root> 
            :
            <Box
                w="220px"
                p="4"
                bg={sidebarBg}
                borderRight="1px solid"
                borderColor="gray.200"
                display={{ base: "none", md: "block" }} // hidden on mobile/tablet
            >
                <SidebarContent />
            </Box>
        }
        {/* Main Content */}
            <Flex flex="1" direction="column" position={`${open && "absolute"}`} w={"full"}>
            {/* Header */}
                <HStack
                    px="6"
                    py="4"
                    borderBottom="1px solid"
                    borderColor="gray.200"
                    justify="space-between"
                >
                {/* Hamburger button only on mobile */}
                    <IconButton
                        aria-label="Open menu"
                        display={{ base: "inline-flex", md: "none" }}
                        onClick={onOpen}
                    >
                        <FiMenu />
                    </IconButton>

                    <Text fontSize="xl" fontWeight="bold">
                        Overview
                    </Text>
                    <Button>Log Out</Button>
                </HStack>

                {/* Content */}
                <Box p={3}>
                    <Outlet />
                </Box>
            </Flex>
        </Flex>
    );
}

export default DashboardLayout;
