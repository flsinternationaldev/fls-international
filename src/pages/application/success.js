import React, { Fragment } from 'react';

import Layout from 'src/components/Layout';
import Section from 'src/components/section/Section';

export const ApplicationSuccessTemplate = () => {
	return (
		<Section sectionClasses={['section']} containerClasses={['container']}>
			<div className="columns is-multiline">
				<div className="column is-full">
					<div className="fls-success__container">
						<h1 className="title title--fls un">Success!</h1>

						<p>
							You have successfully applied for an FLS program!
							You will be receiving an email from us at the email
							you provided in the application. For further
							questions about your application, please feel free
							to email us at <a href="#">info@fls.net</a>
						</p>
					</div>
				</div>
			</div>
		</Section>
	);
};

const ApplicationSuccessPage = ({ data }) => {
	// const { frontmatter } = data.markdownRemark;

	return (
		<Layout
			isScrolled={true}
			hasNavHero={true}
			pageTitle={'Application Success'}
		>
			<ApplicationSuccessTemplate />
		</Layout>
	);
};

export default ApplicationSuccessPage;
