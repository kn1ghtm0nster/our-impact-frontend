import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../BootstrapComponents/Spinner";

import { countryCodes, cityObject } from "../helpers/info";

const SingleCityView = ({ weatherData, getSingleCity }) => {
	const currUser = JSON.parse(localStorage.getItem("user"));
	const { name } = useParams();
	document.title = `${name}`;
	const [loading, setLoading] = useState(true);
	const [city, setCity] = useState({});
	const [cityWeather, setCityWeather] = useState({});

	const airQualityObj = {
		1: "Good",
		2: "Fair",
		3: "Moderate",
		4: "Poor",
		5: "Very Poor",
	};

	useEffect(() => {
		let loadingFlag = false;
		const getCity = async () => {
			try {
				let res = await getSingleCity(name);
				setCity(res);
				if (!loadingFlag) {
					setLoading(false);
				}
			} catch (err) {
				console.log(err);
			}
		};

		getCity();

		for (let item of weatherData) {
			if (item.cityName === name) {
				setCityWeather(item);
			}
		}

		return () => {
			loadingFlag = true;
		};
	}, [name, getSingleCity, weatherData]);

	if (loading) {
		return <Spinner />;
	}

	return (
		<div className="d-flex vh-100 align-items-center justify-content-center">
			<div className="card" style={{ width: "40rem" }} id="blur-card">
				<div className="row g-0">
					<div className="col-md-4 d-flex align-items-center border-end border-dark">
						<div className="card-body">
							<p className="card-text text-center">
								Temp Outlook
							</p>
							<p className="card-text text-center">
								{cityWeather.maxTempCel || 0} &#8451;
								<br />
								<small className="text-muted">
									{cityWeather.minTempCel || 0} &#8451;
								</small>
							</p>
							<p className="card-text text-center">
								{cityWeather.maxTempFar || 0} &#8457;
								<br />
								<small className="text-muted text-info">
									{cityWeather.minTempFar || 0} &#8457;
								</small>
							</p>
						</div>
					</div>
					<div className="col-md-8 d-flex align-items-center">
						<div className="card-body">
							<h5 className="card-title">
								City: {city.city_name}
							</h5>
							<p className="card-text">
								<small className="text-muted">
									Country: {countryCodes[city.country_code]}
								</small>
							</p>
							<p className="card-text">
								Latest Conditions: {cityWeather.currTempCel}{" "}
								&#8451; / {cityWeather.currTempFar} &#8457;
							</p>
							<p className="card-text">
								Air Quality:{" "}
								{`${airQualityObj[cityWeather.airQuality]}`}
							</p>
							<p className="card-text">
								Population: {cityObject[name].population}
							</p>
							{currUser ? (
								<Link
									to={`/cities/${name}/comments`}
									className="btn btn-primary"
								>
									Comments
								</Link>
							) : (
								<p className="card-text">
									You must be logged in to view comments. You
									can log in <Link to="/login">Here!</Link>
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleCityView;
