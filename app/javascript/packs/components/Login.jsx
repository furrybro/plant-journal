import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label, FormText } from "reactstrap";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    function sendLoginPostRequest() {
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
                navigate("/");
            } else {
                r.json().then((r) => setErrors({ postErrors: r.error }));
            }
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { isValid, validationErrors } = validate();
        if (isValid) {
            setErrors({});
            sendLoginPostRequest();
        } else {
            setErrors(validationErrors);
        }
    }

    function validate() {
        const validationErrors = {};
        if (username.length === 0) {
            validationErrors.username = "Username cannot be blank";
        }

        if (password.length === 0) {
            validationErrors.password = "Password cannot be blank";
        }

        const isValid = Object.keys(validationErrors).length === 0;
        return {
            isValid,
            validationErrors,
        }
    }

    return (
        <div className="formdiv" style={{ fontFamily: 'Poppins' }}>
            <Form className="form" onSubmit={handleSubmit}>
                <h1 className="header">LOGIN</h1>
                <FormGroup>
                    <Label htmlFor="username">Username:</Label>
                    <Input
                        type="text"
                        id="username"
                        autoComplete="off"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <p style={{ color: "red" }}>
                        {errors.username}
                    </p>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password:</Label>
                    <Input
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <p style={{ color: "red" }}>
                        {errors.password}
                    </p>
                </FormGroup>
                <p style={{ color: "red" }}>
                    {errors.postErrors}
                </p>
                <Button type="submit">Login</Button>
                <br></br>
                <br></br>
                <FormText>
                    New to us? <a href="/signup">Sign up here.</a>
                </FormText>
            </Form>
        </div>
    );
}

export default Login;
