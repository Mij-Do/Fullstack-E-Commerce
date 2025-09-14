import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Box } from "@chakra-ui/react";


const RootLayout = () => {
    return (
        <Box>
            <Navbar />
            <Outlet />
        </Box>
    )
}

export default RootLayout;