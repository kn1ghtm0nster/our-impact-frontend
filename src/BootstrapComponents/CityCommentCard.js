import countryCodes from "../helpers/CountryObject";

const CityCommentCard = ({
	cityName,
	countryCode,
	lat = null,
	long = null,
}) => {
	<div className="card" style={{ "maxWidth": "100rem" }}>
		<div className="row g-0">
			<div className="col-md-4">
				<img
					src="https://images.unsplash.com/photo-1519709042477-8de6eaf1fdc5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80"
					className="img-fluid rounded-start"
					alt="map-img"
				/>
			</div>
			<div className="col-md-8">
				<div className="card-body">
					<h5 className="card-title display-3">City: {cityName}</h5>
					<p className="card-text">
						<small className="text-muted">
							Country: {countryCodes[countryCode]}
						</small>
					</p>
				</div>
			</div>
		</div>
	</div>;
};

export default CityCommentCard;
