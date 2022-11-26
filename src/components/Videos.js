import { useEffect } from "react";
import ResourceCard from "../BootstrapComponents/ResourceCard";

const Videos = ({ videos, title }) => {
	useEffect(() => {
		document.title = title;
	}, [title]);

	const videosArr = videos.map((resource) => (
		<ResourceCard
			key={resource.id}
			id={resource.id}
			rating={resource.rating}
			title={resource.title}
			type={resource.type}
			url={resource.URL}
		/>
	));

	return (
		<div>
			<h1 className="text-center text-white text-center display-1">
				Climate Change Videos
			</h1>
			<p className="mb-5 text-white text-center">
				Welcome! This area of the appliacation contains video resources
				that can be viewed to learn more about the impact of climate
				change, what we are doing about it today, and what we are doing
				about it moving foward. There are videos for any and all age
				ranges so be aware of the rating tag before clicking on the
				link. Don't want to have young kids hearing colorful words do
				we?
			</p>

			<ul>{videosArr}</ul>
		</div>
	);
};

export default Videos;
