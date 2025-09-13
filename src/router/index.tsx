import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "../pages/Layout";
import HomePage from "../pages/Index";
import AboutPage from "../pages/About";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {/* Root Layout */}
            <Route path="/" element={<RootLayout />}>
                <Route index element={<HomePage />} />
                <Route index element={<AboutPage />} />
            </Route>
        </>
    )
);

export default router;