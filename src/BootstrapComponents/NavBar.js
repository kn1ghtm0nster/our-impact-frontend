import DefaultNav from "../singleComponents/DefaultNav";
import AuthNav from "../singleComponents/AuthNav";

const NavBar = ({ logout }) => {
	const currUser = JSON.parse(localStorage.getItem("user"));
	if (currUser?.username) {
		return <AuthNav logout={logout} username={currUser.username} />;
	} else {
		return <DefaultNav />;
	}
};

export default NavBar;
