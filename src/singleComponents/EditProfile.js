import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EditProfile = ({ getUser, updateUser }) => {
	const currUser = JSON.parse(localStorage.getItem("user"));
	const [formData, setFormData] = useState({});
	const [loaded, setLoaded] = useState(false);

	document.title = "Edit User";

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
		try {
			e.preventDefault();
			const results = await updateUser(
				currUser.username,
				{ firstName, lastName, email, userCity },
				currUser.token,
			);
			setFormData(results);
		} catch (err) {
			console.log(err);
		}
	};

	if (!loaded) {
		return <p>Loading...</p>;
	} else {
		return (
			<div>
				<h1>Edit form here</h1>
				<form onSubmit={handleSubmit}>
					<label htmlFor="firstName">First Name: </label>
					<input
						required
						type="text"
						name="firstName"
						value={formData.firstName}
						placeholder="First Name"
						onChange={handleChange}
						id="firstName"
					/>
					<br />
					<label htmlFor="lastName">Last Name: </label>
					<input
						required
						type="text"
						name="lastName"
						value={formData.lastName}
						placeholder="Last Name"
						onChange={handleChange}
						id="lastName"
					/>
					<br />
					<label htmlFor="email">Email: </label>
					<input
						required
						type="email"
						name="email"
						value={formData.email}
						placeholder="Email"
						onChange={handleChange}
						id="email"
					/>
					<br />
					<label htmlFor="userCity">City: </label>
					<input
						required
						type="text"
						name="userCity"
						value={formData.userCity || ""}
						placeholder="City Name"
						onChange={handleChange}
						id="userCity"
					/>
					<br />
					<button>Update Profile</button>
					<Link to={`/users/${currUser.username}`}>Cancel</Link>
				</form>
			</div>
		);
	}
};

export default EditProfile;
