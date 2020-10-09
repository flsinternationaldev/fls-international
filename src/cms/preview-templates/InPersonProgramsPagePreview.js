import React from 'react';

import InPersonProgramPageTemplate from '../../components/InPersonProgramPage';
import { kebabToSnake } from '../../utils/helpers';

const InPersonProgramPagePreview = ({ entry }) => {
	const data = entry.getIn(['data']).toJS();

	if (data) {
		let formattedData = {};

		for (const prop in data) {
			formattedData[kebabToSnake(prop)] = data[prop];
		}

		console.log('formattedData', formattedData);
		return <InPersonProgramPageTemplate previewData={formattedData} />;
	} else {
		return <div>Loading...</div>;
	}
};

export default InPersonProgramPagePreview;
