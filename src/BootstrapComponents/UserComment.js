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
		<div className="card w-75 my-2 mx-auto" id="blur-card">
			<div className="card-body">
				<p className="card-text">
					<b>Comment: </b>
					{text}
				</p>
				<p className="card-text">
					<b>Likes: </b>
					{likes}
				</p>

				<Link
					className="btn btn-success"
					to={`/users/${currUser.username}/comments/edit/${id}`}
				>
					Edit
				</Link>

				<button
					onClick={handleDelete}
					className="btn btn-outline-danger ms-2"
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default UserComment;
