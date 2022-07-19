import React, { useEffect, useState } from "react";
import Garden from "./Garden";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import NavBar from "./NavBar";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("/me", {headers: {"Content-Type": "application/json", "Accepts": "application/json"}}).then((r) => {
            if (r.ok) {
                r.json().then((user) => setUser(user));
            }
        });
    }, []);

    return (
        <React.Fragment>
            <BrowserRouter>
            <NavBar user={user} setUser={setUser}/>
            <main>
                {user ? (
                        <Routes>
                            <Route path="/" element={<Garden />} />
                        </Routes>
                ) : (
                        <Routes>
                            <Route path="signup" element={<SignUp setUser={setUser} />} />
                            <Route path="login" element={<Login setUser={setUser} />} />
                        </Routes>
                )}
            </main>
            </BrowserRouter>
        </React.Fragment>
        
    );
}

export default App;


