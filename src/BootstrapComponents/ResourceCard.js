const ResourceCard = ({ rating, title, type, url }) => {
	return (
		<div className="card w-50 my-3 mx-auto individual-card">
			<div className="card-body">
				<h5 className="card-title">
					<b>{title}</b>
				</h5>
				<p className="card-text">
					Rating:{" "}
					{rating === "MATURE" ? (
						<span className="badge text-bg-danger">{rating}</span>
					) : (
						<span className="badge text-bg-warning">{rating}</span>
					)}
				</p>
				<a
					href={url}
					target="_blank"
					rel="noreferrer"
					className="btn btn-primary"
				>
					View {type}
				</a>
			</div>
		</div>
	);
};

export default ResourceCard;
