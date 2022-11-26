import { useEffect, useState } from "react";
import CityCard from "../BootstrapComponents/CityCard";
import Spinner from "../BootstrapComponents/Spinner";

const Cities = ({ cities, title }) => {
	const [loaded, setLoaded] = useState(false);
	const [citiesArr, setCitiesArr] = useState([]);
	useEffect(() => {
		document.title = title;
		setCitiesArr(
			cities.map((city) => (
				<CityCard
					key={city.city_name}
					name={city.city_name}
					countryCode={city.country_code}
				/>
			)),
		);
		setLoaded(true);
		return () => {};
	}, [title, cities]);
	if (!loaded) {
		return <Spinner />;
	} else {
		return (
			<div>
				<h1 className="text-center my-5 text-white display-1">
					All Cities
				</h1>
				<ul>{citiesArr}</ul>
			</div>
		);
	}
};

export default Cities;
