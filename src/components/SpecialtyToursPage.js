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

export const SpecialtyTourPageTemplate = ({
	specialtyTourData,
	allSpecialtyTourNavData,
}) => {
	const slickSettings = {
		autoplay: true,
		arrows: false,
		autoplaySpeed: 4000,
		infinite: true,
	};

	return (
		<Section>
			<div className="columns is-multiline">
				<div className="column is-3-desktop is-full-tablet">
					<PostNavbar data={allSpecialtyTourNavData} />
					<Testimonial />
				</div>

				<div className="column is-9-desktop is-full-tablet">
					<div className="columns is-multiline">
						<div className="column is-full">
							{/* TODO: Again, these 'programs' classes need genericizing */}
							<h2 className="programs__post-title">
								{specialtyTourData.name}
							</h2>
						</div>

						<div className="column is-full">
							<div className="fls__location-post-carousel">
								<Slick {...slickSettings}>
									{specialtyTourData.carousel_images.map(
										carouselImagePath => {
											return (
												<img
													key={carouselImagePath}
													src={carouselImagePath}
													alt={`${specialtyTourData.name} carousel image`}
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
								{`Age ${specialtyTourData.programDetails.minimumAge}+`}
							</span>

							<span className="fls-post__subhero-item">
								<FontAwesomeIcon
									className="fls-post__subhero-icon"
									icon={faCalendarAlt}
								/>{' '}
								{`${specialtyTourData.programDetails.duration} weeks`}
							</span>
						</div>
					</div>

					<div className="column is-full">
						{specialtyTourData.specialty_tour_description}
					</div>

					<div className="column is-full">
						<div className="fls-post__copy-container fls-post__copy-container--alt">
							<h3 className="fls-post__subtitle">
								Activities and Excursions
							</h3>

							<MarkdownContent
								content={
									specialtyTourData.activities_and_excursions
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
								content={specialtyTourData.features}
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
								content={specialtyTourData.accommodations}
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
										href={specialtyTourData.sampleCalendar}
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
							{specialtyTourData.programDates.map(programDate => (
								<div
									className="fls-post__table-row"
									key={programDate.arrive}
								>
									<div className="columns">
										<span className="column is-one-quarter">
											{programDate.arrive}
										</span>
										<span className="column is-one-quarter">
											{programDate.depart}
										</span>
										<span className="column is-one-quarter">
											$
											{
												specialtyTourData.programDetails
													.price
											}
										</span>
										<span className="column is-one-quarter">
											<button className="fls__button fls__button--small">
												Apply
											</button>
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
};

const SpecialtyTourPage = ({ pageContext }) => {
	const { pagePath } = pageContext;

	const data = useStaticQuery(graphql`
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
							name
							accommodations
							activities_and_excursions
							features
							programDates {
								arrive
								depart
							}
							carousel_images
							sampleCalendar
							specialty_tour_description
							programDetails {
								duration
								minimumAge
								price
							}
						}
					}
				}
			}
		}
	`);

	const specialtyTourData = data.allMarkdownRemark.edges.find(
		edge => edge.node.frontmatter.path === pagePath
	).node.frontmatter;

	const allSpecialtyTourNavData = data.allMarkdownRemark.edges.map(edge => {
		return {
			path: `/programs/specialty-tours/${edge.node.frontmatter.path}`,
			name: edge.node.frontmatter.name,
		};
	});

	console.log('current speicality tour data', specialtyTourData);
	return (
		<Layout
			isScrolled={true}
			hasNavHero={true}
			hasNavButtons={true}
			pageTitle={'Specialty Tours'}
		>
			<SpecialtyTourPageTemplate
				specialtyTourData={specialtyTourData}
				allSpecialtyTourNavData={allSpecialtyTourNavData}
			/>
		</Layout>
	);
};

export default SpecialtyTourPage;
