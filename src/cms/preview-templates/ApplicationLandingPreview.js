import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import ApplicationLanding from '../../components/application/ApplicationLanding';

const ApplicationLandingPreview = ({ entry }) => {
	const data = entry.getIn(['data']).toJS();

	if (data) {
		// TODO: There must be a better way to pass in these arguments & destructure the parameters in HomePageTemplate
		return <ApplicationLanding />;
	} else {
		return <div>Loading...</div>;
	}
};

export default ApplicationLandingPreview;
