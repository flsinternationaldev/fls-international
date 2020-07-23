/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
	siteMetadata: {
		title: 'FLS International',
	},
	plugins: [
		`gatsby-plugin-sass`,
		{
			resolve: `gatsby-plugin-google-fonts`,
			options: {
				// TODO: Italics
				fonts: [`Montserrat\:300,400,500,600`],
				display: 'swap',
			},
		},
	],
};
