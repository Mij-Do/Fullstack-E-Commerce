import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "../pages/Layout";
import HomePage from "../pages/Index";
import AboutPage from "../pages/About";
import ProductsPage from "../pages/Products";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {/* Root Layout */}
            <Route path="/" element={<RootLayout />}>
                <Route index element={<HomePage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="about" element={<AboutPage />} />
            </Route>
        </>
    )
);

export default router;