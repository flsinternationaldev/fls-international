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
		`gatsby-plugin-netlify-cms`,
		{
			resolve: `gatsby-plugin-google-fonts`,
			options: {
				// TODO: Italics
				fonts: [`Montserrat\:300,400,500,600`],
				display: 'swap',
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `markdown-pages`,
				path: `${__dirname}/blog`,
			},
		},
		`gatsby-transformer-remark`,
	],
};
