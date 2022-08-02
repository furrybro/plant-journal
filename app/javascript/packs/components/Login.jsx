import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Input, Label, FormText, FormFeedback } from "reactstrap";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const initialValues = {username:"", password: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value });
        console.log(formValues);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    }

    useEffect(() => {
        console.log(formErrors);
        console.log(formValues, "formvalues")
        if(Object.keys(formErrors).length === 0 && isSubmit) {
            fetch("/api/v1/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formValues),
            }).then((r) => {
                if (r.ok) {
                    r.json().then((user) => setUser(user));
                    navigate("/");
                }
            });
        } 
    }, [formErrors])


    const validate = (values) => {
        const errors = {};
        if (!values.username) {
            errors.username = "Username is required!"
        }
        if (!values.password) {
            errors.password = "Password is required!"
        }
        return errors;
    };

    return (
        <div className="formdiv" style={{ fontFamily: 'Poppins' }}>
            <Form className="form" onSubmit={handleSubmit}>
                <h1 className="header">LOGIN</h1>
                <FormGroup>
                    <Label htmlFor="username">Username:</Label>
                    <Input
                        type="text"                        
                        name="username" 
                        id="username"
                        autoComplete="off"
                        value={formValues.username}
                        onChange={handleChange}
                    />
                    <p style={{ color: "red" }}>
                        {formErrors.username}
                    </p>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password:</Label>
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="current-password"
                        value={formValues.password}
                        onChange={handleChange}
                    />
                     <p style={{ color: "red" }}>
                        {formErrors.password}
                    </p>
                </FormGroup>
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
