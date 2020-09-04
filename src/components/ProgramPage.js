import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from 'src/components/Layout';
import Section from 'src/components/section/Section';
import Testimonial from 'src/components/testimonial/Testimonial';
import PostNavbar from 'src/components/post-navbar/PostNavbar';
import MarkdownContent from 'src/components/MarkdownContent.js';

import 'slick-carousel/slick/slick.css';

export const ProgramPageTemplate = ({ programPageData }) => {
	// TODO: See if there isn't some way to implement the 'alt' sections from before (i.e. the blocks with light gray backgrounds)

	return (
		<Section>
			<div className="columns is-multiline">
				<div className="column is-3-desktop is-full-tablet">
					<PostNavbar />
					<Testimonial />
				</div>
				<div className="column is-9-desktop is-full-tablet">
					<div className="columns is-multiline">
						<div className="column is-full">
							{/* TODO: Again, these 'programs' classes need genericizing */}
							<h2 className="programs__post-title">
								Vacation English
							</h2>
						</div>

						<div className="column is-full">
							<div className="fls-post__hero">
								<img src="" alt="" />
							</div>
						</div>

						<div className="column is-full">
							<div className="fls-post__subhero">
								<span className="fls-post__subhero-item">
									18 lessons per week
								</span>
								<span className="fls-post__subhero-item">
									15 hours per week
								</span>
								<span className="fls-post__subhero-item fls--red">
									*1 lesson = 50 minutes
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
};

const ProgramPage = ({ pageContext }) => {
	const { pagePath } = pageContext;

	// const data = useStaticQuery(graphql`
	// 	{
	// 		allMarkdownRemark(
	// 			limit: 1000
	// 			filter: { fileAbsolutePath: { regex: "/location-page//" } }
	// 		) {
	// 			edges {
	// 				node {
	// 					frontmatter {
	// 						path
	// 						post_content
	// 						name
	// 						carousel_images
	// 						quick_facts {
	// 							name
	// 							icon
	// 							items
	// 						}
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// `);

	// const locationPageData = data.allMarkdownRemark.edges.find(
	// 	edge => edge.node.frontmatter.path === pagePath
	// ).node.frontmatter;

	const programPageData = {};

	return (
		<Layout
			isScrolled={true}
			hasNavHero={true}
			pageTitle={'On-Site Programs'}
		>
			<ProgramPageTemplate programPageData={programPageData} />
		</Layout>
	);
};

export default ProgramPage;
