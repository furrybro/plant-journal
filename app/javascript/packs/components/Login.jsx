import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label, FormText } from "reactstrap";
import "/Users/jeena/Development/code/phase-5/plant-journal/app/assets/stylesheets/application.css";


function Login({ setUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/api/v1/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((user) => setUser(user));
            }
        });
    }

    return (
        <div className="formdiv">
            <h1>Login</h1>
            <Form className="form" onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="username">Username</Label>
                    <Input
                        type="text"
                        id="username"
                        autoComplete="off"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormGroup>
                <Button type="submit">Login</Button>
                <br></br>
                <FormText>
                    New to us? <a href="/signup">Sign up here.</a>
                </FormText>
            </Form>
        </div>
    );
}

export default Login;
