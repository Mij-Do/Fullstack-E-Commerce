import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";


const RootLayout = () => {
    return (
        <Box>
            <Outlet />
        </Box>
    )
}

export default RootLayout;