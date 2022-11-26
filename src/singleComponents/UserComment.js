import { Link } from "react-router-dom";

const UserComment = ({ id, text, cityName, likes, deleteCityComment }) => {
	const currUser = JSON.parse(localStorage.getItem("user"));

	const handleDelete = async () => {
		try {
			await deleteCityComment(
				{ id, cityName, username: currUser.username },
				currUser.token,
			);
		} catch (err) {
			console.log(err);
		}
		window.location.reload();
	};

	return (
		<li>
			<p>
				<b>Comment: </b>
				{text}
			</p>

			<p>
				<b>City: </b>
				{cityName}
			</p>

			<p>
				<b>Likes: </b>
				{likes}
			</p>

			<Link to={`/cities/${cityName}/comments/edit/${id}`}>Edit</Link>
			<br />
			<button onClick={handleDelete}>Delete</button>
		</li>
	);
};

export default UserComment;
