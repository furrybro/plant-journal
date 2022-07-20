import React from "react";
import { Link } from "react-router-dom";

function NavBar({ user, setUser }) {

    function handleLogoutClick() {
        fetch("/api/v1/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
                setUser(null);
            }
        });
    }

    return (
        <header>
            <div>
                {user ? (
                    <React.Fragment>
                        <Link to="/">Garden</Link>
                        <button onClick={handleLogoutClick}>Logout</button>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Link to="/signup">Signup</Link><br>
                        </br>
                        <Link to="/login">Login</Link>
                    </React.Fragment>
                )}
            </div>
        </header>
    );
}

export default NavBar;
