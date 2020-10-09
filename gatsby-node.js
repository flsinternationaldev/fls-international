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
					filter: {
						fileAbsolutePath: {
							regex: "/pages/dynamic/locations//"
						}
					}
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
		// TODO: For some unknown god damn reasons, naming the folder 'locations' in pages ... no longer works?
		const pagePath = `locations-centers/${node.frontmatter.path}`;

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
				inPerson: allMarkdownRemark(
					limit: 1000
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
							}
						}
					}
				}
				online: allMarkdownRemark(
					limit: 1000
					filter: {
						fileAbsolutePath: {
							regex: "/pages/dynamic/programs/online//"
						}
					}
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

	const inPersonProgramPageTemplate = path.resolve(
		`src/components/InPersonProgramPage.js`
	);

	// TODO: This can be DRYed up
	programs.data.inPerson.edges.forEach(({ node }) => {
		const pagePath = `programs/in-person/${node.frontmatter.path}`;

		createPage({
			path: pagePath,
			component: inPersonProgramPageTemplate,
			// Context properties are passed into the component as graphql variables
			context: {
				pagePath: node.frontmatter.path,
			},
		});
	});

	const onlineProgramPageTemplate = path.resolve(
		'src/components/OnlineProgramPage.js'
	);

	programs.data.online.edges.forEach(({ node }) => {
		const pagePath = `programs/online/${node.frontmatter.path}`;

		createPage({
			path: pagePath,
			component: onlineProgramPageTemplate,
			// Context properties are passed into the component as graphql variables
			context: {
				pagePath: node.frontmatter.path,
			},
		});
	});

	// Dynamically render specialty tours pages
	const specialtyTours = await graphql(
		`
			{
				allMarkdownRemark(
					limit: 1000
					filter: {
						fileAbsolutePath: {
							regex: "/pages/dynamic/programs/specialty-tours//"
						}
					}
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

	const specialtyTourPageTemplate = path.resolve(
		`src/components/SpecialtyToursPage.js`
	);

	specialtyTours.data.allMarkdownRemark.edges.forEach(({ node }) => {
		const pagePath = `programs/specialty-tours/${node.frontmatter.path}`;

		createPage({
			path: pagePath,
			component: specialtyTourPageTemplate,
			// Context properties are passed into the component as graphql variables
			context: {
				pagePath: node.frontmatter.path,
			},
		});
	});
};
