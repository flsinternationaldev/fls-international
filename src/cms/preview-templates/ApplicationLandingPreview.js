import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import ApplicationLanding from '../../components/application/ApplicationLanding';

const ApplicationLandingPreview = ({ entry }) => {
	const data = entry.getIn(['data']).toJS();

	const newData = {
		on_location_program_information:
			data['on-location-program-information'],
	};
	// if (data) {
	// TODO: There must be a better way to pass in these arguments & destructure the parameters in HomePageTemplate
	return <ApplicationLanding on_location_program_information={newData} />;
	// } else {
	// 	return <div>Loading...</div>;
	// }
};

export default ApplicationLandingPreview;
