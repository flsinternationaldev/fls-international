import React, { Fragment } from 'react';
import { graphql } from 'gatsby';

import Layout from 'src/components/Layout';
import Section from 'src/components/section/Section';
import Testimonial from 'src/components/testimonial/Testimonial';
import PostNavbar from 'src/components/post-navbar/PostNavbar';
import MarkdownContent from 'src/components/MarkdownContent.js';

import 'slick-carousel/slick/slick.css';

export const InPersonProgramPageTemplate = ({
	programPageData,
	allProgramNavData,
	isPreview,
}) => {
	return (
		<Section>
			<div className="columns is-multiline">
				{/* TODO: We want to implement testimonials, but not just yet */}
				{/* <div className="column is-3-desktop is-full-tablet">
					{isPreview ? null : (
						<Fragment>
							<PostNavbar data={allProgramNavData} />
							<Testimonial />
						</Fragment>
					)}
				</div> */}

				<div className="column is-full is-full-tablet">
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
									alt={`${programPageData.name} hero`}
								/>
							</div>
						</div>

						<div className="column is-full">
							<div className="fls-post__subhero">
								<span className="fls-post__subhero-item">
									{`${programPageData.programDetails.lessonsPerWeek} lessons per week`}
								</span>
								<span className="fls-post__subhero-item">
									{`${programPageData.programDetails.hoursPerWeek} hours per week`}
								</span>
								<span className="fls-post__subhero-item fls--red">
									{`*1 lesson = ${programPageData.programDetails.minutesPerLesson} minutes`}
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
										h2: 'fls-post__subtitle',
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

const InPersonProgramPage = ({ data, pageContext, previewData }) => {
	let programPageData, allProgramNavData;

	if (!previewData) {
		const { pagePath } = pageContext;

		programPageData = data.allMarkdownRemark.edges.find(
			edge => edge.node.frontmatter.path === pagePath
		).node.frontmatter;

		allProgramNavData = data.allMarkdownRemark.edges.map(edge => {
			return {
				path: `/programs/in-person/${edge.node.frontmatter.path}`,
				name: edge.node.frontmatter.name,
			};
		});

		return (
			<Layout
				isScrolled={true}
				hasNavHero={true}
				hasNavButtons={true}
				pageTitle={'In-Person Programs'}
			>
				<InPersonProgramPageTemplate
					programPageData={programPageData}
					allProgramNavData={allProgramNavData}
				/>
			</Layout>
		);
	} else {
		programPageData = previewData;

		return (
			<InPersonProgramPageTemplate
				programPageData={programPageData}
				allProgramNavData={allProgramNavData}
				isPreview={true}
			/>
		);
	}
};

export default InPersonProgramPage;

export const InPersonProgramsPageData = graphql`
	{
		allMarkdownRemark(
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
						name
						hero_image
						programDetails {
							hoursPerWeek
							lessonsPerWeek
							minutesPerLesson
						}
						program_post_content
						program_features_content
					}
				}
			}
		}
	}
`;
