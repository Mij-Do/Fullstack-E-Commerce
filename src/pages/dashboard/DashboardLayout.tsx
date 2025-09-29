import { useColorModeValue } from "@chakra-ui/color-mode";
import {
    Box,
    Text,
    Stack,
    Button,
    IconButton,
    Drawer,
    CloseButton,
    useBreakpointValue,
} from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { NavLink, Outlet } from "react-router-dom";
import Mode from "../../components/ui/Mode";
import CookieServices from "../../services/CookieServices";


const SidebarContent = () => {
    return (
        <Stack w={"full"}>
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
    const { theme } = useTheme();
    const [open, setOpen] = useState(false);
    const isDesktop = useBreakpointValue({ base: false, md: true });

    useEffect(() => {
        if (isDesktop) {
            setOpen(false);
        }
    }, [isDesktop]);

    const onClose = () => setOpen(false);
    const onOpen = () => setOpen(true);
    
    const logout = () => {
            CookieServices.remove("jwt"); 
            location.reload();
        }


    return (
        <Box h={"100vh"} display={"flex"} bg={useColorModeValue("gray.50", "gray.800")}>
            {open ?
                <Drawer.Root open={open} onInteractOutside={onClose}>
                    <Drawer.Content bg={theme === "light" ? "gray.200" : "gray.800"}>
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
                    w="250px"
                    p="4"
                    bg={theme === "light" ? "gray.200" : "gray.800"}
                    borderRight="1px solid"
                    borderColor="gray.200"
                    display={{ base: "none", md: "block" }}
                >
                    <SidebarContent />
                </Box>
            }
            {/* Main Content */}
            <Box 
                display={"flex"} 
                w={"full"} 
                bg={theme === "light" ? "white" : "gray.700"} 
                flexDir="column"
                position={open ? "absolute" : ""}
            >
            {/* Header */}
                <Stack
                    display={"flex"}
                    flexDir={"row"}
                    px="6"
                    py="4"
                    borderBottom="1px solid"
                    borderColor="gray.200"
                    justifyContent="space-between"
                    alignItems={"center"}
                    bg={theme === "light" ? "gray.100" : "gray.900"}
                >
                {/* Hamburger button only on mobile */}
                    <IconButton
                        aria-label="Open menu"
                        display={{ base: "inline-flex", md: "none" }}
                        onClick={onOpen}
                    >
                        <FiMenu />
                    </IconButton>
                    <Mode />
                    <Text fontSize="xl" fontWeight="bold">
                        Overview
                    </Text>
                    <NavLink to={"/"}> Home </NavLink>
                    <Button
                        onClick={logout}
                    >
                        Log Out
                    </Button>
                </Stack>

                {/* Content */}
                <Box h={"100vh"} m={2}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}

export default DashboardLayout;
