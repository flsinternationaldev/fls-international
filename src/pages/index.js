import React, { Fragment } from 'react';
import Slick from 'react-slick';
import { graphql, useStaticQuery, Link } from 'gatsby';

import 'src/bulma/bulma.scss';
import 'slick-carousel/slick/slick.css';
import sectionStyles from 'src/components/section/Section.module.scss';

import Layout from 'src/components/Layout';
import Hero from 'src/components/hero/Hero';
import Section from 'src/components/section/Section';
import Card from 'src/components/card/Card';
import Application from 'src/components/application/ApplicationLanding';

import videoSampleImg from 'src/img/video-sample.jpeg';

export const HomePageTemplate = ({ data }) => {
	const slickSettings = {
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 3,
		arrows: true,
		responsive: [
			{
				breakpoint: 1023,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	};

	// TODO: This 'reduce' pattern repeats across the app. Think about creating a mixin of some kind
	const homeCopy = data.homeCopy.edges.reduce(
		(accum, edge) => Object.assign({}, edge.node.frontmatter),
		{}
	);

	const programs = data.programs.edges.map(edge => edge.node.frontmatter);

	const locations = data.locations.edges.map(edge => edge.node.frontmatter);

	return (
		<Fragment>
			<Hero carouselItems={homeCopy.carousel_settings} />

			<Section
				sectionClasses={['section', sectionStyles.sectionWhoWeAre]}
				containerClasses={['']}
			>
				<div className="columns is-multiline">
					<div className="column is-full-tablet is-half-desktop">
						<div
							className={`container ${sectionStyles.exploreYourWorld__copyContainer}`}
						>
							<div
								className={
									sectionStyles.section__titleContainer
								}
							>
								<h3 className="subtitle subtitle--fls subtitle--red">
									{homeCopy.explore_your_world.subtitle}
								</h3>
								<h1 className="title title--fls">
									{homeCopy.explore_your_world.title}
								</h1>
							</div>

							<p className={sectionStyles.exploreYourWorld__copy}>
								{homeCopy.explore_your_world.copy}
							</p>
						</div>
					</div>
					<div className="column is-full-tablet is-half-desktop">
						<img src={videoSampleImg} alt="" />
					</div>
				</div>
			</Section>
			<Section
				sectionClasses={['section', sectionStyles.sectionAlternate]}
			>
				<div className="columns is-centered">
					<div className="column is-6">
						<div className={sectionStyles.section__titleContainer}>
							<h3 className="subtitle subtitle--fls subtitle--red">
								{homeCopy.start_your_journey.subtitle}
							</h3>
							<h2 className="title title--fls">
								{homeCopy.start_your_journey.title}
							</h2>
						</div>
					</div>
				</div>

				<div className="columns is-multiline">
					<div className="column is-half-desktop is-full-tablet">
						<p
							className={
								sectionStyles.startYourJourney__copyContainer
							}
						>
							{homeCopy.start_your_journey.copy}
						</p>
					</div>
					<div className="column is-half-desktop is-full-tablet">
						<Application
							isHome={true}
							on_location_program_information={
								homeCopy.on_location_program_information
							}
						/>
					</div>
				</div>
			</Section>
			<Section>
				<div className="columns is-centered">
					<div className="column is-7">
						<div className={sectionStyles.section__titleContainer}>
							<h3 className="subtitle subtitle--fls subtitle--red">
								{homeCopy.our_popular_programs.subtitle}
							</h3>
							<h2 className="title title--fls">
								{homeCopy.our_popular_programs.title}
							</h2>
						</div>

						<p className={sectionStyles.popularPrograms__subcopy}>
							{homeCopy.our_popular_programs.copy}
						</p>
					</div>
				</div>

				<div className="columns is-multiline">
					{programs.map(program => {
						return (
							<div className="column is-one-quarter-desktop is-half-tablet is-full-mobile">
								<Link
									className={
										sectionStyles.popularPrograms__programContainer
									}
									to={`/programs/${program.programType}/${program.path}`}
								>
									<img
										className={
											sectionStyles.popularPrograms__bgImg
										}
										src={program.hero_image}
										alt={`${program.name} background image`}
									/>
									<h3
										className={
											sectionStyles.popularPrograms__programTitle
										}
									>
										{program.name}
									</h3>
								</Link>
							</div>
						);
					})}
				</div>

				<div className="columns is-centered">
					<div className="column is-one-quarter-tablet is-full-mobile">
						<Link to="/programs" className="fls__button">
							View More
						</Link>
					</div>
				</div>
			</Section>
			<Section
				sectionClasses={['section', sectionStyles.highlightedSection]}
			>
				<div className="columns is-centered">
					<div className="column is-6">
						<div className={sectionStyles.section__titleContainer}>
							<h3
								className={`subtitle ${sectionStyles.highlightedSection__subtitle}`}
							>
								{homeCopy.how_is_your_english.subtitle}
							</h3>
							<h2 className="title title--fls title--white">
								{homeCopy.how_is_your_english.title}
							</h2>
						</div>
					</div>
				</div>

				<div className="columns is-centered is-multiline">
					<div className="column is-half-desktop is-full-tablet">
						{/* TODO: Change bullet icons */}
						<ul className={sectionStyles.hiye__list}>
							<li className="fls__list-item">
								Test your English ability and find your
								approximate FLS level with our FREE test!
							</li>
							<li className="fls__list-item">
								Sign up to take our brief test and receive your
								results.
							</li>
							<li className="fls__list-item">
								An FLS representative can then help you make a
								study plan to meet your goals.
							</li>
						</ul>
					</div>

					<div className="column is-half-desktop is-full-tablet">
						<div className="columns is-multiline">
							<div className="column is-half">
								<div className="field">
									<div className="control">
										<input
											className="input fls__text-input fls__text-input--highlighted-section"
											type="text"
											placeholder="First Name"
										/>
									</div>
								</div>
							</div>
							<div className="column is-half">
								<div className="field">
									<div className="control">
										<input
											className="input fls__text-input fls__text-input--highlighted-section"
											type="text"
											placeholder="Family Name"
										/>
									</div>
								</div>
							</div>
							<div className="column is-half">
								<div className="field">
									<div className="control">
										<input
											className="input fls__text-input fls__text-input--highlighted-section"
											type="text"
											placeholder="Select a Country"
										/>
									</div>
								</div>
							</div>
							<div className="column is-half">
								<div className="field">
									<div className="control">
										<input
											className="input fls__text-input fls__text-input--highlighted-section"
											type="text"
											placeholder="Your Email"
										/>
									</div>
								</div>
							</div>
							<div className="column is-half">
								<p>Are you working with an agency?</p>
							</div>
							<div className="column is-half">
								<div className="control">
									<label className="radio">
										<input
											type="radio"
											className="fls-input__radio"
											name="answer"
										/>
										Yes
									</label>
									<label className="radio">
										<input
											type="radio"
											name="answer"
											className="fls-input__radio"
										/>
										No
									</label>
								</div>
							</div>

							<div className="column is-full">
								<button className="button fls__button">
									Begin the Test
								</button>
							</div>
						</div>
					</div>
				</div>
			</Section>
			<Section sectionClasses={['section', 'locations']}>
				{/* template these carousel slides */}
				<div className="columns is-centered">
					<div className="column is-6">
						<div className={sectionStyles.section__titleContainer}>
							<h2 className="title title--fls">Locations</h2>
						</div>
					</div>
				</div>

				<div className="columns is-multiline">
					{locations.map(location => (
						<div className="column is-one-third">
							<Card
								key={location.path}
								cardData={location}
								isLocation={true}
								isCarouselLocation={true}
							/>
						</div>
					))}

					{/* TODO: Slick refuses to work with a map. Look into this. */}
					{/* <Slick {...slickSettings}>
					{locations.map(location => (
						<Card
							key={location.path}
							cardData={location}
							isLocation={true}
							isCarouselLocation={true}
						/>
					))}
				</Slick> */}
				</div>
			</Section>
		</Fragment>
	);
};

const HomePage = (
	{
		/*data*/
	}
) => {
	const data = useStaticQuery(graphql`
		{
			homeCopy: allMarkdownRemark(
				filter: { fileAbsolutePath: { regex: "pages/static/home/" } }
			) {
				edges {
					node {
						frontmatter {
							carousel_settings {
								carousel_image
								copy
								title
							}
							explore_your_world {
								subtitle
								copy
								title
							}
							how_is_your_english {
								copy
								subtitle
								title
							}
							start_your_journey {
								copy
								subtitle
								title
							}
							our_popular_programs {
								copy
								subtitle
								title
							}
						}
					}
				}
			}
			programs: allMarkdownRemark(
				limit: 8
				filter: {
					fileAbsolutePath: {
						regex: "/pages/dynamic/programs/in-person//"
					}
				}
			) {
				edges {
					node {
						frontmatter {
							path
							name
							hero_image
						}
					}
				}
			}
			locations: allMarkdownRemark(
				limit: 1000
				filter: {
					fileAbsolutePath: { regex: "/pages/dynamic/locations//" }
				}
			) {
				edges {
					node {
						frontmatter {
							path
							name
							carousel_images
							description
						}
					}
				}
			}
		}
	`);

	return (
		<Layout>
			<HomePageTemplate data={data} />
		</Layout>
	);
};

export default HomePage;
