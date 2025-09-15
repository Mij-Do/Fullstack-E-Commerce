import { NavLink } from "react-router-dom";

const Nav = () => {
    return (
        <>
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"products"}>Products</NavLink>
            <NavLink to={"about"}>About</NavLink>
        </>
    )
}

export default Nav;