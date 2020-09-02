import React, { Fragment } from 'react';
import { graphql } from 'gatsby';

import 'src/bulma/bulma.scss';

// TODO: Eventually, css module this
// import programsStyles from 'src/styles/Programs.module.scss';
import 'src/styles/locations.scss';

import Layout from 'src/components/Layout';
import Section from 'src/components/section/Section';
import Card from 'src/components/card/Card';

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
