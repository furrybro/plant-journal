import React, { useEffect, useState } from "react";
import Garden from "./Garden";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import NavBar from "./NavBar";
import Entries from "./Entries";

function App() {
    const [ user, setUser ] = useState(null);
    const [ organismId, setOrganismId ] = useState();
    const [ entryForm, setEntryForm ] = useState(false);

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

    // console.log("the user is currently logged", user ? "in" : "out")

    return (
        <React.Fragment>
            <NavBar user={user} setUser={setUser} />
            <div className="succulent">
                <BrowserRouter>

                    <main>
                        {user ? (
                            <Routes>
                                <Route path="/" element={<Garden organismId={organismId} setOrganismId={setOrganismId} user={user} />} />
                                <Route path="/entries" element={<Entries organismId={organismId} entryForm={entryForm} setEntryForm={setEntryForm} />} />
                            </Routes>
                        ) : (
                            <Routes>
                                <Route path="/" element={<Login setUser={setUser} />} />
                                <Route path="/signup" element={<SignUp setUser={setUser} />} />
                                <Route path="/login" element={<Login setUser={setUser} />} />
                                <Route path="/entries" element={<Entries organismId={organismId} entryForm={entryForm} setEntryForm={setEntryForm}/>} />
                            </Routes>
                        )}
                    </main>
                </BrowserRouter>
            </div>
        </React.Fragment>


    );
}

export default App;


