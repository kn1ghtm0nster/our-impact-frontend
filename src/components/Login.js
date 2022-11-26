import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";

import "../styles/Login.css";

const Login = ({ login, title }) => {
	const INITIAL_FORM_STATE = {
		username: "",
		password: "",
	};

	const [loginForm, setLoginForm] = useState(INITIAL_FORM_STATE);
	const [validated, setValidated] = useState(false);
	const [show, setShow] = useState(false);
	const [alertMessage, setAlertMessage] = useState([]);

	useEffect(() => {
		document.title = title;
	}, [title]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setLoginForm((data) => ({
			...data,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		const { username, password } = loginForm;
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		} else {
			try {
				e.preventDefault();
				await login(username, password);
				setLoginForm(INITIAL_FORM_STATE);
			} catch (err) {
				setShow(true);
				setAlertMessage(err.message);
			}
		}
		setValidated(true);
	};

	return (
		<div className="d-flex vh-100 justify-content-center">
			<div className="bg-image"></div>
			<Stack direction="horizontal" gap={3}>
				<Card
					id="login-card"
					className="mx-auto"
					style={{ width: "30rem" }}
				>
					<Card.Body>
						<h2 className="text-center">Welcome Back!</h2>
						{show ? (
							<Alert
								variant="danger"
								onClose={() => setShow(false)}
								dismissible
							>
								{alertMessage}
							</Alert>
						) : (
							""
						)}
						<Form
							noValidate
							validated={validated}
							onSubmit={handleSubmit}
						>
							<Row className="mb-3 ">
								<Form.Group
									as={Col}
									md="12"
									controlId="validationCustomUsername"
								>
									<Form.Label>Username</Form.Label>
									<InputGroup hasValidation>
										<Form.Control
											required
											type="text"
											placeholder="username"
											name="username"
											onChange={handleChange}
											autoComplete="username"
										/>
										<Form.Control.Feedback type="invalid">
											Username is required!
										</Form.Control.Feedback>
									</InputGroup>
								</Form.Group>
							</Row>
							<Row className="mb-3 ">
								<Form.Group
									as={Col}
									md="12"
									controlId="validationCustomPassword"
								>
									<Form.Label>Password</Form.Label>
									<InputGroup hasValidation>
										<Form.Control
											required
											type="password"
											placeholder="password"
											name="password"
											onChange={handleChange}
											autoComplete="current-password"
										/>
										<Form.Control.Feedback type="invalid">
											Password cannot be blank!
										</Form.Control.Feedback>
									</InputGroup>
								</Form.Group>
							</Row>
							<Row>
								<div className="d-grid gap-2">
									<Button type="submit">Log In</Button>
								</div>
							</Row>
						</Form>
					</Card.Body>
				</Card>
			</Stack>
		</div>
	);
};

export default Login;
