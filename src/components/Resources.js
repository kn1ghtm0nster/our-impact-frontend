import { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import "../styles/ResourcesStyles.css";

const Resources = ({ title }) => {
	useEffect(() => {
		document.title = title;
	}, [title]);
	return (
		<div>
			<div className="d-flex align-items-center justify-content-center">
				<div>
					<h1 className="text-center text-white mt-3">
						Educational Resources!
					</h1>
					<p className="mt-3 text-white text-center">
						Whether you're an educator looking for good Climate
						Change topics to cover or a student looking to learn
						more about the tasks we are facing to correct this
						issue, there are serveral links that have been provided
						in each of the links below.
						<br />
						PS:{" "}
						<b>
							You don't need an account to access these resources.
						</b>
					</p>
					<CardGroup className="main-card">
						<Card
							style={{ width: "18rem" }}
							className="individual-card"
						>
							<Card.Img
								variant="top"
								src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6"
							/>
							<Card.Body>
								<Card.Title className="text-center">
									<Link
										to="/resources/landingPages"
										exact="true"
										className="card-link text-decoration-none"
									>
										Educational Resources
									</Link>
								</Card.Title>
								<Card.Text>
									The link above will take you to a page that
									contains links to educational resources for
									teachers to use!
								</Card.Text>
							</Card.Body>
						</Card>
						<Card
							style={{ width: "18rem" }}
							className="individual-card"
						>
							<Card.Img
								variant="top"
								src="https://images.unsplash.com/photo-1495020689067-958852a7765e"
							/>
							<Card.Body>
								<Card.Title className="text-center">
									<Link
										to="/resources/articles"
										exact="true"
										className="card-link text-decoration-none"
									>
										Articles
									</Link>
								</Card.Title>
								<Card.Text>
									The link above will take you to a page that
									contains articles related to climate change
									and how it's impacting that region of the
									world.
								</Card.Text>
							</Card.Body>
						</Card>
						<Card
							style={{ width: "18rem" }}
							className="individual-card"
						>
							<Card.Img
								variant="top"
								src="https://images.unsplash.com/photo-1611162616475-46b635cb6868"
							/>
							<Card.Body>
								<Card.Title className="text-center">
									<Link
										to="/resources/videos"
										exact="true"
										className="card-link text-decoration-none"
									>
										Videos
									</Link>
								</Card.Title>
								<Card.Text>
									The link above will take you to a page that
									contains videos related to climate change
									and how it's impacting that region of the
									world. <b>WARNING!</b> Some content may not
									be suitable for children under 18.
								</Card.Text>
							</Card.Body>
						</Card>
					</CardGroup>
				</div>
			</div>
		</div>
	);
};

export default Resources;
