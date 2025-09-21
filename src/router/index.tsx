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
import AppLayout from "../pages/AppLayout";
import ProtectedRoute from "../components/auth/ProtectedRoutes";
import CookieServices from "../services/CookieServices";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import DashboardHome from "../pages/dashboard";
import DashboardProduct from "../pages/dashboard/DashboardProduct";

const data = localStorage.getItem("data");
const resData = data ? JSON.parse(data) : null;
const token = CookieServices.get("jwt");


const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {/* Root Layout */}
            <Route element={<RootLayout />}>
                <Route  path="/" element={<AppLayout />}>
                    <Route index element={
                        <ProtectedRoute 
                            isAllowed={token}
                            redirectPath="/login"
                        >
                            <HomePage />
                        </ProtectedRoute>
                    } />
                    <Route path="products" element={
                        <ProtectedRoute 
                            isAllowed={token}
                            redirectPath="/login"
                        >
                            <ProductsPage />
                        </ProtectedRoute>
                    } />
                    {resData?.map((product: IProduct) => 
                        <Route path={`products/${product.documentId}`} element={
                            <ProtectedRoute 
                                    isAllowed={token}
                                    redirectPath="/login"
                                >
                                <ViewProduct key={product.documentId} product={product}/>
        
                            </ProtectedRoute>} 
                    />)}
                    <Route path="about" element={
                        <ProtectedRoute 
                            isAllowed={token}
                            redirectPath="/login"
                        >
                            <AboutPage />
                        </ProtectedRoute>
                    } />
                </Route>
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<DashboardHome />}/>
                    <Route path="products" element={<DashboardProduct />}/>
                </Route>
                <Route path="/login" element={
                    <ProtectedRoute 
                        isAllowed={!token}
                        redirectPath="/"
                    >
                        <Login />
                    </ProtectedRoute>
                } />
            </Route>
        </>
    )
);

export default router;