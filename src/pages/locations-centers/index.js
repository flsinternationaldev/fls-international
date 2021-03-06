import React, { Fragment } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import 'src/bulma/bulma.scss';

// TODO: Eventually, css module this
// import programsStyles from 'src/styles/Programs.module.scss';
import 'src/styles/locations.scss';

import Layout from 'src/components/Layout';
import Section from 'src/components/section/Section';
import Card from 'src/components/card/Card';

export const LocationsPageTemplate = ({ data }) => {
	const locations = data.allMarkdownRemark.edges.map(
		edge => edge.node.frontmatter
	);

	return (
		<Section
			sectionClasses={['section', 'programs']}
			containerClasses={['container']}
		>
			<div className="columns is-multiline">
				{locations.map(location => (
					<div className="column is-one-third-desktop is-half-tablet">
						<Card isLocation={true} cardData={location} />
					</div>
				))}
			</div>
		</Section>
	);
};

const LocationsPage = (
	{
		/*data*/
	}
) => {
	const data = useStaticQuery(graphql`
		{
			allMarkdownRemark(
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
							centerNameRelation
							carousel_images
							name
							description
						}
					}
				}
			}
		}
	`);

	return (
		<Layout isScrolled={true} hasNavHero={true} pageTitle={'Locations'}>
			<LocationsPageTemplate data={data} />
		</Layout>
	);
};

export default LocationsPage;
