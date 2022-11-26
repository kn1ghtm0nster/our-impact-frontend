import { useState } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const NewCommentForm = ({ addNewCityComment, cityName }) => {
	const currUser = JSON.parse(localStorage.getItem("user"));

	const INITIAL_FORM_STATE = {
		commentText: "",
	};

	const [commentForm, setCommentForm] = useState(INITIAL_FORM_STATE);
	const [validated, setValidated] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCommentForm((data) => ({
			...data,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		const { commentText } = commentForm;

		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		} else {
			try {
				e.preventDefault();
				await addNewCityComment(
					{
						commentText,
						author: currUser.username,
						locationName: cityName,
					},
					currUser.token,
				);
				window.location.reload();
				setCommentForm(INITIAL_FORM_STATE);
			} catch (e) {
				console.log(e);
			}
		}
		setValidated(true);
	};

	return (
		<div className="d-flex justify-content-center">
			<Form
				noValidate
				validated={validated}
				onSubmit={handleSubmit}
				className="w-75"
			>
				<Row>
					<Form.Group
						as={Col}
						md="12"
						className="mb-3"
						controlId="textAreaControl"
					>
						<Form.Label className="text-white">
							New Comment
						</Form.Label>
						<InputGroup hasValidation>
							<Form.Control
								as="textarea"
								name="commentText"
								placeholder="Add new comment..."
								rows={5}
								cols={35}
								onChange={handleChange}
								required
							/>
							<Form.Control.Feedback type="invalid">
								New comment cannot be blank.
							</Form.Control.Feedback>
						</InputGroup>
					</Form.Group>
				</Row>
				<Button type="submit">Add Comment</Button>
			</Form>
		</div>
	);
};

export default NewCommentForm;
