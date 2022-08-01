import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, NavbarBrand, Nav, NavItem, NavLink, Button, NavbarToggler } from "reactstrap";


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
        <div>
            {user ? (
                // <Container>
                <Nav className="navbar navbar-expand-md" style={{ backgroundColor: 'rgba(176, 202, 148)' }}>
                    <div className="container-fluid">
                          <NavbarBrand>THE PLANT JOURNAL</NavbarBrand>
                        <NavbarToggler
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#toggleMobileMenu"
                            aria-controls="toggleMobileMenu"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </NavbarToggler>
                        <div className="collapse navbar-collapse" id="toggleMobileMenu">
                            <ul className="navbar-nav ms-auto text-center">
                                <li>
                                    <a className="nav-link" href="/">Garden</a>
                                </li>
                                <li>
                                    <a className="nav-link">Profile</a>
                                </li>
                                <li>
                                    <a className="nav-link" onClick={handleLogoutClick}>Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Nav>
                // </Container> 
                // <Nav className="navbar fixed-top" style={{ backgroundColor: 'rgba(176, 202, 148)' }}>
                //     <Container fluid>
                //         <NavbarBrand>THE PLANT JOURNAL</NavbarBrand>
                //         <Nav>
                //             <NavItem style={{ fontSize: '18px' }}>
                //                 <NavLink href="/">Garden</NavLink>
                //             </NavItem>
                //             <NavItem style={{ fontSize: '18px' }}>
                //                 <NavLink onClick={handleLogoutClick}>Logout</NavLink>
                //             </NavItem>
                //         </Nav>
                //     </Container>
                // </Nav>
            ) : (
                null
            )}
        </div>

    );
}

export default NavBar;
