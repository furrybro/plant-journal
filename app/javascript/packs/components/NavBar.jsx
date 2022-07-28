import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText } from "reactstrap";


function NavBar({ user, setUser }) {
    const [ isOpen, setIsOpen ] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    function handleLogoutClick() {
        fetch("/api/v1/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
                setUser(null);
            }
        });
    }

    return (
        <div>
            {user ? (
                <Navbar>
                    <NavbarBrand>Welcome!</NavbarBrand>
                    <Nav>
                        <NavItem>
                            <NavLink href="/">Garden</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={handleLogoutClick}>Logout</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            ) : (
                null
            )}
        </div>
    );
}

export default NavBar;


// {user ? (
//                 <React.Fragment>
//                     <Link to="/">Garden</Link>
//                     <button onClick={handleLogoutClick}>Logout</button>
//                 </React.Fragment>
//             ) : (
//                 null
//                 // <React.Fragment>
//                 //     <Link to="/signup">Signup</Link><br>
//                 //     </br>
//                 //     <Link to="/login">Login</Link>
//                 // </React.Fragment>
//             )}