import React from "react";
import { useNavigate } from "react-router-dom";
import { NavbarBrand, Nav, NavbarToggler, NavItem } from "reactstrap";

function NavBar({ user, setUser, showOrganismName }) {
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
                <Nav className="navbar navbar-expand-md fixed-top" style={{ backgroundColor: 'rgba(176, 202, 148)', fontFamily: 'Poppins' }}>
                    <div className="container-fluid">
                          <NavbarBrand>THE PLANT JOURNAL</NavbarBrand>
                          {showOrganismName ? (<NavItem>{showOrganismName}</NavItem>) : (null)}
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
                                    <a className="nav-link" href="/">{user.username}'s Garden</a>
                                </li>
                                <li>
                                    <a className="nav-link" onClick={handleLogoutClick}>Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Nav>
            ) : (
                null
            )}
        </div>
    );
}

export default NavBar;
