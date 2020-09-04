import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Slick from 'react-slick';

import Layout from 'src/components/Layout';
import Section from 'src/components/section/Section';
import Testimonial from 'src/components/testimonial/Testimonial';
import QuickFacts from 'src/components/quick-facts/QuickFacts';
import PriceCalculator from 'src/components/price-calculator/PriceCalculator';
import MarkdownContent from 'src/components/MarkdownContent.js';

import 'slick-carousel/slick/slick.css';

export const LocationPageTemplate = ({ locationPageData }) => {
	// TODO: See if there isn't some way to implement the 'alt' sections from before (i.e. the blocks with light gray backgrounds)
	const postContent = locationPageData.post_content;

	const slickSettings = {
		autoplay: true,
		arrows: false,
		autoplaySpeed: 4000,
	};

	return (
		<Section>
			<div className="columns is-multiline">
				<div className="column is-3-desktop is-full-tablet">
					<PriceCalculator />

					<QuickFacts data={locationPageData.quick_facts} />

					<Testimonial />
				</div>
				<div className="column is-9-desktop is-full-tablet">
					<div className="columns is-multiline">
						<div className="column is-full">
							{/* TODO: Again, these 'programs' classes need genericizing */}
							<h2 className="programs__post-title">
								{locationPageData.name}
							</h2>
						</div>

						<div className="column is-full">
							<div className="fls__location-post-carousel">
								<Slick {...slickSettings}>
									{locationPageData.carousel_images.map(
										carouselImagePath => {
											return (
												<img
													key={carouselImagePath}
													src={carouselImagePath}
													alt={`${locationPageData.name} carousel image`}
												/>
											);
										}
									)}
								</Slick>
							</div>
						</div>

						<div className="column is-full">
							<div className="columns is-variable is-1">
								<div className="column">
									<a className="fls__location-post-anchor-button">
										Overview
									</a>
								</div>

								<div className="column">
									<a className="fls__location-post-anchor-button">
										Campus Profile
									</a>
								</div>

								<div className="column">
									<a className="fls__location-post-anchor-button">
										Area Profile
									</a>
								</div>

								<div className="column">
									<a className="fls__location-post-anchor-button">
										Programs Offered
									</a>
								</div>
							</div>
						</div>

						<div className="column is-full">
							<MarkdownContent
								content={postContent}
								classMap={{
									h2: 'fls-post__subtitle',
									h3: 'fls__location-post-subtitle',
									p: 'fls__post-copy',
									ul: 'fls__location-post-list',
									li: 'fls__list-item fls__list-item--small',
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
};

const LocationPage = ({ pageContext }) => {
	const { pagePath } = pageContext;

	const data = useStaticQuery(graphql`
		{
			allMarkdownRemark(
				limit: 1000
				filter: { fileAbsolutePath: { regex: "/location-page//" } }
			) {
				edges {
					node {
						frontmatter {
							path
							post_content
							name
							carousel_images
							quick_facts {
								name
								icon
								items
							}
						}
					}
				}
			}
		}
	`);

	const locationPageData = data.allMarkdownRemark.edges.find(
		edge => edge.node.frontmatter.path === pagePath
	).node.frontmatter;

	return (
		<Layout
			isScrolled={true}
			hasNavHero={true}
			pageTitle={'English Language Programs'}
		>
			<LocationPageTemplate locationPageData={locationPageData} />
		</Layout>
	);
};

export default LocationPage;
