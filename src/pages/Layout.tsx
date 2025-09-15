import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Box } from "@chakra-ui/react";


const RootLayout = () => {
    return (
        <Box>
            <Box mb={5}>
                <Navbar />
            </Box>
            <Outlet />
        </Box>
    )
}

export default RootLayout;