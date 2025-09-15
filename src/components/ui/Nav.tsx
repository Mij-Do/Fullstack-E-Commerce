import { NavLink } from "react-router-dom";

const Nav = () => {
    return (
        <>
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"products"}>Products</NavLink>
            <NavLink to={"about"}>About</NavLink>
            <NavLink to={"login"}>Login</NavLink>
        </>
    )
}

export default Nav;