import React, { Fragment } from 'react';
import Slick from 'react-slick';
import { graphql } from 'gatsby';

import '../bulma/bulma.scss';
import 'slick-carousel/slick/slick.css';

// TODO: Eventually, css module this
// import programsStyles from '../styles/Programs.module.scss';
import '../styles/programs.scss';

import Layout from '../components/Layout';
import AnnouncementBanner from '../components/announcement-banner/AnnouncementBanner';
import Section from '../components/section/Section';

export const ProgramsPageTemplate = ({
	carousel_settings,
	explore_your_world,
	how_is_your_english,
	our_popular_programs,
	start_your_journey,
}) => {
	return (
		<Fragment>
			<Section
				sectionClasses={['hero', 'is-medium', 'hero--page']}
				containerClasses={['hero-body', 'hero-body--page']}
				isFullWidthContainer={true}
			>
				<div className="fls__page-hero-copy-container">
					<div className="container">
						<div className="columns is-multiline is-centered">
							<div className="column is-full">
								<h1 className="fls__page-hero-title">
									Programs
								</h1>
							</div>

							<div className="column is-one-third-desktop is-half-tablet">
								<button className="fls__page-hero-button">
									Apply Now
								</button>
							</div>
							<div className="column is-one-third-desktop is-half-tablet">
								<button className="fls__page-hero-button">
									Contact Us
								</button>
							</div>
							<div className="column is-one-third-desktop is-full-tablet">
								<button className="fls__page-hero-button">
									English Proficiency Test
								</button>
							</div>
						</div>
					</div>
				</div>
			</Section>

			<Section
				sectionClasses={['section', 'programs']}
				containerClasses={['container']}
			>
				{/* TODO: Obviously, this should, eventually, loop based on content from WP */}
				<div className="columns is-centered is-multiline">
					<div className="column is-half-desktop is-full-tablet">
						<div className="programs__card">
							<div className="programs__card-content">
								<h5 className="programs__card-title">
									English Language Programs
								</h5>
								<p className="programs__card-copy">
									Compare FLS International's suite of top
									quality academic programs to find the
									program the suits your goals.
								</p>
							</div>
							<div className="programs__card-img-container">
								<a
									href="#"
									className="fls__button fls__button--blue fls__button--card"
								>
									Read More
								</a>
							</div>
						</div>
					</div>

					<div className="column is-half-desktop is-full-tablet">
						<div className="programs__card">
							<div className="programs__card-content">
								<h5 className="programs__card-title">
									English Language Programs
								</h5>
								<p className="programs__card-copy">
									Compare FLS International's suite of top
									quality academic programs to find the
									program the suits your goals.
								</p>
							</div>
							<div className="programs__card-img-container">
								<a
									href="#"
									className="fls__button fls__button--blue fls__button--card"
								>
									Read More
								</a>
							</div>
						</div>
					</div>

					<div className="column is-half-desktop is-full-tablet">
						<div className="programs__card">
							<div className="programs__card-content">
								<h5 className="programs__card-title">
									English Language Programs
								</h5>
								<p className="programs__card-copy">
									Compare FLS International's suite of top
									quality academic programs to find the
									program the suits your goals.
								</p>
							</div>
							<div className="programs__card-img-container">
								<a
									href="#"
									className="fls__button fls__button--blue fls__button--card"
								>
									Read More
								</a>
							</div>
						</div>
					</div>

					<div className="column is-half-desktop is-full-tablet">
						<div className="programs__card">
							<div className="programs__card-content">
								<h5 className="programs__card-title">
									English Language Programs
								</h5>
								<p className="programs__card-copy">
									Compare FLS International's suite of top
									quality academic programs to find the
									program the suits your goals.
								</p>
							</div>
							<div className="programs__card-img-container">
								<a
									href="#"
									className="fls__button fls__button--blue fls__button--card"
								>
									Read More
								</a>
							</div>
						</div>
					</div>
				</div>
			</Section>
			<AnnouncementBanner />
		</Fragment>
	);
};

const ProgramsPage = ({ data }) => {
	const { frontmatter } = data.markdownRemark;

	return (
		<Layout isScrolled={true}>
			<ProgramsPageTemplate />
		</Layout>
	);
};

export default ProgramsPage;

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
