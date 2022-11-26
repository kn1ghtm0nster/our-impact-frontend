import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";

const UserCard = ({
	username,
	firstName,
	lastName,
	email,
	location,
	deleteUser,
}) => {
	const currUser = JSON.parse(localStorage.getItem("user"));
	const handleDelete = async (e) => {
		try {
			await deleteUser(username, currUser.token);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Stack direction="horizontal" gap={3}>
			<Row>
				<Col>
					<Card style={{ width: "35rem" }} id="blur-card">
						<Card.Body>
							<Card.Text>Username: {username}</Card.Text>
							<Card.Text>First Name: {firstName}</Card.Text>
							<Card.Text>Last Name: {lastName}</Card.Text>
							<Card.Text>Email: {email}</Card.Text>
							<Card.Text>
								Location: {location ? location : ""}
							</Card.Text>
							<Link
								to={`/users/${username}/edit`}
								className="btn btn-success"
							>
								Edit
							</Link>
							<Link
								className="btn btn-outline-danger mx-2"
								onClick={() => handleDelete()}
							>
								Delete Profile
							</Link>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Stack>
	);
};

export default UserCard;
