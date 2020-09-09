import React, { useState } from 'react';
import { graphql, useStaticQuery, navigate } from 'gatsby';

import 'src/bulma/bulma.scss';

import 'src/styles/programs.scss';
import sectionStyles from 'src/components/section/Section.module.scss';

import Layout from 'src/components/Layout';
import Section from 'src/components/section/Section';
import Card from 'src/components/Card/card';
// import sectionStyles from 'src/components/section/Section.module.scss';

export const ProgramsPageTemplate = ({ data, location }) => {
	// TODO: Does this need to be codified in the CMS?
	const programTypes = [
		{ type: 'in-person', label: 'In Person' },
		{ type: 'online', label: 'Online' },
		{ type: 'speciality-tours', label: 'Speciality Tours' },
	];

	const [selectedProgramType, setSelectedProgramType] = useState(
		location.hash.substring(1) || 'in-person'
	);

	const renderProgramsView = hash => {
		let view = <div></div>;

		// TODO: Part of this map is a repeated pattern with all these graphql queries. Think about creating some kind of mixin
		const filteredData = data.allMarkdownRemark.edges
			.map(edge => edge.node.frontmatter)
			.filter(program => program.programType === selectedProgramType);

		console.log('filtered data', filteredData);

		if (hash.includes('in-person')) {
			view = filteredData.map(cardData => {
				return (
					<div className="column is-half">
						<Card cardData={cardData}></Card>
					</div>
				);
			});
		}

		return view;
	};

	return (
		<Section
			sectionClasses={['section', 'programs']}
			containerClasses={['container']}
		>
			<div className="columns is-centered is-multiline">
				<div className="column is-full">
					<div className={sectionStyles.section__titleContainer}>
						<h3 className="subtitle subtitle--fls subtitle--red">
							Our Offerings
						</h3>
						<h1 className="title title--fls">Programs</h1>
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

				{renderProgramsView(location.hash)}
			</div>
		</Section>
	);
};

const ProgramsPage = ({ /*data, */ location }) => {
	// const { frontmatter } = data.markdownRemark;

	const data = useStaticQuery(graphql`
		{
			allMarkdownRemark(
				limit: 1000
				filter: { fileAbsolutePath: { regex: "/program-pages//" } }
			) {
				edges {
					node {
						frontmatter {
							description
							path
							name
							programType
							program_details {
								lessons_per_week
								hours_per_week
							}
							hero_image
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
