import { NavLink } from "react-router-dom";
import CookieServices from "../../services/CookieServices";
import { Button, Drawer } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { onOpenCartDrawerAction } from "../../app/features/globalSlice";

const Nav = () => {
    const dispatch = useDispatch();
    const {cartItems} = useSelector((state: RootState) => state.cart);
    const logout = () => {
        CookieServices.remove("jwt"); 
        location.reload();
    }
    const onOpenDrawer = () => dispatch(onOpenCartDrawerAction());
    return (
        <>
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"products"}>Products</NavLink>
            <NavLink to={"about"}>About</NavLink>
            <Button onClick={onOpenDrawer}>Cart {cartItems.length}</Button>
            <Button onClick={logout}>Logout</Button>
        </>
    )
}

export default Nav;