import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";


function NavBar({ user, setUser }) {
    const navigate = useNavigate();

    function handleLogoutClick() {
        fetch("/api/v1/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
                setUser(null);
                navigate("/login");
            }
        });
    }

    return (
        <Nav className="navbar fixed-top" style={{ backgroundColor: 'rgba(176, 202, 148)' }}>
            {user ? (
                <Container fluid>
                    {/* <Navbar> */}
                        <NavbarBrand>THE PLANT JOURNAL</NavbarBrand>
                        <Nav>
                            <NavItem style={{ fontSize: '18px' }}>
                                <NavLink href="/">Garden</NavLink>
                            </NavItem>
                            <NavItem style={{ fontSize: '18px' }}>
                                <NavLink onClick={handleLogoutClick}>Logout</NavLink>
                            </NavItem>
                        </Nav>
                    {/* </Navbar> */}
                </Container>
            ) : (
                null
            )}
        </Nav>
    );
}

export default NavBar;
