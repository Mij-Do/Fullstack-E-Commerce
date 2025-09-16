import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";


const AppLayout = () => {
    return (
        <Box>
            <Navbar />
            <Outlet />
        </Box>
    )
}

export default AppLayout;