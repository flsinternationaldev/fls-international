import React from 'react';

import LocationPageTemplate from '../../components/LocationPage';
import { kebabToSnake } from '../../utils/helpers';

const LocationPagePreview = ({ entry }) => {
	const data = entry.getIn(['data']).toJS();

	if (data) {
		let formattedData = {};

		for (const prop in data) {
			formattedData[kebabToSnake(prop)] = data[prop];
		}

		return <LocationPageTemplate previewData={formattedData} />;
	} else {
		return <div>Loading...</div>;
	}
};

export default LocationPagePreview;
