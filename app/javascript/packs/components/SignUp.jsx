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
			return <p style={{ color: "red" }}>{error}</p>
		});
	}

	return (
		<div className="formdiv" style={{ fontFamily: 'Poppins' }}>
			<Form className="form" onSubmit={handleSubmit}>
				<h2 className="header">SIGN UP</h2>
				<FormGroup>
					<Label htmlFor="newusername">Username:</Label>
					<Input
						type="text"
						name="username"
						id="newusername"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="gardener4eva"
					/>
					<p style={{ color: "red" }}>
						{errors.username}
					</p>
				</FormGroup>
				<FormGroup>
					<Label htmlFor="newemail">Email:</Label>
					<Input
						type="email"
						id="newemail"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="example@example.com"
					/>
				</FormGroup>
				<FormGroup>
					<Label htmlFor="password">Password:</Label>
					<Input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="********"
					/>
				</FormGroup>
				<FormGroup>
					<Label htmlFor="password_confirmation">Confirm Password:</Label>
					<Input
						type="password"
						id="password_confirmation"
						value={passwordConfirmation}
						onChange={(e) => setPasswordConfirmation(e.target.value)}
						placeholder="********"
					/>
				</FormGroup>
				{renderEachError}
				<Button>Submit</Button>
				<br></br>
				<br></br>
				<FormText>
					Already have an account? <a href="/login">Login here.</a>
				</FormText>
			</Form>
		</div>
	);
}

export default SignUp;