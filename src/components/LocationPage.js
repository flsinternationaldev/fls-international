import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from 'src/components/Layout';
import Section from 'src/components/section/Section';
import Testimonial from 'src/components/testimonial/Testimonial';
import QuickFacts from 'src/components/quick-facts/QuickFacts';
import PriceCalculator from 'src/components/price-calculator/PriceCalculator';
import MarkdownContent from 'src/components/MarkdownContent.js';

export const LocationPageTemplate = ({ locationPageData }) => {
	// TODO: See if there isn't some way to implement the 'alt' sections from before (i.e. the blocks with light gray backgrounds)
	const postContent = locationPageData.post_content;

	console.log('the data', locationPageData);
	return (
		<Section>
			<div className="columns is-multiline">
				<div className="column is-full">
					<div className="">
						<MarkdownContent
							content={postContent}
							classMap={{
								h2: 'fls__post-title',
								h3: 'fls__location-post-subtitle',
								p: 'fls__post-copy',
								ul: 'fls__location-post-list',
								li: 'fls__list-item fls__list-item--small',
							}}
						/>
					</div>
				</div>
				<div className="column is-3-desktop is-full-tablet">
					<PriceCalculator />

					<QuickFacts />

					<Testimonial />
				</div>
				<div className="column is-9-desktop is-full-tablet">
					<div className="columns is-multiline">
						<div className="column is-full">
							{/* TODO: Again, these 'programs' classes need genericizing */}
							<h2 className="programs__post-title">
								Saddleback College
							</h2>
						</div>

						<div className="column is-full">
							<div className="fls__location-post-carousel">
								<img
									src="../../img/locations-carousel-1.jpeg"
									alt="sample post image"
								/>
								<img
									src="../../img/locations-carousel-2.jpeg"
									alt="sample post image"
								/>
								<img
									src="../../img/locations-carousel-3.jpeg"
									alt="sample post image"
								/>
								<img
									src="../../img/locations-carousel-4.jpeg"
									alt="sample post image"
								/>
							</div>
						</div>

						<div className="column is-full">
							<div className="columns is-variable is-1">
								<div className="column">
									<a className="fls__location-post-anchor-button">
										Overview
									</a>
								</div>

								<div className="column">
									<a className="fls__location-post-anchor-button">
										Campus Profile
									</a>
								</div>

								<div className="column">
									<a className="fls__location-post-anchor-button">
										Area Profile
									</a>
								</div>

								<div className="column">
									<a className="fls__location-post-anchor-button">
										Programs Offered
									</a>
								</div>
							</div>
						</div>

						<div className="column is-full">
							{/* TODO: But it was not a programs element ..................  */}
							<div>
								<h3 className="fls__post-title">Overview</h3>
								<h4 className="fls__location-post-subtitle">
									Enjoy the Great Weather and Surroundings of
									Orange County
								</h4>

								<p className="fls__post-copy">
									With 42 miles of world-famous beaches,
									legendary theme parks and enough shopping
									destinations to satisfy even the most
									dedicated shopper, it's no wonder that
									visiting Orange County is the ultimate
									Southern California experience. "The OC", as
									local residents call it, blends a casual,
									active lifestyle with laid-back
									sophistication. This unique lifestyle was
									integral to the development and culture of
									professional surfing, and the perfect
									weather continues to bring millions of
									visitors every year.
								</p>
							</div>

							<div>
								<h4 className="fls__location-post-subtitle">
									Safe and Friendly Community
								</h4>

								<p className="fls__post-copy">
									The beautifully landscaped campus of
									Saddleback College is set on a hilltop
									surrounded by the gorgeous neighborhoods and
									shopping districts of Mission Viejo. Known
									as one of California's safest cities,
									Mission Viejo provides comfortable
									surroundings near some of Southern
									California's greatest attractions.
								</p>
							</div>

							<div>
								<h4 className="fls__location-post-subtitle">
									Orange County's Choice for Education
								</h4>

								<p className="fls__post-copy">
									Saddleback College has been the first choice
									for higher education in South Orange County
									since 1968. Saddleback College offers more
									than 190 different degrees and certificates,
									giving students an excellent foundation to
									transfer to UC Irvine or other University of
									California or California State University
									schools.
								</p>
							</div>
						</div>

						<div className="column is-full">
							<div className="fls__location-dark-post">
								<h3 className="fls__post-title">
									Campus Profile
								</h3>

								<p className="fls__post-copy">
									Located in safe and sunny Orange County,
									Saddleback College has offered a wide range
									of programs since 1968 and currently enrolls
									more than 27,000 students. Many students go
									on to four-year degree programs at nearby
									California State University and University
									of California campuses.
								</p>

								<h4 className="fls__location-post-subtitle">
									Campus Facilities
								</h4>

								<ul className="fls__location-post-list">
									<li className="fls__list-item fls__list-item--small">
										<strong>Learning Resouce Center</strong>
										<br />
										Housing computer stations, language lab,
										and campus library.
									</li>

									<li className="fls__list-item fls__list-item--small">
										<strong>McKinney Theater</strong>
										<br />
										Performing arts stage, with seating for
										400, offering a variety of live
										entertainment events to students and the
										public.
									</li>

									<li className="fls__list-item fls__list-item--small">
										<strong>Student Services Center</strong>
										<br />
										Housing a student lounge and cafeteria
										providing a full range of food services.
									</li>

									<li className="fls__list-item fls__list-item--small">
										<strong>Athletic Facilities</strong>
										<br />
										Including tennis courts, golf driving
										range, gymnasium, baseball field and
										swimming pool.
									</li>

									<li className="fls__list-item fls__list-item--small">
										<strong>KSBR Radio Station</strong>
										<br />A commercial-free contemporary
										jazz and community information station
										serving Orange County. KSBR has won
										multiple awards and trains students
										enrolled in Saddleback’s Cinema/TV/Radio
										program.
									</li>
								</ul>

								<h3 className="fls__post-title">Housing</h3>
								<h4 className="fls__location-post-subtitle">
									Homestay
								</h4>

								<p className="fls__post-copy">
									A homestay is a great way to experience
									American culture while improving your
									English ability! All FLS centers offer
									homestay accommodation with American
									families individually selected by FLS. Learn
									about American daily life, practice English
									on a regular basis and participate in many
									aspects of American culture that visitors
									often don't get to see. (Twin and Single
									options available).
								</p>

								<div className="fls__iframe-wrapper">
									<iframe
										width="560"
										height="349"
										src="https://www.youtube.com/embed/cQJKGECy8i4"
										frameborder="0"
										allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
										allowfullscreen
									></iframe>
								</div>
							</div>

							<div className="column is-full">
								<div>
									<h3 className="fls__post-title">
										Area Profile
									</h3>
									<strong>The Saddleback Experience</strong>

									<p className="fls__post-copy">
										With great weather, access to amazing
										beaches and a picturesque location
										between Los Angeles and San Diego,
										Mission Viejo offers an unbeatable
										quality of life with easy freeway access
										to classic California attractions like
										Sea World and Disneyland!
									</p>

									<ul className="fls__location-post-list">
										<li className="fls__list-item fls__list-item--small">
											Visit Disneyland Resort including
											the original Disneyland theme park
											including Galaxy's Edge, and the
											expanded California Adventure park,
											featuring Cars Land and Ariel’s
											Undersea Adventure.
										</li>

										<li className="fls__list-item fls__list-item--small">
											Relax on the sandy shores of Laguna
											Beach, considered one of the most
											beautiful beaches in California, and
											visit the many unique art galleries
											and cafes.
										</li>

										<li className="fls__list-item fls__list-item--small">
											Spend a fun-filled day at Sea World
											and see Shamu, sea lions and otters
											in action and enjoy rides like Manta
											and Wild Arctic.
										</li>

										<li className="fls__list-item fls__list-item--small">
											Enjoy the best of shopping,
											entertainment and dining at the huge
											Irvine Spectrum Center, offering
											over 130 specialty stores and
											restaurants.
										</li>

										<li className="fls__list-item fls__list-item--small">
											Take a surfing lesson on the shores
											of Huntington Beach, Surf City USA,
											the home of the annual US Open of
											Surf.
										</li>
									</ul>

									<strong>Mission Viejo, CA</strong>

									<p className="fls__post-copy">
										Recently named the safest city in the
										United States, Mission Viejo is an
										affluent suburban community of nearly
										100,000. The center of the city contains
										a large man-made lake and beautiful
										tree-lined streets overlooked by the
										Saddleback mountain range. Mission Viejo
										offers an ideal climate with a
										temperature range of 11-23 degrees
										Celsius year-round. Summers are sunny,
										warm and dry. Fall and winter bring
										occasional rain showers, with snow in
										the local mountains. Due to close
										proximity to the ocean, nighttime and
										morning clouds are common.
									</p>
								</div>
							</div>

							<div className="column is-full">
								<div className="fls__location-dark-post">
									<h3 className="fls__post-title">
										Programs Offered
									</h3>

									<strong>Academic Programs</strong>

									{/* TODO: Figure out icons (FontAwesome?) */}
									<ul className="fls__location-post-list">
										<li className="fls__list-item fls__list-item--small fls__list-item fls__list-item--small--check">
											Vacation English
										</li>

										<li className="fls__list-item fls__list-item--small fls__list-item fls__list-item--small--check">
											General English
										</li>

										<li className="fls__list-item fls__list-item--small fls__list-item fls__list-item--small--check">
											Intensive English
										</li>

										<li className="fls__list-item fls__list-item--small fls__list-item fls__list-item--small--check">
											Academic English
										</li>

										<li className="fls__list-item fls__list-item--small fls__list-item fls__list-item--small--check">
											TOEFL Preparation
										</li>

										<li className="fls__list-item fls__list-item--small fls__list-item fls__list-item--small--check">
											High School Completion
										</li>

										<li className="fls__list-item fls__list-item--small fls__list-item fls__list-item--small--check">
											Concurrent Enrollment
										</li>
									</ul>

									<strong>English + Volunteering</strong>

									<p className="fls__post-copy">
										FLS offers ESL students a wonderful way
										to practice their new English skills
										while immersing themselves in American
										society by volunteering at local
										charities and community service centers.
										Join other FLS students as they perfect
										their conversational English while
										helping others! Here are some of the
										oportunities you will enjoy at FLS
										Saddleback College:
									</p>

									<ul className="fls__location-post-list">
										<li className="fls__list-item fls__list-item--small fls__list-item fls__list-item--small--check">
											Mission Viejo Library
										</li>

										<li className="fls__list-item fls__list-item--small fls__list-item fls__list-item--small--check">
											G.I. Joe Search and Rescue
										</li>

										<li className="fls__list-item fls__list-item--small fls__list-item fls__list-item--small--check">
											Irvine Senior Services
										</li>

										<li className="fls__list-item fls__list-item--small fls__list-item fls__list-item--small--check">
											Boys & Girls Club of Laguna Beach
										</li>
									</ul>

									<strong>
										Optional Weekend and Evening Activities
									</strong>

									<p className="fls__post-copy">
										FLS offers ESL students memorable and
										educational tour experiences, and
										opportunities to visit the best
										attractions of the United States.
										Students will have many opportunities to
										take part in excursions with the full
										supervision of our trained FLS staff.
									</p>

									<strong>Activities Include:</strong>

									<ul className="fls__location-post-list">
										<li className="fls__list-item fls__list-item--small fls__list-item fls__list-item--small--check">
											Disneyland
										</li>

										<li className="fls__list-item fls__list-item--small fls__list-item fls__list-item--small--check">
											Six Flags Magic Mountain
										</li>

										<li className="fls__list-item fls__list-item--small fls__list-item fls__list-item--small--check">
											Soak City
										</li>

										<li className="fls__list-item fls__list-item--small fls__list-item fls__list-item--small--check">
											Knott's Berry Farm
										</li>

										<li className="fls__list-item fls__list-item--small fls__list-item fls__list-item--small--check">
											San Diego
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
};

const LocationPage = ({ pageContext }) => {
	const { pagePath } = pageContext;

	const data = useStaticQuery(graphql`
		{
			allMarkdownRemark(
				limit: 1000
				filter: { fileAbsolutePath: { regex: "/location-page//" } }
			) {
				edges {
					node {
						frontmatter {
							path
							post_content
							name
						}
					}
				}
			}
		}
	`);

	const locationPageData = data.allMarkdownRemark.edges.find(
		edge => edge.node.frontmatter.path === pagePath
	).node.frontmatter;

	return (
		<Layout
			isScrolled={true}
			hasNavHero={true}
			pageTitle={'English Language Programs'}
		>
			<LocationPageTemplate locationPageData={locationPageData} />
		</Layout>
	);
};

export default LocationPage;
