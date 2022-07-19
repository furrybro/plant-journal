import React from "react";
import { NavLink, Link } from "react-router-dom";

function NavBar({ user, setUser }) {

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
                setUser(null);
            }
        });
    }

    return (
        <header>
            <div>
                {user ? (
                    <>
                        <Link to="/">Garden</Link>
                        <button onClick={handleLogoutClick}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/signup">Signup</Link><br>
                        </br>
                        <Link to="/login">Login</Link>
                    </>
                )}
            </div>
        </header>
    );
}

export default NavBar;
