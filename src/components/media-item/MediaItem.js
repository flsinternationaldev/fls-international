import React from 'react';

import mediaItemStyles from './MediaItem.module.scss';

export default function NavHero({ navItems = [], isDownloads }) {
	return (
		<div class={mediaItemStyles.fls__mediaContainer}>
			<div class={mediaItemStyles.fls__download}></div>
		</div>
	);
}
