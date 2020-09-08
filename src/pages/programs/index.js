import React, { useState } from 'react';
import { graphql } from 'gatsby';

import 'src/bulma/bulma.scss';

import 'src/styles/programs.scss';
import sectionStyles from 'src/components/section/Section.module.scss';

import Layout from 'src/components/Layout';
import Section from 'src/components/section/Section';
// import sectionStyles from 'src/components/section/Section.module.scss';
export const ProgramsPageTemplate = (
	{
		/* program_cards*/
	}
) => {
	const [selectedProgramType, setSelectedProgramType] = useState('on-site');

	// TODO: Needs to come from CMS
	const programTypes = [
		{ type: 'on-site', label: 'On Site' },
		{ type: 'online', label: 'Online' },
		{ type: 'speciality-tours', label: 'Speciality Tours' },
	];

	const program_cards = [
		{
			card_title: 'Academic English',
			card_description:
				'Our high-powered Academic English Program offers the fastest way to develop your English.',
		},
		{
			card_title: 'Academic English',
			card_description:
				'Our high-powered Academic English Program offers the fastest way to develop your English.',
		},
		{
			card_title: 'Academic English',
			card_description:
				'Our high-powered Academic English Program offers the fastest way to develop your English.',
		},
		{
			card_title: 'Academic English',
			card_description:
				'Our high-powered Academic English Program offers the fastest way to develop your English.',
		},
		{
			card_title: 'Academic English',
			card_description:
				'Our high-powered Academic English Program offers the fastest way to develop your English.',
		},
	];

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
						<h1 className="title title--fls">
							Programs & Speciality Tours
						</h1>
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
								console.log('currentType', selectedProgramType);
								console.log('setting type', programType.type);
								setSelectedProgramType(programType.type);
							}}
						>
							{programType.label}
						</button>
					</div>
				))}
				{/* TODO: Keys should not be indices */}
				{program_cards.map(program_card => {
					return (
						<div className="column is-half-desktop is-full-tablet">
							<div className="programs__card">
								<div className="programs__card-content">
									<h5 className="programs__card-title">
										{program_card.card_title}
									</h5>
									<p className="programs__card-copy">
										{program_card.card_description}
									</p>
								</div>
								<div className="programs__card-img-container">
									<a
										href="#"
										className="fls__button fls__button--blue fls__button--card"
									>
										Read More
									</a>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</Section>
	);
};

const ProgramsPage = ({ data }) => {
	// const { frontmatter } = data.markdownRemark;

	// console.log('data from query', data);
	return (
		<Layout isScrolled={true} hasNavHero={true} pageTitle={'Programs'}>
			<ProgramsPageTemplate program_cards={''} />
		</Layout>
	);
};

export default ProgramsPage;
