import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Stack from "react-bootstrap/Stack";
import "../styles/EditProfileFormStyles.css";

const EditProfileForm = ({ getUser, updateUser, cities }) => {
	const currUser = JSON.parse(localStorage.getItem("user"));
	const [formData, setFormData] = useState({});
	const [loaded, setLoaded] = useState(false);
	const [validated, setValidated] = useState(false);
	const [show, setShow] = useState(false);
	const [alertMessage, setAlertMessage] = useState([]);

	const availableCities = cities.map((c) => (
		<option key={c.city_name} value={c.city_name}>
			{c.city_name}
		</option>
	));

	document.title = "Edit Profile";

	useEffect(() => {
		(async () => {
			try {
				const data = await getUser(currUser.username, currUser.token);

				setFormData(data);
			} catch (err) {
				console.log(err);
			} finally {
				setLoaded(true);
			}
		})();

		return () => {};
	}, [currUser.username, currUser.token, getUser]);

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData((data) => ({
			...data,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		const { firstName, lastName, email, userCity } = formData;
		const form = e.currentTarget;

		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		} else {
			try {
				e.preventDefault();
				const results = await updateUser(
					currUser.username,
					{ firstName, lastName, email, userCity },
					currUser.token,
				);
				setFormData(results);
			} catch (err) {
				if (
					err.message.includes(
						'insert or update on table "users" violates foreign key constraint "users_city_name_fkey"',
					)
				) {
					err.message = "City is required for user updates";
				}
				setShow(true);
				setAlertMessage(err.message);
			}
		}
		setValidated(true);
	};

	if (!loaded) {
		return <Spinner />;
	} else {
		return (
			<div className="d-flex vh-100 justify-content-center">
				<div className="edit-bg-image"></div>
				<Stack direction="horizontal" gap={3}>
					<Card
						id="edit-profile-card"
						className="mx-auto"
						style={{ width: "50rem" }}
					>
						<Card.Body>
							<h2 className=" text-center">Edit Profile</h2>
							{show ? (
								<Alert
									variant="danger"
									onClose={() => setShow(false)}
									dismissible
								>
									ERROR: {alertMessage}
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
												value={formData.firstName}
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
												value={formData.lastName}
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
										md="12"
										controlId="validationEmail"
									>
										<Form.Label>Email</Form.Label>
										<InputGroup hasValidation>
											<Form.Control
												required
												type="email"
												value={formData.email}
												name="email"
												onChange={handleChange}
											/>
											<Form.Control.Feedback type="invalid">
												Please enter a valid email
												address.
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
										<Form.Label>City</Form.Label>
										<InputGroup hasValidation>
											<Form.Select
												required
												type="text"
												value={formData.userCity || ""}
												name="userCity"
												onChange={handleChange}
											>
												<option value={null}>
													--Select City--
												</option>
												{availableCities}
											</Form.Select>
											<Form.Control.Feedback type="invalid">
												Please select a city.
											</Form.Control.Feedback>
										</InputGroup>
									</Form.Group>
								</Row>
								<Row className="mb-3">
									<div className="d-grid gap-2">
										<Button type="submit" variant="success">
											Update Profile
										</Button>
										<Link
											className="btn btn-outline-danger"
											to={`/users/${currUser.username}`}
										>
											Cancel
										</Link>
									</div>
								</Row>
							</Form>
						</Card.Body>
					</Card>
				</Stack>
			</div>
		);
	}
};

export default EditProfileForm;
