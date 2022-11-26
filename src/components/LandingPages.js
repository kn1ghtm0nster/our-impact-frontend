import { useEffect } from "react";

import ResourceCard from "../BootstrapComponents/ResourceCard";

const LandingPages = ({ landingPages, title }) => {
	useEffect(() => {
		document.title = title;
	}, [title]);
	const landingPagesArr = landingPages.map((resource) => (
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
			<h1 className="text-center text-white display-1">
				{" "}
				Educational Resources
			</h1>
			<p className="mb-5 text-center text-white">
				For all my educator friends (I have a few of them out there),
				this route was created for you! The main focus is providing you
				with access to different sites that contain resources for
				educators to teach Climate Change and its impact for all grades.
				Some of these pages also include worksheets or small quizes!
			</p>

			<ul>{landingPagesArr}</ul>
		</div>
	);
};

export default LandingPages;
