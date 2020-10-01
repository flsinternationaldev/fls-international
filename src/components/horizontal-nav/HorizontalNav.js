import React from 'react';

import navHeroStyles from './HorizontalNav.module.scss';

export default function NavHero({ navItems = [], isDownloads }) {
	return (
		<div className="column is-full">
			<div className={`columns is-multiline ${navHeroStyles.fls__nav}`}>
				{navItems.map(navItem => {
					return (
						<div
							className={`column is-2-desktop is-one-third-tablet ${
								navHeroStyles.fls__navItem
							} ${isDownloads ? 'fls__nav-item--downloads' : ''}`}
						>
							{navItem}
						</div>
					);
				})}
			</div>
		</div>
	);
}
