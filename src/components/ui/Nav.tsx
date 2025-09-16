import { NavLink } from "react-router-dom";
import CookieServices from "../../services/CookieServices";
import { Button } from "@chakra-ui/react";

const Nav = () => {
    const logout = () => {
        CookieServices.remove("jwt"); 
        location.reload();
    }
    return (
        <>
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"products"}>Products</NavLink>
            <NavLink to={"about"}>About</NavLink>
            <Button onClick={() => {}}>Cart {0}</Button>
            <Button onClick={logout}>Logout</Button>
        </>
    )
}

export default Nav;