import { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = ({ title }) => {
	const currUser = JSON.parse(localStorage.getItem("user"));
	useEffect(() => {
		document.title = title;
	}, [title]);
	return (
		<div>
			<h1 className="mt-4 display-1 text-center text-white">
				Our Impact
			</h1>
			<div className="d-flex vh-100 align-items-end justify-content-center">
				<div className="mb-5">
					<p className="text-center text-white">
						Our actions have impacted the planet for many years and
						now, we are feeling the effects all over world. Join us,
						learn, listen, and contribute to conversations from
						users all around the world who live in these cities and
						are sharing their experiences from long droughts to
						extreme weather patterns.
					</p>
					<div className="d-flex justify-content-center">
						{currUser?.username ? (
							<Link to="/resources" className="btn btn-primary">
								Learn More
							</Link>
						) : (
							<Link to="/signup" className="btn btn-primary">
								Sign Up!
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
