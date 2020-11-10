import React from 'react';

import OnlineProgramPageTemplate from 'src/components/OnlineProgramPage';
import { kebabToSnake } from 'src/utils/helpers';

const OnlineProgramPagePreview = ({ entry }) => {
	const data = entry.getIn(['data']).toJS();

	if (data) {
		let formattedData = {};

		for (const prop in data) {
			formattedData[kebabToSnake(prop)] = data[prop];
		}

		return <OnlineProgramPageTemplate previewData={formattedData} />;
	} else {
		return <div>Loading...</div>;
	}
};

export default OnlineProgramPagePreview;
