import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarText } from "reactstrap";


function NavBar({ user, setUser }) {
    const [isOpen, setIsOpen] = useState(false);

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
                <Navbar className="navbar sticky-top d-flex flex-row" style={{ backgroundColor: 'rgba(176, 202, 148)' }}>
                    <NavbarBrand>THE PLANT JOURNAL</NavbarBrand>
                    <Nav>
                        <NavItem style={{ fontSize: '18px' }}>
                            <NavLink href="/">Garden</NavLink>
                        </NavItem>
                        <NavItem style={{ fontSize: '18px' }}>
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
