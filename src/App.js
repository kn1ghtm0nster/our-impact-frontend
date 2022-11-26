import ExpressApi from "./api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import AllRoutes from "./routes/AllRoutes";
import NavBar from "./BootstrapComponents/NavBar";
import Spinner from "./BootstrapComponents/Spinner";
import "./App.css";

function App() {
	const navigate = useNavigate();

	// keeping state to show loading message on page first load.
	const [loading, setLoading] = useState(false);

	// setting state for all cities on page first load instead of calling the backend routes every single time
	const [cities, setCities] = useState([]);
	// setting state for all resources on page first load instead of calling the backend routes every single time.
	const [resources, setResources] = useState([]);
	// setting state for all videos on page first load instead of calling the backend routes every single time.
	const [videos, setVideos] = useState([]);
	// setting state for all articles on page first load instead of calling the backend routes every single time.
	const [articles, setArticles] = useState([]);
	// setting state for all landing pages on page first load instead of calling the backend routes every single time.
	const [landingPages, setLandingPages] = useState([]);
	// setting state to get the likes from all comments on the backend so we don't have to reload the page whenever a user likes a comment on the frontend.
	const [commentLikes, setCommentLikes] = useState([]);
	// keeping track of the current logged in user via state.
	const [currUserToken, setCurrentUserToken] = useState({});
	// keeping track of current weather information using state.
	const [weatherData, setWeatherData] = useState([]);

	// using useEffect hook to set the localStorage object whenever the currUserToken state is updated (user is logged in or out)
	useEffect(() => {
		if (currUserToken.username) {
			localStorage.setItem(
				"user",
				JSON.stringify({
					username: currUserToken.username,
					token: currUserToken.token.token,
					comments: currUserToken.comments || [],
				}),
			);
			setLoading(false);
		}

		return () => {};
	}, [currUserToken]);

	// useEffect hoook is responsible for getting all the cities from backend whenever the first page loads and only then.
	useEffect(() => {
		const getCities = async () => {
			const allCities = await ExpressApi.getAllCities();
			setCities(allCities);
		};

		const getResources = async () => {
			const allResources = await ExpressApi.getAllResources();
			setResources(allResources);
		};

		const getVideos = async () => {
			const allVideos = await ExpressApi.getAllVideos();
			setVideos(allVideos);
		};

		const getArticles = async () => {
			const allArticles = await ExpressApi.getAllArticles();
			setArticles(allArticles);
		};

		const getLandingPages = async () => {
			const allLandingPages = await ExpressApi.getLandingPages();
			setLandingPages(allLandingPages);
		};

		const getLikes = async () => {
			const allCommentLikes = await ExpressApi.getAllLikes();
			setCommentLikes(allCommentLikes);
		};

		const allWeather = async () => {
			const weather = await ExpressApi.getWeatherData();

			setWeatherData(weather);
		};

		getCities();
		getResources();
		getVideos();
		getArticles();
		getLandingPages();
		getLikes();
		allWeather();

		return () => {};
	}, []);

	// Async method to register a new user that will be passed in as a prop to the correct route / component. Method also sets the localStorage object once a new user is created.
	const register = async (username, password, firstName, lastName, email) => {
		try {
			let newUser = await ExpressApi.resgisterNewUser({
				username,
				password,
				firstName,
				lastName,
				email,
			});

			setCurrentUserToken({ username, token: newUser });
			setLoading(true);
			navigate("/");
		} catch (err) {
			throw new Error(err);
		}
	};

	// Async method to log a user in and set the localStorage object which will include the user's comments.
	const login = async (username, password) => {
		try {
			const loggedInUser = await ExpressApi.authenticateUser({
				username,
				password,
			});

			const userComments = await ExpressApi.getUser(
				username,
				loggedInUser.token,
			);
			setLoading(true);
			setCurrentUserToken({
				username,
				token: loggedInUser,
				comments: userComments.comments || [],
			});
			navigate("/");
		} catch (err) {
			throw new Error(err[0]);
		}
	};

	// Async method to handle logging a user out. Method clears the currUser state and localStorage objects then routes users back to the home page.
	const userLogout = () => {
		setCurrentUserToken({});
		localStorage.clear();
		navigate("/");
	};

	// Async method to get all user information from the user that is logged in.
	const getUser = async (username, token) => {
		try {
			const foundUser = await ExpressApi.getUser(username, token);

			return foundUser;
		} catch (err) {
			throw new Error(err);
		}
	};

	// Async method to update a user based on the information that is passed through the user edit form.
	const updateUser = async (username, data, token) => {
		try {
			await ExpressApi.updateUser(username, data, token);
			navigate(`/users/${username}`);
		} catch (err) {
			throw new Error(err);
		}
	};

	// Async method to delete a user from the backend database which also resets the localStorage object and the currUser object for state then pushes the user back to the main home route.
	const deleteUser = async (username, token) => {
		try {
			await ExpressApi.deleteUser(username, token);
			setCurrentUserToken({});
			localStorage.clear();
			console.log(JSON.parse(localStorage.getItem("user")));
			navigate("/");
		} catch (err) {
			throw new Error(err);
		}
	};

	// Async method to get the base information for a given city.
	const getSingleCity = async (name) => {
		try {
			const city = await ExpressApi.getSingleCity(name);

			return city;
		} catch (err) {
			throw new Error(err);
		}
	};

	// Async method to get ALL city information including the city comments which ONLY for authenticated users to see and access.
	const allCityData = async (name, token) => {
		try {
			const allData = await ExpressApi.getAllCityData(name, token);
			return allData;
		} catch (err) {
			throw new Error(err);
		}
	};

	// Async method to add a new comment to the city the user is viewing on the frontend which will reload the page once the data has been added to the database.
	const addNewCityComment = async (data, token) => {
		try {
			const newComment = await ExpressApi.newCityComment(data, token);
			let currComments = JSON.parse(localStorage.getItem("user"));
			let updatedArray = currComments["comments"];
			updatedArray.push({
				id: newComment.comment_id,
				text: newComment.comment,
				cityName: newComment.cityName,
				likes: newComment.likes,
			});
			currComments["comments"] = updatedArray;
			localStorage.setItem("user", JSON.stringify(currComments));
			return newComment;
		} catch (err) {
			throw new Error(err);
		}
	};

	// Async method to get a single comment from the backend database which will be used in the edit frontend route for the users to edit if they wish to make changes.
	const getSingleComment = async (id, token) => {
		try {
			const comment = await ExpressApi.getSingleComment(id, token);
			return comment;
		} catch (err) {
			throw new Error(err);
		}
	};

	// Async method to take updated information from frontend edit route and send changes to the backend db.
	const updateComment = async (data, token) => {
		try {
			await ExpressApi.updateCityComment(data, token);
			navigate(`/cities/${data.cityName}/comments`);
		} catch (err) {
			throw new Error(err);
		}
	};

	const updateCommentFromUserProfile = async (data, token) => {
		try {
			await ExpressApi.updateCityComment(data, token);
			navigate(`/users/${data.username}`);
		} catch (err) {
			throw new Error(err);
		}
	};

	// Async method to delete a city comment which will ONLY be allowed for the same username that created the comment.
	const deleteCityComment = async (data, token) => {
		try {
			const deleted = await ExpressApi.deleteCityComment(data, token);
			let currComments = JSON.parse(localStorage.getItem("user"));
			let newCommentArray = [];
			for (let object of currComments["comments"]) {
				if (object.id !== +deleted) {
					newCommentArray.push(object);
				}
			}
			currComments["comments"] = newCommentArray;
			localStorage.setItem("user", JSON.stringify(currComments));
			window.location.reload();
			return deleted;
		} catch (err) {
			throw new Error(err);
		}
	};

	// Async method to get the likes for a given user so they can populate on the frontend
	const getUserLikes = async (username, token) => {
		try {
			const userLikes = await ExpressApi.getUserLikes(username, token);
			return userLikes;
		} catch (err) {
			throw new Error(err);
		}
	};

	// Async method to add one like to a user comment from the frontend. No page reload is processed since the likes are maintained through state from the App component to the comment comment component itself.
	const addLike = async (commentId, token) => {
		try {
			const res = await ExpressApi.addLike(commentId, token);
			setCommentLikes([
				...commentLikes,
				{ id: res.id, commentId: res.comment_id },
			]);
			return res;
		} catch (err) {
			throw new Error(err);
		}
	};

	// TODO: add functionality to have ONE liked removed from the comment once the button is clicked instead of ALL likes.
	// Async method to remove a comment like. THIS METHOD IS NOT YET SUPPORTED
	const subtractLike = async (commentId, token) => {
		try {
			const res = await ExpressApi.removeLike(commentId, token);
			return res;
		} catch (err) {
			throw new Error(err);
		}
	};

	// condition to show laoding message if the loading vairable is true otherwise display page contents.
	if (loading) {
		return <Spinner />;
	}

	// render the NavBar component with the logout option and pass all the methods & pieces of state to the AllRoutes component for single components to use.
	return (
		<div>
			<NavBar logout={userLogout} />

			<div className="container">
				<AllRoutes
					cities={cities}
					resources={resources}
					videos={videos}
					articles={articles}
					landingPages={landingPages}
					weatherData={weatherData}
					registerUser={register}
					login={login}
					getUser={getUser}
					updateUser={updateUser}
					deleteUser={deleteUser}
					getSingleCity={getSingleCity}
					getAllCityData={allCityData}
					addNewCityComment={addNewCityComment}
					getSingleComment={getSingleComment}
					updateComment={updateComment}
					updateCommentFromUserProfile={updateCommentFromUserProfile}
					deleteCityComment={deleteCityComment}
					getUserLikes={getUserLikes}
					addLike={addLike}
					removeLike={subtractLike}
					commentLikes={commentLikes}
					setCommentLikes={setCommentLikes}
				/>
			</div>
		</div>
	);
}

// POST DEPLOYMENT TASKS:
// TODO: Add new property on localStorage for tracking the logged in user's current likes to populate on the comments route and use a filled in like icon instead of outlined. => POST DEPLOYMENT.
// TODO: make all routes mobile friendly!
export default App;
