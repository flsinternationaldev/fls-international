import React from 'react';

import { HomePageTemplate } from '../../pages/index';

const HomePagePreview = ({ entry }) => {
	const data = entry.getIn(['data']).toJS();
	console.log('home data?', data);

	if (data) {
		// TODO: There must be a better way to pass in these arguments & destructure the parameters in HomePageTemplate
		return (
			<HomePageTemplate
				carousel_settings={data.carousel_settings}
				explore_your_world={data.explore_your_world}
				how_is_your_english={data.how_is_your_english}
				our_popular_programs={data.our_popular_programs}
				start_your_journey={data.start_your_journey}
			/>
		);
	} else {
		return <div>Loading...</div>;
	}
};

export default HomePagePreview;
