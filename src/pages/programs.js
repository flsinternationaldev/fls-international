import React, { Fragment } from 'react';
import { graphql } from 'gatsby';

import '../bulma/bulma.scss';

// TODO: Eventually, css module this
// import programsStyles from '../styles/Programs.module.scss';
import '../styles/programs.scss';

import Layout from '../components/Layout';
import Section from '../components/section/Section';

export const ProgramsPageTemplate = ({ program_cards }) => {
	console.log('program cards?', program_cards);
	return (
		<Fragment>
			<Section
				sectionClasses={['section', 'programs']}
				containerClasses={['container']}
			>
				<div className="columns is-centered is-multiline">
					{/* TODO: Keys should not be indices */}
					{/* {program_cards.map(program_card => {
						return (
							<div className="column is-half-desktop is-full-tablet">
								<div className="programs__card">
									<div className="programs__card-content">
										<h5 className="programs__card-title">
											{program_card.card_title}
										</h5>
										<p className="programs__card-copy">
											{program_card.card_description}
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
						);
					})} */}
				</div>
			</Section>
		</Fragment>
	);
};

const ProgramsPage = ({ data }) => {
	const { frontmatter } = data.markdownRemark;

	console.log('data from query', data);
	return (
		<Layout isScrolled={true} hasNavHero={true} pageTitle={'Programs'}>
			<ProgramsPageTemplate program_cards={frontmatter.program_cards} />
		</Layout>
	);
};

export default ProgramsPage;

// TODO: Here, all the individual fields are specified.
// Is there a way to just say 'get all fields'?
// export const pageQuery = graphql`
// 	query {
// 		markdownRemark {
// 			frontmatter {
// 				program_cards {
// 					card_description
// 					card_image
// 					card_title
// 				}
// 			}
// 		}
// 	}
// `;
