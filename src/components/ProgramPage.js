import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from 'src/components/Layout';
import Section from 'src/components/section/Section';
import Testimonial from 'src/components/testimonial/Testimonial';
import PostNavbar from 'src/components/post-navbar/PostNavbar';
import MarkdownContent from 'src/components/MarkdownContent.js';

import 'slick-carousel/slick/slick.css';

export const ProgramPageTemplate = ({ programPageData }) => {
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
								{programPageData.name}
							</h2>
						</div>

						<div className="column is-full">
							<div className="fls-post__hero">
								<img
									src={programPageData.hero_image}
									alt={`${programPageData.name} hero image`}
								/>
							</div>
						</div>

						<div className="column is-full">
							<div className="fls-post__subhero">
								<span className="fls-post__subhero-item">
									{`${programPageData.program_details.lessons_per_week} lessons per week`}
								</span>
								<span className="fls-post__subhero-item">
									{`${programPageData.program_details.hours_per_week} hours per week`}
								</span>
								<span className="fls-post__subhero-item fls--red">
									{`*1 lesson = ${programPageData.program_details.minutes_per_lesson} minutes`}
								</span>
							</div>
						</div>

						<div className="column is-full">
							<div className="fls-post__copy-container">
								<MarkdownContent
									content={
										programPageData.program_post_content
									}
									classMap={{
										p: 'fls-post__paragraph',
									}}
								/>
							</div>
						</div>

						<div className="column is-full fls-post__copy-container fls-post__copy-container--alt">
							<MarkdownContent
								content={
									programPageData.program_features_content
								}
								classMap={{
									h2: 'fls-post__subtitle',
									p: 'fls-post__paragraph',
									ul: 'fls__location-post-list',
									li: 'fls__list-item',
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
};

const ProgramPage = ({ pageContext }) => {
	const { pagePath } = pageContext;

	const data = useStaticQuery(graphql`
		{
			allMarkdownRemark(
				limit: 1000
				filter: { fileAbsolutePath: { regex: "/program-page//" } }
			) {
				edges {
					node {
						frontmatter {
							path
							post_content
							name
							hero_image
							program_details {
								hours_per_week
								lessons_per_week
								minutes_per_lesson
							}
							program_post_content
							program_features_content
						}
					}
				}
			}
		}
	`);

	const programPageData = data.allMarkdownRemark.edges.find(
		edge => edge.node.frontmatter.path === pagePath
	).node.frontmatter;

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
