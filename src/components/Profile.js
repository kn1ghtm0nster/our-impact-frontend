import { useEffect, useState } from "react";
import Spinner from "../BootstrapComponents/Spinner";
import UserCard from "../BootstrapComponents/UserCard";
import UserComment from "../BootstrapComponents/UserComment";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Profile = ({ getUser, deleteCityComment, deleteUser }) => {
	const currUser = JSON.parse(localStorage.getItem("user"));
	const [loaded, setLoaded] = useState(false);
	const [userInfo, setUserInfo] = useState({});

	document.title = `${currUser.username}'s Profile`;

	useEffect(() => {
		(async () => {
			try {
				const user = await getUser(currUser.username, currUser.token);
				setUserInfo(user);
			} catch (err) {
				console.log(err);
			} finally {
				setLoaded(true);
			}
		})();

		return () => {};
	}, [currUser.username, currUser.token, getUser]);

	if (!loaded) {
		return <Spinner />;
	} else {
		const allComments = userInfo.comments;
		return (
			<Row>
				<Col sm={12}>
					<div className="d-flex align-items-center vh-100 justify-content-center">
						<div>
							<UserCard
								username={userInfo.username}
								firstName={userInfo.firstName}
								lastName={userInfo.lastName}
								email={userInfo.email}
								location={userInfo.userCity}
								deleteUser={deleteUser}
							/>

							{allComments.length > 0 ? (
								<ul className="mt-4">
									{allComments.map((c) => (
										<UserComment
											key={c.id}
											id={c.id}
											text={c.text}
											cityName={c.cityName}
											likes={c.likes}
											deleteCityComment={
												deleteCityComment
											}
										/>
									))}
								</ul>
							) : (
								<h4 className="text-center">
									User has not posted.{" "}
								</h4>
							)}
						</div>
					</div>
				</Col>
			</Row>
		);
	}
};

export default Profile;
