import React from 'react';

import SpecialtyToursPageTemplate from '../../components/SpecialtyToursPage';
import { kebabToSnake } from '../../utils/helpers';

const SpecialtyToursPagePreview = ({ entry }) => {
	const data = entry.getIn(['data']).toJS();

	if (data) {
		let formattedData = {};

		for (const prop in data) {
			formattedData[kebabToSnake(prop)] = data[prop];
		}

		return <SpecialtyToursPageTemplate previewData={formattedData} />;
	} else {
		return <div>Loading...</div>;
	}
};

export default SpecialtyToursPagePreview;
