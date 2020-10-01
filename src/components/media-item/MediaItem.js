import React from 'react';

import mediaItemStyles from './MediaItem.module.scss';

export default function NavHero({ navItems = [], isDownloads }) {
	return (
		<div className={mediaItemStyles.fls__mediaContainer}>
			<div className={mediaItemStyles.fls__download}></div>
		</div>
	);
}
