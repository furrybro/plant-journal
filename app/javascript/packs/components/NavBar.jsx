import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarText, Button } from "reactstrap";


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
        <Nav className="navbar fixed-top" style={{ backgroundColor: 'rgba(176, 202, 148)' }}>
            {user ? (
                <Container fluid>
                    {/* <Navbar> */}
                        <NavbarBrand>THE PLANT JOURNAL</NavbarBrand>
                        {/* <Nav> */}
                            <NavItem className="me-right" style={{ fontSize: '18px' }}>
                                <NavLink href="/">Garden</NavLink>
                            </NavItem>
                            <NavItem className="me-right" style={{ fontSize: '18px' }}>
                                <NavLink onClick={handleLogoutClick}>Logout</NavLink>
                            </NavItem>
                        {/* </Nav> */}
                    {/* </Navbar> */}
                </Container>
            ) : (
                null
            )}
        </Nav>
    );
}

export default NavBar;
