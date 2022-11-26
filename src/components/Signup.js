import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import Alert from "react-bootstrap/Alert";
import "../styles/Signup.css";

const Signup = ({ registerUser, title }) => {
	const INITIAL_FORM_STATE = {
		username: "",
		password: "",
		firstName: "",
		lastName: "",
		email: "",
	};

	const [signupForm, setSignupForm] = useState(INITIAL_FORM_STATE);
	const [validated, setValidated] = useState(false);
	const [show, setShow] = useState(false);
	const [alertMessage, setAlertMessage] = useState([]);

	useEffect(() => {
		document.title = title;
	}, [title]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setSignupForm((data) => ({
			...data,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		const { username, password, firstName, lastName, email } = signupForm;
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		} else {
			try {
				e.preventDefault();
				await registerUser(
					username,
					password,
					firstName,
					lastName,
					email,
				);
				setSignupForm(INITIAL_FORM_STATE);
			} catch (err) {
				if (
					err.message.includes(
						'instance.email does not conform to the "email" format',
					)
				) {
					err.message = "Invalid Email address.";
				} else if (
					err.message.includes(
						"instance.email does not meet minimum length of 6",
					)
				) {
					err.message = "Email must be at least 6 characters.";
				} else if (
					err.message.includes(
						"instance.password does not meet minimum length of 5",
					)
				) {
					err.message =
						"Password must be at least 5 characters long.";
				} else if (
					err.message.includes(`Duplicate username: ${username}`)
				) {
					err.message = "Username already taken.";
				}
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
					id="signup-card"
					className="mx-auto"
					style={{ width: "50rem" }}
				>
					<Card.Body>
						<h2 className="text-center">Sign Up</h2>
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
							<Row className="mb-3">
								<Form.Group
									as={Col}
									md="6"
									controlId="validationFirstName"
								>
									<Form.Label>First Name</Form.Label>
									<InputGroup hasValidation>
										<Form.Control
											required
											type="text"
											placeholder="John"
											name="firstName"
											onChange={handleChange}
										/>
										<Form.Control.Feedback type="invalid">
											First name is required.
										</Form.Control.Feedback>
									</InputGroup>
								</Form.Group>
								<Form.Group
									as={Col}
									md="6"
									controlId="validationLastName"
								>
									<Form.Label>Last Name</Form.Label>
									<InputGroup hasValidation>
										<Form.Control
											required
											type="text"
											placeholder="Smith"
											name="lastName"
											onChange={handleChange}
										/>
										<Form.Control.Feedback type="invalid">
											Last name is required.
										</Form.Control.Feedback>
									</InputGroup>
								</Form.Group>
							</Row>
							<Row className="mb-3">
								<Form.Group
									as={Col}
									md="6"
									controlId="validationUsername"
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
											Username is required.
										</Form.Control.Feedback>
									</InputGroup>
								</Form.Group>
								<Form.Group
									as={Col}
									md="6"
									controlId="validationPassword"
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
											Password is required.
										</Form.Control.Feedback>
									</InputGroup>
								</Form.Group>
							</Row>
							<Row className="mb-3">
								<Form.Group
									as={Col}
									md="12"
									controlId="validationEmail"
								>
									<Form.Label>Email</Form.Label>
									<InputGroup hasValidation>
										<Form.Control
											required
											type="email"
											placeholder="youremail@example.com"
											name="email"
											onChange={handleChange}
										/>
										<Form.Control.Feedback type="invalid">
											Please enter a valid email address.
										</Form.Control.Feedback>
									</InputGroup>
								</Form.Group>
							</Row>
							<Row>
								<div className="d-grid gap-2">
									<Button type="submit">Sign Up</Button>
								</div>
								<div className="text-center mt-4">
									<p>
										Already have an account? Log in{" "}
										<Link
											to="/login"
											className="link-primary text-decoration-none fw-bold"
										>
											Here!
										</Link>
									</p>
								</div>
							</Row>
						</Form>
					</Card.Body>
				</Card>
			</Stack>
		</div>
	);
};

export default Signup;
