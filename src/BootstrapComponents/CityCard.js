import { Link } from "react-router-dom";
import { cityObject, countryCodes } from "../helpers/info";

const CityCard = ({ name, countryCode }) => {
	const defaultSrc =
		"https://images.unsplash.com/photo-1584824486539-53bb4646bdbc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
	return (
		<div
			className="card mb-3 mx-auto"
			style={{ maxWidth: "640px" }}
			id="blur-card"
		>
			<div className="row g-0">
				<div className="col-md-4">
					<img
						src={
							cityObject[name].image
								? cityObject[name].image
								: defaultSrc
						}
						className="img-fluid rounded-start"
						alt="flag-pic"
					/>
				</div>
				<div className="col-md-8">
					<div className="card-body">
						<h5 className="card-title">
							City:{" "}
							<Link
								to={`/cities/${name}`}
								exact="true"
								className="text-decoration-none"
							>
								{name}
							</Link>
						</h5>
						<p className="card-text">
							<small className="text-muted">
								Country: {countryCodes[countryCode]}
							</small>
						</p>
						<p className="card-text">
							Bio: {cityObject[name]?.bio || "please add bio omg"}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CityCard;
