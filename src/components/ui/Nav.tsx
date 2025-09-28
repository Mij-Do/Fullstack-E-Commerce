import { NavLink } from "react-router-dom";
import CookieServices from "../../services/CookieServices";
import { Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { onOpenCartDrawerAction } from "../../app/features/globalSlice";
import Mode from "./Mode";

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
            <NavLink to={"dashboard"}>Dashboard</NavLink>
            <Mode />
            <Button onClick={onOpenDrawer}>Cart {cartItems.length}</Button>
            <Button onClick={logout}>Logout</Button>
        </>
    )
}

export default Nav;