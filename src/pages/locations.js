import React, { Fragment } from 'react';
import { graphql } from 'gatsby';

import '../bulma/bulma.scss';

// TODO: Eventually, css module this
// import programsStyles from '../styles/Programs.module.scss';
import '../styles/locations.scss';

import Layout from '../components/Layout';
import Section from '../components/section/Section';
import Card from '../components/card/Card';

export const LocationsPageTemplate = () => {
	return (
		<Section
			sectionClasses={['section', 'programs']}
			containerClasses={['container']}
		>
			{/* TODO: Obviously, this should, eventually, come from the CMS */}
			<div class="columns is-multiline">
				<div class="column is-full">
					<h3 class="fls__post-title">Year Round Campuses</h3>
				</div>
				<div class="column is-one-third-desktop is-half-tablet">
					<Card isLocation={true} />
				</div>
			</div>
		</Section>
	);
};

const LocationsPage = ({ data }) => {
	// const { frontmatter } = data.markdownRemark;

	console.log('data from query', data);
	return (
		<Layout isScrolled={true} hasNavHero={true} pageTitle={'Locations'}>
			<LocationsPageTemplate />
		</Layout>
	);
};

export default LocationsPage;

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
