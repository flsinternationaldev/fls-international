import React from 'react';

import { HomePageTemplate } from '../../pages/index';

const HomePagePreview = ({ entry }) => {
	const home = entry.getIn(['data']).toJS();
	return <HomePageTemplate home={home} />;
};

export default HomePagePreview;
