import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

const CommentCard = ({
	id,
	comment,
	username,
	likes,
	city,
	addLike,
	getUserLikes,
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

	if (!loaded) {
		return <Spinner />;
	}

	const handleAddLike = async (e) => {
		try {
			const update = await addLike(id, currUser.token);
			setCommentLikes([...commentLikes, update]);
		} catch (err) {
			console.log(err);
		}
	};

	const handleDeleteComment = async (e) => {
		try {
			await deleteCityComment(
				{ id, city, username: currUser.username },
				currUser.token,
			);
		} catch (err) {
			console.log(err);
		}
	};

	if (currUser.username !== username) {
		return (
			<div className="d-flex justify-content-center">
				<div className="card w-50 my-2" id="blur-card">
					<div className="card-body">
						<p className="card-text">
							<b>Comment: </b>
							{comment}
						</p>
						<p className="card-text">
							<small className="text-muted">
								<b>Posted by: </b> {username}
							</small>
						</p>
						<p className="card-text">
							<b>Likes: </b>
							{likes}
						</p>

						<Link onClick={handleAddLike}>
							<i className="bi bi-hand-thumbs-up fs-3"></i>
						</Link>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="d-flex justify-content-center">
				<div className="card w-50 my-2" id="blur-card">
					<div className="card-body">
						<p className="card-text">
							<b>Comment: </b>
							{comment}
							<br />
							<small className="text-muted">
								<b>User: </b> {username}
							</small>
						</p>
						<p className="card-text">
							<b>Likes: </b>
							{likes}
						</p>

						<Link
							className="btn btn-success"
							to={`/cities/${city}/comments/edit/${id}`}
						>
							Edit
						</Link>

						<button
							className="btn btn-outline-danger ms-2"
							onClick={handleDeleteComment}
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		);
	}
};

export default CommentCard;
