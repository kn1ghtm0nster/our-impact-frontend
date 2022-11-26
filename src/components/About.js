import { useEffect } from "react";
import Card from "react-bootstrap/Card";
const About = ({ title }) => {
	useEffect(() => {
		document.title = title;
	}, [title]);
	return (
		<div className="my-5">
			<h1 className="text-white display-1 text-center">
				About This Project
			</h1>

			<Card id="blur-card">
				<Card.Body>
					Besides being the final project for my Springboard Bootcamp,
					this project means more to me because of the very real
					threat that the younger generations are fighting against.
					This project was created with the purpose of unifying those
					around the world so they may have a place to voice their
					concerns about their first hand experiences with climate
					change in their area of the world.
				</Card.Body>
				<Card.Body>
					Before we get started on understanding what Climate Change
					IS, we need to first accept, and understand one key thing
					about this crisis.{" "}
					<span className="fw-bold text-danger">
						CLIMATE. CHANGE. IS. REAL.
					</span>{" "}
					Over the last few decades, our planet's temperature has been
					slowly increasing and although these increases in overall
					temperature can be a decimal percentage increase, this could
					radically influence the season for several reagions of the
					globe from unexpected droughts to an extremely long rainy
					season which impact local residential regions and damage
					crops for farmers.
				</Card.Body>
				<Card.Body>
					To have a more official definition, I have included the
					brief definition from the United Nations' website on Climate
					Change:
				</Card.Body>
				<Card.Body>
					<blockquote cite="https://www.un.org/en/climatechange/what-is-climate-change">
						<q>
							Climate change refers to long-term shifts in
							temperatures and weather patterns. These shifts may
							be natural, such as through variations in the solar
							cycle. But since the 1800s, human activities have
							been the main driver of climate change, primarily
							due to burning fossil fuels like coal, oil and gas.
							Burning fossil fuels generates greenhouse gas
							emissions that act like a blanket wrapped around the
							Earth, trapping the sun's heat and raising
							temperatures. Examples of greenhouse gas emissions
							that are causing climate change include carbon
							dioxide and methane. These come from using gasoline
							for driving a car or coal for heating a building,
							for example. Clearing land and forests can also
							release carbon dioxide. Landfills for garbage are a
							major source of methane emissions. Energy, industry,
							transport, buildings, agriculture and land use are
							among the main emitters.
						</q>
						<figcaption>
							- Source: <cite>United Nations Website</cite>
						</figcaption>
					</blockquote>
				</Card.Body>

				<Card.Body>
					Now that I've had my small rant, allow me to introduce
					myself and then some of the features that this application
					contains.
				</Card.Body>

				<Card.Body>
					My name is Diego, and I am a self-taught Software Engineer.
					I've been learning about all things in the Software
					Engineering field for a few years now starting with Python
					and ending up with what I know today (which is honestly a
					giant list so I won't bore you with this information). I've
					been wanting to work on a project that covers a topic that I
					am passionate about and with the climate getting a bit
					toastier every year, I decieded to make an application that
					will allow users to input their first hand accounts for each
					of the cities available.
				</Card.Body>

				<Card.Body>
					You'll notice that you have options at the top for seeing
					"Resources" and "Cities". These are completely open for
					anyone to view and use at their discretion. No account
					required whatsoever and that's because this data is publicly
					available so it would make no sense in hiding it behind user
					authentication.
				</Card.Body>

				<Card.Body>
					In addition, each city will have its own bio information
					along with the population size and current weather
					information. No need to worry about your browser, this
					information is scheduled to be pulled each day at around
					12PM Central Standard Time (US) and will be stored in my
					backend server so your browser won't be making these
					requests at all!
				</Card.Body>

				<Card.Body>
					FAQs
					<Card.Text>
						<span className="fw-bold">Q:</span> Who is the target
						audience for this application?
					</Card.Text>
					<Card.Text>
						<span className="fw-bold">A:</span> Everyone! Anyone can
						make an account and share their experiences whether they
						live in the cities themselves or in the neighboring
						towns.
					</Card.Text>
					<Card.Text>
						<span className="fw-bold">Q:</span> What is the goal for
						this project?
					</Card.Text>
					<Card.Text>
						<span className="fw-bold">A:</span> Conneting people
						from around the globe and sharing stories on the impact
						Climate Change has had on their lives.
					</Card.Text>
					<Card.Text>
						<span className="fw-bold">Q:</span> Do I have to make an
						account?
					</Card.Text>
					<Card.Text>
						<span className="fw-bold">A:</span> NO! The only reason
						you would need an account is to view and post comments
						for a specific city.
					</Card.Text>
					<Card.Text>
						<span className="fw-bold">Q:</span> I see 20 cities
						only, why 20?
					</Card.Text>
					<Card.Text>
						<span className="fw-bold">A:</span> Originally, I wanted
						to do this for the worlds top 20 polluting cities around
						the world however, there was an issue with getting data
						for cities outside of the India/China region and not
						everyone lives in that area of the world so, I decided
						to split major countries that I could think of and
						selected one large city from that country with a
						somewhat smaller sized city to accompany it.
					</Card.Text>
					<Card.Text>
						<span className="fw-bold">Q:</span> Are there any
						resources for educators?
					</Card.Text>
					<Card.Text>
						<span className="fw-bold">A:</span> YES! I took the time
						and had a separate education route created for teachers
						since I know a few teachers peronally. These items can
						be found in the "Resources" option above.
					</Card.Text>
					<Card.Text>
						<span className="fw-bold">Q:</span> Can I contribute to
						the project?
					</Card.Text>
					<Card.Text>
						<span className="fw-bold">A:</span> Sure! The repo is
						located{" "}
						<a
							href="https://github.com/kn1ghtm0nster/captstone-2"
							target="_blank"
							rel="noreferrer"
						>
							here
						</a>
						. If you would like to add updates here and there or
						have an idea you'd like to share, feel free to create
						pull request and we can chat about it!
					</Card.Text>
				</Card.Body>
			</Card>
		</div>
	);
};

export default About;
