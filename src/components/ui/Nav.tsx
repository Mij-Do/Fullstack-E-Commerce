import { NavLink } from "react-router-dom";
import CookieServices from "../../services/CookieServices";
import { Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

const Nav = () => {
    const {cartItems} = useSelector((state: RootState) => state.cart);
    const logout = () => {
        CookieServices.remove("jwt"); 
        location.reload();
    }
    return (
        <>
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"products"}>Products</NavLink>
            <NavLink to={"about"}>About</NavLink>
            <Button onClick={() => {}}>Cart {cartItems.length}</Button>
            <Button onClick={logout}>Logout</Button>
        </>
    )
}

export default Nav;