import React from 'react';

import { ProgramsPageTemplate } from '../../pages/programs';

const ProgramsPagePreview = ({ entry }) => {
	const data = entry.getIn(['data']).toJS();
	console.log('programs data?', data);

	if (data) {
		// TODO: There must be a better way to pass in these arguments & destructure the parameters in HomePageTemplate
		return <ProgramsPageTemplate program_cards={data.program_cards} />;
	} else {
		return <div>Loading...</div>;
	}
};

export default ProgramsPagePreview;
