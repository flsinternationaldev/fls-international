// TODO: I think the gatsby docs need to be updated to include this import
// https://www.gatsbyjs.com/docs/creating-and-modifying-pages/
const path = require('path');

exports.createPages = async ({ graphql, actions, reporter }) => {
	const { createPage } = actions;

	const locations = await graphql(
		`
			{
				allMarkdownRemark(
					limit: 1000
					filter: { fileAbsolutePath: { regex: "/location-page//" } }
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
					filter: { fileAbsolutePath: { regex: "/program-page//" } }
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
		const pagePath = `programs/on-site/${node.frontmatter.path}`;

		createPage({
			path: pagePath,
			component: programPageTemplate,
			// Context properties are passed into the component as graphql variables
			context: {
				pagePath: node.frontmatter.path,
			},
		});
	});
};
