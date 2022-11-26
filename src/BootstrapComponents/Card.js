import { Link } from "react-router-dom";

const Card = ({ name, link, source }) => {
	return (
		<div className="card h-100" style={{ width: "18rem" }}>
			<img src={source} alt="test-pic" />
			<div className="card-body">
				<h5 className="card-title text-center">
					{" "}
					<Link
						to={`/resources/${link}`}
						exact="true"
						className="card-link text-decoration-none"
					>
						{name}
					</Link>
				</h5>
				<p className="card-text">
					The Link above will take you to the page that contains more
					information about Climate Change.
				</p>
			</div>
		</div>
	);
};

export default Card;
