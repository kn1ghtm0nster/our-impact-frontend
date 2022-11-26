import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EditComment = ({ getSingleComment, updateComment }) => {
	const currUser = JSON.parse(localStorage.getItem("user"));
	const { id } = useParams();
	const [comm, setComm] = useState({});
	const [loaded, setLoaded] = useState(false);

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

		try {
			e.preventDefault();
			const updated = await updateComment(
				{ id, commentText: comment, username, cityName },
				currUser.token,
			);
			setComm(updated);
		} catch (err) {
			console.log(err);
		}
	};

	if (!loaded) {
		return <p>Loading...</p>;
	} else {
		return (
			<div>
				<h1>Edit your comment</h1>
				<form onSubmit={handleSubmit}>
					<label htmlFor="comment">Edit Comment:</label>
					<br />
					<textarea
						name="comment"
						value={comm.comment}
						rows="5"
						cols="35"
						id="comment"
						onChange={handleChange}
					/>
					<br />
					<button>Update</button>
					<Link to={`/cities/${comm.cityName}/comments`}>Cancel</Link>
				</form>
			</div>
		);
	}
};

export default EditComment;
