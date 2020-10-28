import React, { useState } from 'react';
import { graphql, useStaticQuery, navigate } from 'gatsby';

import 'src/bulma/bulma.scss';

import 'src/styles/programs.scss';
import sectionStyles from 'src/components/section/Section.module.scss';

import Layout from 'src/components/Layout';
import Section from 'src/components/section/Section';
import Card from 'src/components/card/Card';

export const ProgramsPageTemplate = ({ data, location }) => {
	// TODO: Does this need to be codified in the CMS?
	const programTypes = [
		{ type: 'in-person', label: 'In Person' },
		{ type: 'online', label: 'Online' },
		{ type: 'specialty-tours', label: 'Specialty Tours' },
	];

	const [selectedProgramType, setSelectedProgramType] = useState(
		location.hash.substring(1) || 'in-person'
	);

	const renderProgramsView = () => {
		let view = <div></div>;

		// TODO: Part of this map is a repeated pattern with all these graphql queries. Think about creating some kind of mixin
		const filteredData = data[
			selectedProgramType.replace(/-([a-z])/g, g => g[1].toUpperCase())
		].edges.map(edge => edge.node.frontmatter);

		view = filteredData.map(cardData => {
			return (
				<div className="column is-half">
					<Card
						programType={selectedProgramType}
						cardData={cardData}
					></Card>
				</div>
			);
		});

		return view;
	};

	const renderProgramTypeDescription = selectedProgramType => {
		const selectedProgramTypeCopy = data.programTypesCopy.edges.reduce(
			(accum, edge) =>
				Object.assign(
					{},
					edge.node.frontmatter.programTypeDescriptions
				),
			{}
			// TODO: This replace turns snake case to camelCase. It's annoying, but, it works
		)[selectedProgramType.replace(/-([a-z])/g, g => g[1].toUpperCase())];

		return <div>{selectedProgramTypeCopy}</div>;
	};

	return (
		<Section
			sectionClasses={['section', 'programs']}
			containerClasses={['container']}
		>
			<div className="columns is-multiline">
				<div className="column is-full">
					<div className={sectionStyles.section__titleContainer}>
						<h3 className="subtitle subtitle--fls subtitle--red">
							Our Offerings
						</h3>
						<h1 className="title title--fls">Programs</h1>
					</div>
				</div>

				<div className="column is-full">
					<div className="has-text-centered">
						{renderProgramTypeDescription(selectedProgramType)}
					</div>
				</div>

				{programTypes.map(programType => (
					<div className="column is-one-third">
						<button
							className={`fls__button ${
								programType.type === selectedProgramType
									? 'fls__button--selected'
									: ''
							}`}
							onClick={() => {
								setSelectedProgramType(() => {
									navigate(`#${programType.type}`);
									return programType.type;
								});
							}}
						>
							{programType.label}
						</button>
					</div>
				))}

				{renderProgramsView(selectedProgramType)}
			</div>
		</Section>
	);
};

const ProgramsPage = ({ /*data, */ location }) => {
	const data = useStaticQuery(graphql`
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
							description
							path
							name
							programDetails {
								lessonsPerWeek
								hoursPerWeek
							}
							hero_image
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
							description
							path
							name
							programDetails {
								lessonsPerWeek
								hoursPerWeek
							}
							hero_image
						}
					}
				}
			}
			specialtyTours: allMarkdownRemark(
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
							programDetails {
								minimumAge
								durationRelation
							}
							carousel_images
							specialty_tour_description
						}
					}
				}
			}
			programTypesCopy: allMarkdownRemark(
				limit: 1000
				filter: { fileAbsolutePath: { regex: "/pages/static//" } }
			) {
				edges {
					node {
						frontmatter {
							programTypeDescriptions {
								specialityTours
								inPerson
								online
							}
						}
					}
				}
			}
		}
	`);

	return (
		<Layout isScrolled={true} hasNavHero={true} pageTitle={'Programs'}>
			<ProgramsPageTemplate
				data={data}
				location={location}
				program_cards={''}
			/>
		</Layout>
	);
};

export default ProgramsPage;
