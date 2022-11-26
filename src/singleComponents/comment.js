import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Comment = ({
	id,
	comment,
	username,
	likes,
	city,
	getUserLikes,
	addLike,
	removeLike,
	deleteCityComment,
	commentLikes,
	setCommentLikes,
}) => {
	const currUser = JSON.parse(localStorage.getItem("user"));
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				await getUserLikes(currUser.username, currUser.token);
			} catch (err) {
				console.log(err);
			} finally {
				setLoaded(true);
			}
		})();

		return () => {
			setTimeout(function () {
				return null;
			}, 1000);
		};
	}, [getUserLikes, currUser.token, currUser.username]);

	const handleAddLike = async (e) => {
		try {
			const update = await addLike(id, currUser.token);
			setCommentLikes([...commentLikes, update]);
		} catch (err) {
			console.log(err);
		}
	};

	// TODO: add functionality to remove likes POST completion.

	const handleDelete = async (e) => {
		try {
			await deleteCityComment(
				{ id, city, username: currUser.username },
				currUser.token,
			);
		} catch (err) {
			console.log(err);
		}
	};

	if (!loaded) {
		return <p>Loading...</p>;
	}

	if (currUser.username !== username) {
		return (
			<li key={id}>
				<p>
					<b>Comment: </b> {comment}
				</p>
				<sub>
					<b>User: </b> {username}
				</sub>
				<p>
					<b>Likes: </b>
					{likes}
				</p>
				<button onClick={handleAddLike}>Like</button>

				<br />
			</li>
		);
	} else {
		return (
			<li key={id}>
				<p>
					<b>Comment: </b> {comment}
				</p>
				<sub>
					<b>User: </b> {username}
				</sub>
				<p>
					<b>Likes: </b>
					{likes}
				</p>
				<Link to={`/cities/${city}/comments/edit/${id}`}>Edit</Link>
				<br />
				<button onClick={handleDelete}>Delete</button>
			</li>
		);
	}
};

export default Comment;
