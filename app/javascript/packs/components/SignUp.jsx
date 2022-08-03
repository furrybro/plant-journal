import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label, FormText } from "reactstrap";
import { useNavigate } from "react-router-dom";

function SignUp({ setUser }) {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	function sendSignupPostRequest() {
		fetch("/api/v1/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				email,
				password,
				password_confirmation: passwordConfirmation,
			}),
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
			sendSignupPostRequest();
		} else {
			setErrors(validationErrors);
		}
	}

	function validate() {
		const validationErrors = {};
		if (username.length === 0) {
			validationErrors.username = "Username cannot be blank";
		}

		const isValid = Object.keys(validationErrors).length === 0;
		return {
			isValid,
			validationErrors,
		}
	}

	let renderEachError = null;

	if (errors.postErrors !== undefined) {
		renderEachError = errors.postErrors.map((error) => {
			return <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
		});
	}

	return (
		<div className="full-width d-flex justify-content-center align-items-center" style={{ fontFamily: 'Poppins' }}>
			<Form className="formdiv rounded p-4 p-sm-4" onSubmit={handleSubmit}>
				<h2 className="header" style={{ fontSize: '48px', textAlign: 'center', fontWeight: '800' }}>SIGN UP</h2>
				<FormGroup>
					<Label for="newusername">Username:</Label>
					<Input
						className="form-control"
						type="text"
						name="username"
						id="newusername"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="plants4lyfe"
					/>
					<p style={{ color: "red", fontWeight: "bold" }}>
						{errors.username}
					</p>
				</FormGroup>
				<FormGroup>
					<Label for="newemail">Email:</Label>
					<Input
						className="form-control"
						type="email"
						id="newemail"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="queenbee@garden.com"
					/>
				</FormGroup>
				<FormGroup>
					<Label for="password">Password:</Label>
					<Input
						className="form-control"
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="******"
					/>
				</FormGroup>
				<FormGroup>
					<Label for="password_confirmation">Confirm Password:</Label>
					<Input
						className="form-control"
						type="password"
						id="password_confirmation"
						value={passwordConfirmation}
						onChange={(e) => setPasswordConfirmation(e.target.value)}
						placeholder="******"
					/>
				</FormGroup>
				{renderEachError}
				<Button>Submit</Button>
				<br></br>
				<br></br>
				<FormText color="black">
					Already have an account? <a href="/login">Login here.</a>
				</FormText>
			</Form>
		</div>
	);
}

export default SignUp;