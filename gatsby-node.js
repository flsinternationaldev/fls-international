// TODO: I think the gatsby docs need to be updated to include this import
// https://www.gatsbyjs.com/docs/creating-and-modifying-pages/
const path = require('path');

exports.createPages = async ({ graphql, actions, reporter }) => {
	const { createPage } = actions;

	// Dynamically render location pages
	const locations = await graphql(
		`
			{
				allMarkdownRemark(
					limit: 1000
					filter: { fileAbsolutePath: { regex: "/location-pages//" } }
				) {
					edges {
						node {
							frontmatter {
								path
							}
						}
					}
				}
			}
		`
	);

	if (locations.errors) {
		reporter.panicOnBuild(`Error while running GraphQL query.`);
		return;
	}

	const locationPageTemplate = path.resolve(`src/components/LocationPage.js`);

	locations.data.allMarkdownRemark.edges.forEach(({ node }) => {
		const pagePath = `locations/${node.frontmatter.path}`;

		createPage({
			path: pagePath,
			component: locationPageTemplate,
			// Context properties are passed into the component as graphql variables
			context: {
				pagePath: node.frontmatter.path,
			},
		});
	});

	// Dynamically render program pages
	const programs = await graphql(
		`
			{
				allMarkdownRemark(
					limit: 1000
					filter: { fileAbsolutePath: { regex: "/program-pages//" } }
				) {
					edges {
						node {
							frontmatter {
								path
							}
						}
					}
				}
			}
		`
	);

	const programPageTemplate = path.resolve(`src/components/ProgramPage.js`);

	programs.data.allMarkdownRemark.edges.forEach(({ node }) => {
		const pagePath = `programs/in-person/${node.frontmatter.path}`;

		createPage({
			path: pagePath,
			component: programPageTemplate,
			// Context properties are passed into the component as graphql variables
			context: {
				pagePath: node.frontmatter.path,
			},
		});
	});

	// Dynamically render speciality tours pages
	const specialityTours = await graphql(
		`
			{
				allMarkdownRemark(
					limit: 1000
					filter: {
						fileAbsolutePath: { regex: "/speciality-tour-pages//" }
					}
				) {
					edges {
						node {
							frontmatter {
								path
								name
								accommodations
								activities_and_excursions
								carousel_images
								features
								program_dates {
									arrive
									depart
									price
								}
								sample_calendar
								speciality_tour_description
								speciality_tour_details {
									minimum_age
									number_of_weeks
								}
							}
						}
					}
				}
			}
		`
	);

	const specialityTourPageTemplate = path.resolve(
		`src/components/SpecialityToursPage.js`
	);

	specialityTours.data.allMarkdownRemark.edges.forEach(({ node }) => {
		const pagePath = `programs/speciality-tours/${node.frontmatter.path}`;

		createPage({
			path: pagePath,
			component: specialityTourPageTemplate,
			// Context properties are passed into the component as graphql variables
			context: {
				pagePath: node.frontmatter.path,
			},
		});
	});
};
