import React, { useEffect, useState } from "react";
import Garden from "./Garden";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import NavBar from "./NavBar";
import Entries from "./Entries";
import succulent from "/app/assets/images/succulent";

function App() {
    const [user, setUser] = useState(null);
    
    const [entryForm, setEntryForm] = useState(false);

    useEffect(() => {
        fetch("/api/v1/me", {
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            }
        })
            .then((r) => {
                if (r.ok) {
                    r.json().then((user) => setUser(user));
                }
            });
    }, []);

    return (
        <div className="bg-image d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${succulent})`, height:'100vh', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                
            <div style={{ maxHeight: '80vh', overflow: 'auto' }}>
                <BrowserRouter>
                <NavBar user={user} setUser={setUser} />
                    <main>
                        {user ? (
                            <Routes>
                                <Route path="/" element={<Garden user={user} />} />
                                <Route path="/entries/:organism_id" element={<Entries entryForm={entryForm} setEntryForm={setEntryForm} />} />
                            </Routes>
                        ) : (
                            <Routes>
                                <Route path="/" element={<Login setUser={setUser} />} />
                                <Route path="/signup" element={<SignUp setUser={setUser} />} />
                                <Route path="/login" element={<Login setUser={setUser} />} />
                                <Route path="/entries/:organism_id" element={<Entries entryForm={entryForm} setEntryForm={setEntryForm}/>} />
                            </Routes>
                        )}
                    </main>
                </BrowserRouter>
            </div>
        </div>


    );
}

export default App;


