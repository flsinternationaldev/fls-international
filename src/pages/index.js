import React, { Fragment } from 'react';
import Slick from 'react-slick';
import { graphql } from 'gatsby';

import '../bulma/bulma.scss';
import 'slick-carousel/slick/slick.css';
import sectionStyles from '../components/section/section.module.scss';

import Layout from '../components/Layout';
import Hero from '../components/hero/Hero';
import Navbar from '../components/navbar/Navbar';
import AnnouncementBanner from '../components/announcement-banner/AnnouncementBanner';
import Section from '../components/section/Section';
import Footer from '../components/footer/Footer';

import videoSampleImg from '../img/video-sample.jpeg';

export const HomePageTemplate = ({
	carousel_settings,
	explore_your_world,
	how_is_your_english,
	our_popular_programs,
	start_your_journey,
}) => {
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

	return (
		<Fragment>
			<Hero carousel_settings={carousel_settings} />

			<Section
				sectionClasses={[sectionStyles.sectionWhoWeAre]}
				isMultilineColumns={true}
				isCenteredColumns={true}
				isFullWidthContainer={true}
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
									{explore_your_world.subtitle}
								</h3>
								<h1 className="title title--fls">
									{explore_your_world.title}
								</h1>
							</div>

							<p className={sectionStyles.exploreYourWorld__copy}>
								{explore_your_world.copy}
							</p>
						</div>
					</div>
					<div className="column is-full-tablet is-half-desktop">
						<img src={videoSampleImg} alt="" />
					</div>
				</div>
			</Section>
			<Section
				sectionClasses={[sectionStyles.sectionAlternate]}
				isCenteredColumns={true}
			>
				<div className="columns is-centered">
					<div className="column is-6">
						<div className={sectionStyles.section__titleContainer}>
							<h3 className="subtitle subtitle--fls subtitle--red">
								{start_your_journey.subtitle}
							</h3>
							<h2 className="title title--fls">
								{start_your_journey.title}
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
							{start_your_journey.copy}
						</p>
					</div>
					<div className="column is-half-desktop is-full-tablet">
						<div className="columns is-multiline">
							<div className="column is-full">
								<div className="field">
									<div className="control">
										<input
											className="input fls__text-input"
											type="text"
											placeholder="Choose Your Start Date"
										/>
									</div>
								</div>
							</div>

							<div className="column is-half">
								<div className="field">
									<div className="control">
										<input
											className="input fls__text-input"
											type="text"
											placeholder="Choose Your Duration"
										/>
									</div>
								</div>
							</div>

							<div className="column is-half">
								<div className="field">
									<div className="control">
										<input
											className="input fls__text-input"
											type="text"
											placeholder="Choose Your Center Location"
										/>
									</div>
								</div>
							</div>

							<div className="column is-full">
								<div className="field">
									<div className="control">
										<input
											className="input fls__text-input"
											type="text"
											placeholder="Choose Your Housing"
										/>
									</div>
								</div>
							</div>

							<div className="column is-full">
								<div className="field">
									<div className="control">
										<input
											className="input fls__text-input"
											type="text"
											placeholder="Choose Your Program"
										/>
									</div>
								</div>
							</div>

							<div className="column is-half">
								<p
									className={
										sectionStyles.startYourJourney__price
									}
								>
									$ --USD
								</p>
							</div>

							<div className="column is-half">
								<button className="fls__button">
									Apply Now
								</button>
							</div>
						</div>
					</div>
				</div>
			</Section>
			<Section>
				<div className="columns is-centered">
					<div className="column is-7">
						<div className={sectionStyles.section__titleContainer}>
							<h3 className="subtitle subtitle--fls subtitle--red">
								{our_popular_programs.subtitle}
							</h3>
							<h2 className="title title--fls">
								{our_popular_programs.title}
							</h2>
						</div>

						<p className={sectionStyles.popularPrograms__subcopy}>
							{our_popular_programs.copy}
						</p>
					</div>
				</div>
				<div className="columns is-centered is-multiline">
					{/* TODO: DRY this up */}
					<div className="column is-one-quarter-desktop is-half-tablet is-full-mobile">
						<div
							className={
								sectionStyles.popularPrograms__programContainer
							}
						>
							<h3
								className={
									sectionStyles.popularPrograms__programTitle
								}
							>
								English Language Programs
							</h3>
						</div>
					</div>

					<div className="column is-one-quarter-desktop is-half-tablet is-full-mobile">
						<div
							className={
								sectionStyles.popularPrograms__programContainer
							}
						>
							<h3
								className={
									sectionStyles.popularPrograms__programTitle
								}
							>
								Speciality Tours
							</h3>
						</div>
					</div>

					<div className="column is-one-quarter-desktop is-half-tablet is-full-mobile">
						<div
							className={
								sectionStyles.popularPrograms__programContainer
							}
						>
							<h3
								className={
									sectionStyles.popularPrograms__programTitle
								}
							>
								High School & University Placement
							</h3>
						</div>
					</div>

					<div className="column is-one-quarter-desktop is-half-tablet is-full-mobile">
						<div
							className={
								sectionStyles.popularPrograms__programContainer
							}
						>
							<h3
								className={
									sectionStyles.popularPrograms__programTitle
								}
							>
								College Auditing
							</h3>
						</div>
					</div>

					<div className="column is-one-quarter-desktop is-half-tablet is-full-mobile">
						<div
							className={
								sectionStyles.popularPrograms__programContainer
							}
						>
							<h3
								className={
									sectionStyles.popularPrograms__programTitle
								}
							>
								FLS Pathways
							</h3>
						</div>
					</div>
					<div className="column is-one-quarter-desktop is-half-tablet is-full-mobile">
						<div
							className={
								sectionStyles.popularPrograms__programContainer
							}
						>
							<h3
								className={
									sectionStyles.popularPrograms__programTitle
								}
							>
								Concurrent Enrollment
							</h3>
						</div>
					</div>
					<div className="column is-one-quarter-desktop is-half-tablet is-full-mobile">
						<div
							className={
								sectionStyles.popularPrograms__programContainer
							}
						>
							<h3
								className={
									sectionStyles.popularPrograms__programTitle
								}
							>
								High School Completion
							</h3>
						</div>
					</div>
					<div className="column is-one-quarter-desktop is-half-tablet is-full-mobile">
						<div
							className={
								sectionStyles.popularPrograms__programContainer
							}
						>
							<h3
								className={
									sectionStyles.popularPrograms__programTitle
								}
							>
								Study 30+
							</h3>
						</div>
					</div>
				</div>

				<div className="columns is-centered">
					<div className="column is-one-quarter-tablet is-full-mobile">
						<button className="fls__button">View More</button>
					</div>
				</div>
			</Section>
			<Section sectionClasses={[sectionStyles.highlightedSection]}>
				<div className="columns is-centered">
					<div className="column is-6">
						<div className={sectionStyles.section__titleContainer}>
							<h3
								className={`subtitle ${sectionStyles.highlightedSection__subtitle}`}
							>
								{how_is_your_english.subtitle}
							</h3>
							<h2 className="title title--fls title--white">
								{how_is_your_english.title}
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
										<input type="radio" name="answer" />
										Yes
									</label>
									<label className="radio">
										<input type="radio" name="answer" />
										No
									</label>
								</div>
							</div>

							<div className="column is-full">
								<button className="button fls__button fls__button--red">
									Begin the Test
								</button>
							</div>
						</div>
					</div>
				</div>
			</Section>
			<Section sectionClasses={['locations']}>
				{/* template these carousel slides */}
				<div className="columns is-centered">
					<div className="column is-6">
						<div className={sectionStyles.section__titleContainer}>
							<h2 className="title title--fls">Locations</h2>
						</div>
					</div>
				</div>

				<Slick {...slickSettings}>
					<div className="fls__locations-card">
						<div className="fls__location fls__location--carousel">
							<div className="fls__location-img-container">
								<a
									href="#"
									className="fls__button fls__button--card"
								>
									Read More
								</a>
							</div>

							<div className="fls__location-copy-container">
								<h3 className="fls__location-title">
									Citrus College
								</h3>
								<p className="fls__location-copy">
									Study English in California! Citrus College
									offers a great combination of suburban
									comfort with access to all of the attracions
									and glamour of Los Angeles.
								</p>
							</div>
						</div>
					</div>

					<div className="fls__locations-card">
						<div className="fls__location fls__location--carousel">
							<div className="fls__location-img-container">
								<a
									href="#"
									className="fls__button fls__button--card"
								>
									Read More
								</a>
							</div>

							<div className="fls__location-copy-container">
								<h3 className="fls__location-title">
									Citrus College
								</h3>
								<p className="fls__location-copy">
									Study English in California! Citrus College
									offers a great combination of suburban
									comfort with access to all of the attracions
									and glamour of Los Angeles.
								</p>
							</div>
						</div>
					</div>

					<div className="fls__locations-card">
						<div className="fls__location fls__location--carousel">
							<div className="fls__location-img-container">
								<a
									href="#"
									className="fls__button fls__button--card"
								>
									Read More
								</a>
							</div>

							<div className="fls__location-copy-container">
								<h3 className="fls__location-title">
									Citrus College
								</h3>
								<p className="fls__location-copy">
									Study English in California! Citrus College
									offers a great combination of suburban
									comfort with access to all of the attracions
									and glamour of Los Angeles.
								</p>
							</div>
						</div>
					</div>

					<div className="fls__locations-card">
						<div className="fls__location fls__location--carousel">
							<div className="fls__location-img-container">
								<a
									href="#"
									className="fls__button fls__button--card"
								>
									Read More
								</a>
							</div>

							<div className="fls__location-copy-container">
								<h3 className="fls__location-title">
									Citrus College
								</h3>
								<p className="fls__location-copy">
									Study English in California! Citrus College
									offers a great combination of suburban
									comfort with access to all of the attracions
									and glamour of Los Angeles.
								</p>
							</div>
						</div>
					</div>

					<div className="fls__locations-card">
						<div className="fls__location fls__location--carousel">
							<div className="fls__location-img-container">
								<a
									href="#"
									className="fls__button fls__button--card"
								>
									Read More
								</a>
							</div>

							<div className="fls__location-copy-container">
								<h3 className="fls__location-title">
									Citrus College
								</h3>
								<p className="fls__location-copy">
									Study English in California! Citrus College
									offers a great combination of suburban
									comfort with access to all of the attracions
									and glamour of Los Angeles.
								</p>
							</div>
						</div>
					</div>
				</Slick>
			</Section>
			<Footer />
			<AnnouncementBanner />
		</Fragment>
	);
};

const HomePage = ({ data }) => {
	const { frontmatter } = data.markdownRemark;

	return (
		<Layout isHome={true}>
			<HomePageTemplate
				carousel_settings={frontmatter.carousel_settings}
				explore_your_world={frontmatter.explore_your_world}
				how_is_your_english={frontmatter.how_is_your_english}
				our_popular_programs={frontmatter.our_popular_programs}
				start_your_journey={frontmatter.start_your_journey}
			/>
		</Layout>
	);
};

export default HomePage;

// TODO: Here, all the individual fields are specified.
// Is there a way to just say 'get all fields'?
export const pageQuery = graphql`
	query {
		markdownRemark {
			frontmatter {
				carousel_settings {
					copy
					title
				}
				explore_your_world {
					copy
					subtitle
					title
				}
				how_is_your_english {
					copy
					title
					subtitle
				}
				our_popular_programs {
					copy
					subtitle
					title
				}
				start_your_journey {
					copy
					title
					subtitle
				}
			}
		}
	}
`;
