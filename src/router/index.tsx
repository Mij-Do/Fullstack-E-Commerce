import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "../pages/Layout";
import HomePage from "../pages/Index";
import AboutPage from "../pages/About";
import ProductsPage from "../pages/Products";
import ViewProduct from "../pages/ViewProduct";
import type { IProduct } from "../interfaces";
import Login from "../pages/Login";

const data = localStorage.getItem("data");
const resData = data ? JSON.parse(data) : null;


const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {/* Root Layout */}
            <Route path="/" element={<RootLayout />}>
                <Route index element={<HomePage />} />
                <Route path="products" element={<ProductsPage />} />
                {resData.map((product: IProduct) => 
                    <Route path={`products/${product.id}`} element={<ViewProduct key={product.id} product={product}/>} 
                />)}
                <Route path="about" element={<AboutPage />} />
                <Route path="login" element={<Login />} />
            </Route>
        </>
    )
);

export default router;