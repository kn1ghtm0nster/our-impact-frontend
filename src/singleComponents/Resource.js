const Resource = ({ id, rating, title, type, url }) => {
	return (
		<div>
			<h3>Title: {title}</h3>
			<h4>Rating: {rating}</h4>
			<h5>
				Link:{" "}
				<a href={url} target="_blank" rel="noreferrer">
					{type}
				</a>
			</h5>
		</div>
	);
};

export default Resource;
