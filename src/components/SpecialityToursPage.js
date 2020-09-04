import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Slick from 'react-slick';

import Layout from 'src/components/Layout';
import Section from 'src/components/section/Section';
import Testimonial from 'src/components/testimonial/Testimonial';
import PostNavbar from 'src/components/post-navbar/PostNavbar';
import MarkdownContent from 'src/components/MarkdownContent.js';

import 'slick-carousel/slick/slick.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

export const SpecialityTourPageTemplate = ({
	specialityTourData,
	allSpecialityTourNavData,
}) => {
	const slickSettings = {
		autoplay: true,
		arrows: false,
		autoplaySpeed: 4000,
	};

	return (
		<Section>
			<div className="columns is-multiline">
				<div className="column is-3-desktop is-full-tablet">
					<PostNavbar data={allSpecialityTourNavData} />
					<Testimonial />
				</div>

				<div className="column is-9-desktop is-full-tablet">
					<div className="columns is-multiline">
						<div className="column is-full">
							{/* TODO: Again, these 'programs' classes need genericizing */}
							<h2 className="programs__post-title">
								{specialityTourData.name}
							</h2>
						</div>

						<div className="column is-full">
							<div className="fls__location-post-carousel">
								<Slick {...slickSettings}>
									{specialityTourData.carousel_images.map(
										carouselImagePath => {
											return (
												<img
													key={carouselImagePath}
													src={carouselImagePath}
													alt={`${specialityTourData.name} carousel image`}
												/>
											);
										}
									)}
								</Slick>
							</div>
						</div>
					</div>

					<div className="column is-full">
						<div className="fls-post__subhero">
							<span className="fls-post__subhero-item">
								<FontAwesomeIcon
									className="fls-post__subhero-icon"
									icon={faUserAlt}
								/>{' '}
								{`Age ${specialityTourData.speciality_tour_details.minimum_age}+`}
							</span>

							<span className="fls-post__subhero-item">
								<FontAwesomeIcon
									className="fls-post__subhero-icon"
									icon={faCalendarAlt}
								/>{' '}
								{`${specialityTourData.speciality_tour_details.number_of_weeks} weeks`}
							</span>
						</div>
					</div>

					<div className="column is-full">
						{specialityTourData.speciality_tour_description}
					</div>

					<div className="column is-full">
						<div className="fls-post__copy-container fls-post__copy-container--alt">
							<h3 className="fls-post__subtitle">
								Activities and Excursions
							</h3>

							<MarkdownContent
								content={
									specialityTourData.activities_and_excursions
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

					<div className="column is-full">
						<div className="fls-post__copy-container">
							<h3 className="fls-post__subtitle">Features</h3>

							<MarkdownContent
								content={specialityTourData.features}
								classMap={{
									h2: 'fls-post__subtitle',
									p: 'fls-post__paragraph',
									ul: 'fls__location-post-list',
									li: 'fls__list-item',
								}}
							/>
						</div>
					</div>

					<div className="column is-full">
						<div className="fls-post__copy-container fls-post__copy-container--alt">
							<h3 className="fls-post__subtitle">
								Accommodatons
							</h3>

							<MarkdownContent
								content={specialityTourData.accommodations}
								classMap={{
									h2: 'fls-post__subtitle',
									p: 'fls-post__paragraph',
									ul: 'fls__location-post-list',
									li: 'fls__list-item',
								}}
							/>
						</div>
					</div>

					<div className="column is-full">
						<div className="fls-post__copy-container">
							<div className="fls-post__copy-container-header">
								<h3 className="fls-post__subtitle">
									Program Dates
								</h3>

								<span className="fls-post__sample-calendar fls--red">
									<FontAwesomeIcon
										className="fls-post__subhero-icon fls--red"
										icon={faCalendarAlt}
									/>
									<a
										href={
											specialityTourData.sample_calendar
										}
										className="fls--red"
										target="_blank"
									>
										<strong>VIEW A SAMPLE CALENDAR</strong>
									</a>
								</span>
							</div>
							{/* Don't let the class name fool you, I refuse to
							use actual tables */}

							{/* TODO: This totally breaks on mobile */}
							<div className="fls-post__table-header">
								<div className="columns">
									<span className="column is-one-quarter">
										Arrive
									</span>
									<span className="column is-one-quarter">
										Depart
									</span>
									<span className="column is-one-quarter">
										Price
									</span>
									<span className="column is-one-quarter"></span>
								</div>
							</div>
							{specialityTourData.program_dates.map(
								programDate => (
									<div className="fls-post__table-row">
										<div className="columns">
											<span className="column is-one-quarter">
												{programDate.arrive}
											</span>
											<span className="column is-one-quarter">
												{programDate.depart}
											</span>
											<span className="column is-one-quarter">
												{programDate.price}
											</span>
											<span className="column is-one-quarter">
												<button className="fls__button fls__button--small">
													Apply
												</button>
											</span>
										</div>
									</div>
								)
							)}
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
};

const SpecialityTourPage = ({ pageContext }) => {
	const { pagePath } = pageContext;

	const data = useStaticQuery(graphql`
		{
			allMarkdownRemark(
				limit: 1000
				filter: {
					fileAbsolutePath: { regex: "/speciality-tour-page//" }
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
	`);

	const specialityTourData = data.allMarkdownRemark.edges.find(
		edge => edge.node.frontmatter.path === pagePath
	).node.frontmatter;

	const allSpecialityTourNavData = data.allMarkdownRemark.edges.map(edge => {
		return {
			path: `/programs/speciality-tours/${edge.node.frontmatter.path}`,
			name: edge.node.frontmatter.name,
		};
	});

	console.log('current speicality tour data', specialityTourData);
	return (
		<Layout
			isScrolled={true}
			hasNavHero={true}
			hasNavButtons={true}
			pageTitle={'On-Site Programs'}
		>
			<SpecialityTourPageTemplate
				specialityTourData={specialityTourData}
				allSpecialityTourNavData={allSpecialityTourNavData}
			/>
		</Layout>
	);
};

export default SpecialityTourPage;
