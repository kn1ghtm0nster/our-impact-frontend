import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Resources from "../components/Resources";
import About from "../components/About";
import Cities from "../components/Cities";
import SingleCityView from "../components/SingleCityView";
import CityComments from "../components/CityComments";
import EditCommentForm from "../BootstrapComponents/EditCommentForm";
import Videos from "../components/Videos";
import Articles from "../components/Articles";
import LandingPages from "../components/LandingPages";
import Profile from "../components/Profile";
import EditProfileForm from "../BootstrapComponents/EditProfileForm";
import EditUserCommentForm from "../BootstrapComponents/EditUserCommentForm";
// import NotFound from "../components/NotFound";

const AllRoutes = ({
	cities,
	resources,
	videos,
	articles,
	landingPages,
	weatherData,
	registerUser,
	login,
	getUser,
	updateUser,
	deleteUser,
	getSingleCity,
	getAllCityData,
	addNewCityComment,
	getSingleComment,
	updateComment,
	updateCommentFromUserProfile,
	deleteCityComment,
	getUserLikes,
	addLike,
	removeLike,
	commentLikes,
	setCommentLikes,
}) => {
	const currUser = JSON.parse(localStorage.getItem("user"));
	return (
		<div>
			<Routes>
				<Route path="/" element={<Home title="Home" />} />
				<Route path="/about" element={<About title="About" />} />
				<Route
					path="/resources"
					element={
						<Resources resources={resources} title="Resources" />
					}
				/>
				<Route
					path="/resources/videos"
					element={<Videos videos={videos} title="Videos" />}
				/>
				<Route
					path="/resources/articles"
					element={<Articles articles={articles} title="Articles" />}
				/>
				<Route
					path="/resources/landingPages"
					element={
						<LandingPages
							landingPages={landingPages}
							title="Landing Pages"
						/>
					}
				/>
				<Route
					path="/cities"
					element={<Cities cities={cities} title="Cities" />}
				/>
				<Route
					path="/cities/:name"
					element={
						<SingleCityView
							weatherData={weatherData}
							getSingleCity={getSingleCity}
						/>
					}
				/>
				<Route
					path="/cities/:name/comments"
					element={
						currUser?.username ? (
							<CityComments
								getAllCityData={getAllCityData}
								addNewCityComment={addNewCityComment}
								deleteCityComment={deleteCityComment}
								getUserLikes={getUserLikes}
								addLike={addLike}
								removeLike={removeLike}
								commentLikes={commentLikes}
								setCommentLikes={setCommentLikes}
							/>
						) : (
							<Navigate to="/signup" />
						)
					}
				/>
				<Route
					path="/cities/:name/comments/edit/:id"
					element={
						currUser?.username ? (
							<EditCommentForm
								getSingleComment={getSingleComment}
								updateComment={updateComment}
							/>
						) : (
							<Navigate to="/signup" />
						)
					}
				/>
				<Route
					path="/users/:username"
					element={
						currUser?.username ? (
							<Profile
								getUser={getUser}
								deleteCityComment={deleteCityComment}
								deleteUser={deleteUser}
							/>
						) : (
							<Navigate to="/signup" />
						)
					}
				/>
				<Route
					path="/users/:username/comments/edit/:id"
					element={
						currUser?.username ? (
							<EditUserCommentForm
								getSingleComment={getSingleComment}
								updateUserComment={updateCommentFromUserProfile}
							/>
						) : (
							<Navigate to="/signup" />
						)
					}
				/>
				<Route
					path="/users/:username/edit"
					element={
						currUser?.username ? (
							<EditProfileForm
								getUser={getUser}
								updateUser={updateUser}
								cities={cities}
							/>
						) : (
							<Navigate to="/signup" />
						)
					}
				/>

				<Route
					path="/signup"
					element={
						<Signup registerUser={registerUser} title="Signup" />
					}
				/>
				<Route
					path="/login"
					element={<Login login={login} title="Login" />}
				/>

				{/* <Route>
					<NotFound />
				</Route> */}
			</Routes>
		</div>
	);
};

export default AllRoutes;
