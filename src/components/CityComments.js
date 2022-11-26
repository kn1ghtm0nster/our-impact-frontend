import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CommentCard from "../BootstrapComponents/CommentCard";
import NewCommentForm from "../BootstrapComponents/NewCommentForm";
import Spinner from "../BootstrapComponents/Spinner";
import { countryCodes } from "../helpers/CountryObject";
const CityComments = ({
	getAllCityData,
	addNewCityComment,
	deleteCityComment,
	getUserLikes,
	addLike,
	removeLike,
	commentLikes,
	setCommentLikes,
}) => {
	const currUser = JSON.parse(localStorage.getItem("user"));
	const { name } = useParams();
	const [loaded, setLoaded] = useState(false);
	const [city, setCity] = useState({});
	document.title = `${name} Comments`;

	useEffect(() => {
		(async () => {
			try {
				const res = await getAllCityData(name, currUser.token);
				setCity(res);
			} catch (err) {
				console.log(err);
			} finally {
				setLoaded(true);
			}
		})();
		return () => {};
	}, [currUser.token, getAllCityData, name]);

	if (!loaded) {
		return <Spinner />;
	} else {
		const allComments = city.comments;

		return (
			<div>
				<h1 className="display-1 text-center text-white">
					{city.city_name}, {countryCodes[city.country_code]}
				</h1>

				<NewCommentForm
					addNewCityComment={addNewCityComment}
					cityName={name}
				/>

				{allComments.length > 0 ? (
					<ul className="mt-4">
						{allComments.map((c) => (
							<CommentCard
								key={c.id}
								id={c.id}
								comment={c.comment}
								username={c.username}
								likes={c.likes}
								city={c.cityName}
								getUserLikes={getUserLikes}
								addLike={addLike}
								removeLike={removeLike}
								deleteCityComment={deleteCityComment}
								commentLikes={commentLikes}
								setCommentLikes={setCommentLikes}
							/>
						))}
					</ul>
				) : (
					<h4 className="text-center mt-4 text-white">
						No comments at this time. Add a new comment?
					</h4>
				)}
			</div>
		);
	}
};

// TODO: add ability to remove likes from comments. If user clicks on "like" link should change to be "remove like" instead which will ping backend and remove the like count. => POST DEPLOYMENT.

export default CityComments;
