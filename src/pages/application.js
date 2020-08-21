import React, { useEffect } from 'react';
import StepWizard from 'react-step-wizard';

import Layout from 'src/components/Layout';
import Section from 'src/components/section/Section';
import Steps from 'src/components/steps/Steps';
import PersonalInfo from 'src/components/application/PersonalInfo';
import Address from 'src/components/application/Address';
import AdditionalInfo from 'src/components/application/AdditionalInfo';
import MoreInfo from 'src/components/application/MoreInfo';
import Billing from 'src/components/application/Billing';

export const ApplicationTemplate = () => {
	return (
		// TODO: There's a bug with stepwizard wherein it fails if you provide only one child
		<Section sectionClasses={['section']} containerClasses={['container']}>
			<StepWizard isHashEnabled={true} nav={<Steps stepsNum={5} />}>
				<PersonalInfo hashKey={'personal-info'} />
				<Address hashKey={'address'} />
				{/* TODO: Might want to consider unifying these two components, if
				the step wizard allows duplicates */}
				<AdditionalInfo hashKey={'additional-info'} />
				<MoreInfo hashKey={'more-info'} />
				<Billing hashKey={'billing'} />
			</StepWizard>
		</Section>
	);
};

const ApplicationPage = ({ data }) => {
	// const { frontmatter } = data.markdownRemark;

	// TODO: Page title needs to change as user progress through application
	return (
		<Layout
			isScrolled={true}
			hasNavHero={true}
			hasNavButtons={false}
			pageTitle={'Personal Information'}
		>
			<ApplicationTemplate />
		</Layout>
	);
};

export default ApplicationPage;

// TODO: Here, all the individual fields are specified.
// Is there a way to just say 'get all fields'?
// export const pageQuery = graphql`
// 	query {
// 		markdownRemark {
// 			frontmatter {
// 				program_cards {
// 					card_description
// 					card_image
// 					card_title
// 				}
// 			}
// 		}
// 	}
// `;
