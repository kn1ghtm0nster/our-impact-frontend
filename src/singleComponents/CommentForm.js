import { useState } from "react";
const CommentForm = ({ addNewCityComment, cityName }) => {
	const currUser = JSON.parse(localStorage.getItem("user"));
	const INITIAL_FORM_STATE = {
		commentText: "",
	};

	const [commentForm, setCommentForm] = useState(INITIAL_FORM_STATE);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCommentForm((data) => ({
			...data,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		const { commentText } = commentForm;

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
			setCommentForm(INITIAL_FORM_STATE);
		} catch (e) {
			console.log(e);
		}
		window.location.reload();
	};
	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="commentText">
				<b>New Comment</b>
			</label>
			<br />
			<textarea
				name="commentText"
				rows="5"
				cols="35"
				placeholder="Add new comment..."
				id="commentText"
				onChange={handleChange}
			/>
			<br />
			<button>Add Comment</button>
		</form>
	);
};

export default CommentForm;
