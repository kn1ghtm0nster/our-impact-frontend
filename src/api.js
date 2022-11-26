import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class ExpressApi {
	// storing the token received from the backend routes to be stored on the frontend for authentication.
	static token;

	// Main method for setting up the backend request and setting the headers & params.
	// method will only be called on the class itself never through instances.
	static async request(endpoint, data = {}, method = "get") {
		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${ExpressApi.token}` };
		const params = method === "get" ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.error("API Error: ", err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [message];
		}
	}

	/**
	 * Main method for getting ALL cities from backend db. Will run on page load.
	 *
	 * @returns {array} [{city_name, country_code, lat, lon}, ...]
	 */
	static async getAllCities() {
		const res = await this.request(`cities`);
		return res.cities;
	}

	/**
	 * Main method for getting ALL resources from backend db. Will run on page load.
	 *
	 * @returns {array} [{id, title, url, type, rating}, ...]
	 */
	static async getAllResources() {
		const res = await this.request(`resources`);
		return res.resources;
	}

	/**
	 * Main method for getting ALL video types from backend db. Will run on page load.
	 *
	 * @returns {array} [{id, title, url, type, rating}, ...]
	 */
	static async getAllVideos() {
		const res = await this.request("resources/videos");
		return res.videos;
	}

	/**
	 * Main method for getting ALL articles from backend db. Will run on page load.
	 *
	 * @returns {array} [{id, title, url, type, rating}, ...]
	 */
	static async getAllArticles() {
		const res = await this.request("resources/articles");
		return res.articles;
	}

	/**
	 * Main method for getting ALL landing pages from backend db. Will run on page load.
	 *
	 * @returns {array} [{id, title, url, type, rating}, ...]
	 */
	static async getLandingPages() {
		const res = await this.request("resources/additional-resources");
		return res.landingPages;
	}

	/**
	 * Main method for authenticating an logging a user in to the application. Will return  the user token for authentication to view pages that require it.
	 *
	 * @param {object} data
	 * @returns {object} {token}
	 */
	static async authenticateUser(data) {
		const res = await this.request(`auth/token`, data, "post");
		ExpressApi.token = res.token;
		return { token: res.token };
	}

	/**
	 * Main method for registering a new user to the application. Will return the user token for authentication to view all pages that require it.
	 *
	 * @param {object} data
	 * @returns {object} {token}
	 */
	static async resgisterNewUser(data) {
		const res = await this.request(`auth/register`, data, "post");
		ExpressApi.token = res.token;
		return res;
	}

	/**
	 * Main method for getting information about a specific username including the comments that they have left for cities in applicaiton.
	 *
	 * @param {string} username
	 * @param {string} token
	 * @returns {object} {username, firstName, lastName, email, userCity, comments}
	 * 	WHERE comments = [{id, comment, likes}, ...]
	 */
	static async getUser(username, token) {
		ExpressApi.token = token;
		const res = await this.request(`users/${username}`);
		return res.user;
	}

	/**
	 * Method for handling updates for a user profile. Not all data will be updated from frontend but the information returned will be populated on user edit form once changes are submitted.
	 *
	 * @param {string} username
	 * @param {object} data
	 * @param {string} token
	 * @returns {object} {username, firstName, lastName, email, cityName}
	 */
	static async updateUser(username, data, token) {
		ExpressApi.token = token;
		const res = await this.request(`users/${username}`, data, "patch");
		return res.user;
	}

	/**
	 * Method removes a user from the backend db. This method can only be called by the same user or an admin
	 *
	 * @param {string} username
	 * @param {string} token
	 * @returns {void}
	 */
	static async deleteUser(username, token) {
		ExpressApi.token = token;
		const res = await this.request(`users/${username}`, {}, "delete");

		return res.username;
	}

	/**
	 * Method for getting data for a specific city name.
	 *
	 * @param {string} name
	 * @returns {object} {city_name, country_code, lat, lon}
	 */
	static async getSingleCity(name) {
		const res = await this.request(`cities/${name}`, {}, "get");
		return res.city;
	}

	/**
	 * Main method for viewing ALL data for a specific city name. Can only be viewed for users that have a registered account.
	 *
	 * @param {string} cityName
	 * @param {string} token
	 * @returns {object} {city_name, country_code, lat, lon, comments}
	 * 	WHERE comments = [{id, comment, username, cityName, likes}, ...]
	 */
	static async getAllCityData(cityName, token) {
		ExpressApi.token = token;
		const res = await this.request(
			`cities/${cityName}/comments`,
			{},
			"get",
		);
		return res.cityData;
	}

	/**
	 * Main method for a logged in user to add a new comment to the specified city using their token and data from the frontend form.
	 *
	 * @param {object} data
	 * @param {string} token
	 * @returns {object} {comment_id, comment, username, cityName, likes}
	 */
	static async newCityComment(data, token) {
		ExpressApi.token = token;
		const { commentText, author, locationName } = data;
		const res = await this.request(
			`cities/${locationName}/comments/new`,
			{ commentText, author, locationName },
			"post",
		);
		return res.comment;
	}

	/**
	 * Main method for making edits to a user's comment. This method can only be called by the same username for that comment or an admin type user.
	 *
	 * @param {object} data
	 * @param {string} token
	 * @returns {string} "updatedComment"
	 */
	static async updateCityComment(data, token) {
		ExpressApi.token = token;
		const { id, commentText, username, cityName } = data;

		const res = await this.request(
			`cities/${cityName}/${username}/comments/edit/${id}`,
			{ commentText },
			"patch",
		);
		return res.updated;
	}

	/**
	 * Main method for removing a user comment from the backend database. This method can only be used by users who are authenticated.
	 *
	 * @param {object} data
	 * @param {string} token
	 * @returns {object} {"id"}
	 */
	static async deleteCityComment(data, token) {
		ExpressApi.token = token;
		const { id, cityName, username } = data;

		const res = await this.request(
			`cities/${cityName}/${username}/comments/delete/${id}`,
			{ id },
			"delete",
		);

		return res.deleted;
	}

	/**
	 * Main method for getting a user's list of liked comments to track on the frontend. Method can only be called once a user is authenticated.
	 *
	 * @param {string} username
	 * @param {string} token
	 * @returns {array} [{id, commentId, fromUser}]
	 */
	static async getUserLikes(username, token) {
		ExpressApi.token = token;
		const res = await this.request(`likes/${username}`);
		return res.userLikes;
	}

	/**
	 * Main method for getting ALL likes from backend db for a specific city name. Method only runs for user that are already authenticated.
	 *
	 * @returns {array} [{id, commentId, username, fromUser}, ...]
	 */
	static async getAllLikes() {
		const res = await this.request("likes");
		return res.allLikes;
	}

	/**
	 * Main method for adding a like to a user comment. Can only be called once a user is authenticated.
	 *
	 * @param {number} commentId
	 * @param {string} token
	 * @returns {object} {comment_id, likes}
	 *
	 */
	static async addLike(commentId, token) {
		ExpressApi.token = token;
		const res = await this.request(`comments/${commentId}/add`, {}, "post");

		return res.newLike;
	}

	/**
	 * Main method for removing a like from a comment. Can only be called once a user is authenticated.
	 * @param {number} commentId
	 * @param {string} token
	 * @returns {object} {id}
	 */
	static async removeLike(commentId, token) {
		ExpressApi.token = token;
		const res = await this.request(
			`comments/${commentId}/remove`,
			{},
			"delete",
		);

		return res.removedLike;
	}

	/**
	 * Main method for getting a specific city comment for a given ID. Method can only be called once a user is authenticated.
	 *
	 * @param {number} id
	 * @param {string} token
	 * @returns {object} {id, comment, username, cityName, likes}
	 */
	static async getSingleComment(id, token) {
		ExpressApi.token = token;
		const res = await this.request(`comments/${id}`);

		return res.comment;
	}

	/**
	 * main method for getting all weather data from the backend db to be rendered on frontend for each city.
	 * 
	 * @returns {array} [{airQuality, cityName, currTempCel, currTempFar, id, minTempCel, maxTempCel, minTempFar, maxTempFar}]
	 */
	static async getWeatherData() {
		const res = await this.request('temps');

		return res.weatherData;
	}
}

export default ExpressApi;
