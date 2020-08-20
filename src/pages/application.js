import React, { useEffect } from 'react';
import StepWizard from 'react-step-wizard';

import Layout from 'src/components/Layout';
import Section from 'src/components/section/Section';
import PersonalInfo from 'src/components/application/PersonalInfo';
import Address from 'src/components/application/Address';
import Steps from 'src/components/steps/Steps';

export const ApplicationTemplate = () => {
	return (
		// TODO: There's a bug with stepwizard wherein it fails if you provide only one child
		<Section sectionClasses={['section']} containerClasses={['container']}>
			<StepWizard isHashEnabled={true} nav={<Steps stepsNum={5} />}>
				<PersonalInfo hashKey={'personal-info'} />
				<Address hashKey={'billing-payment'} />
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
