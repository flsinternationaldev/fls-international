import React from 'react';
// import Slick from 'react-slick';
// import { graphql } from 'gatsby';

// import '../bulma/bulma.scss';
// import 'slick-carousel/slick/slick.css';

// // TODO: Eventually, css module this
// // import programsStyles from '../styles/Programs.module.scss';
// import '../styles/programs.scss';

import Layout from '../../components/Layout';
// import AnnouncementBanner from '../components/announcement-banner/AnnouncementBanner';
// import Section from '../components/section/Section';

export const EnglishLanguageProgramsTemplate = () => {
	return (
		<section className="section programs">
			<div className="container">
				{/* TODO: Obviously, this should, eventually, loop based on content from WP */}
				<div className="columns is-multiline">
					<div className="column is-full fls__content-header">
						<div className="columns is-centered is-multiline">
							<div className="column is-full has-text-centered">
								<h3 className="subtitle subtitle--fls subtitle--red">
									Programs
								</h3>
								<h2 className="title title--fls">
									English Language Programs
								</h2>
							</div>
							<div className="column is-full">
								<p className="fls__content-header-copy has-text-centered">
									Compare FLS International's suite of top
									quality academic programs to find the
									program that suits your goals.
								</p>
							</div>
						</div>
					</div>

					<div className="column is-half">
						<div className="fls__card">
							<div className="fls__card-contents">
								<span className="fls__pill fls__pill--in-person">
									In Person
								</span>
								<span className="fls__pill fls__pill--online">
									Online
								</span>

								<div className="fls__card-copy-container">
									<h5 className="fls__card-title">
										Academic English
									</h5>
									<p className="fls__card-copy">
										Our high-powered Academic English
										program offers the fastest way to
										develop your English.
									</p>
								</div>

								<div className="fls__card-details">
									{/* TODO: Icons */}
									<span>36 lessons per week</span>
									<span>30 hours per week</span>
								</div>
							</div>

							<div className="fls__card-bg"></div>
							<div className="fls__card-bg-overlay"></div>
						</div>
					</div>

					<div className="column is-half">
						<div className="fls__card">
							<div className="fls__card-contents">
								<span className="fls__pill fls__pill--online">
									Online
								</span>

								<div className="fls__card-copy-container">
									<h5 className="fls__card-title">
										Academic English
									</h5>
									<p className="fls__card-copy">
										Our high-powered Academic English
										program offers the fastest way to
										develop your English.
									</p>
								</div>

								<div className="fls__card-details">
									{/* TODO: Icons */}
									<span>36 lessons per week</span>
									<span>30 hours per week</span>
								</div>
							</div>

							<div className="fls__card-bg"></div>
							<div className="fls__card-bg-overlay"></div>
						</div>
					</div>

					<div className="column is-half">
						<div className="fls__card">
							<div className="fls__card-contents">
								<span className="fls__pill fls__pill--in-person">
									In Person
								</span>

								<div className="fls__card-copy-container">
									<h5 className="fls__card-title">
										Academic English
									</h5>
									<p className="fls__card-copy">
										Our high-powered Academic English
										program offers the fastest way to
										develop your English.
									</p>
								</div>

								<div className="fls__card-details">
									{/* TODO: Icons */}
									<span>36 lessons per week</span>
									<span>30 hours per week</span>
								</div>
							</div>

							<div className="fls__card-bg"></div>
							<div className="fls__card-bg-overlay"></div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

const EnglishLanguageProgramsPage = ({ data }) => {
	// const { frontmatter } = data.markdownRemark;

	console.log('data from query', data);
	return (
		<Layout
			isScrolled={true}
			hasNavHero={true}
			pageTitle={'English Language Programs'}
		>
			<EnglishLanguageProgramsTemplate />
		</Layout>
	);
};

export default EnglishLanguageProgramsPage;

// TODO: Here, all the individual fields are specified.
// Is there a way to just say 'get all fields'?
export const pageQuery = graphql`
	query {
		markdownRemark {
			frontmatter {
				program_cards {
					card_description
					card_image
					card_title
				}
			}
		}
	}
`;
