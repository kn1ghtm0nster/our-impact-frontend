import { Link } from "react-router-dom";
const DefaultNav = () => {
	return (
		<nav
			className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark"
			id="blur-nav"
		>
			<div className="container-fluid">
				<Link to="/" exact="true" className="navbar-brand">
					<i className="bi bi-globe-europe-africa" id="home-icon"></i>
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav me-auto">
						<li className="nav-item">
							<Link to="/about" exact="true" className="nav-link">
								About
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to="/resources"
								exact="true"
								className="nav-link"
							>
								Resources
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to="/cities"
								exact="true"
								className="nav-link"
							>
								Cities
							</Link>
						</li>
					</ul>
					<ul className="navbar-nav">
						<div className="d-flex">
							<li className="nav-item me-2">
								<Link
									to="/login"
									exact="true"
									className="nav-link link-primary"
								>
									Login
								</Link>
							</li>
							<li className="nav-item me-2">
								<Link
									to="/signup"
									exact="true"
									className="nav-link link-info"
								>
									Signup
								</Link>
							</li>
						</div>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default DefaultNav;
