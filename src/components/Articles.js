import { useEffect } from "react";
import ResourceCard from "../BootstrapComponents/ResourceCard";

const Articles = ({ articles, title }) => {
	useEffect(() => {
		document.title = title;
	}, [title]);
	const articlesArr = articles.map((resource) => (
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
				Climate Change Articles
			</h1>
			<p className="mb-5 text-white text-center">
				{" "}
				If you're looking for a deeper understanding of climate change
				rather than watching lengthy videos, then you've come to the
				right place! These links contain articles from respected sources
				around the world on how different parts of the globe are being
				impacted by climate change of all kinds from polution to weather
				events and more.
			</p>

			<ul>{articlesArr}</ul>
		</div>
	);
};

export default Articles;
