import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "./Spinner";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import "../styles/EditCommentFormStyles.css";

const EditUserCommentForm = ({ getSingleComment, updateUserComment }) => {
	const currUser = JSON.parse(localStorage.getItem("user"));
	const { id } = useParams();
	const [comm, setComm] = useState({});
	const [loaded, setLoaded] = useState(false);
	const [validated, setValidated] = useState(false);

	document.title = "Edit Comment";

	useEffect(() => {
		(async () => {
			try {
				const data = await getSingleComment(id, currUser.token);
				setComm(data);
			} catch (err) {
				console.log(err);
			} finally {
				setLoaded(true);
			}
		})();

		return () => {};
	}, [currUser.token, id, getSingleComment]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setComm((data) => ({
			...data,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		const { comment, username, cityName } = comm;

		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		} else {
			try {
				e.preventDefault();
				const updated = await updateUserComment(
					{ id, commentText: comment, username, cityName },
					currUser.token,
				);
				setComm(updated);
			} catch (err) {
				console.log(err);
			}
		}
		setValidated(true);
	};

	if (!loaded) {
		return <Spinner />;
	} else {
		return (
			<div>
				<div className="edit-bg-image"></div>
				<Stack direction="horizontal" gap={3}>
					<Card
						id="edit-comment"
						className="mx-auto"
						style={{ width: "50rem" }}
					>
						<Card.Body>
							<h2 className="text-center">Edit your comment</h2>
							<Form
								noValidate
								validated={validated}
								onSubmit={handleSubmit}
							>
								<Row className="mb-3">
									<Form.Group
										as={Col}
										md="12"
										className="mb-3"
										controlId="textAreaControl"
									>
										<InputGroup hasValidation>
											<Form.Control
												as="textarea"
												name="comment"
												rows={5}
												cols={35}
												onChange={handleChange}
												value={comm.comment}
												required
											/>
											<Form.Control.Feedback type="invalid">
												Updated comment cannot be blank.
											</Form.Control.Feedback>
										</InputGroup>
									</Form.Group>
								</Row>
								<Row className="mb-3">
									<div className="d-grid gap-2">
										<Button type="submit" variant="success">
											Update Comment
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

export default EditUserCommentForm;
