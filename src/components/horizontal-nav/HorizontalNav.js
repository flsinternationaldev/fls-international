import React from 'react';

import navHeroStyles from './HorizontalNav.module.scss';

export default function NavHero({ navItems = [], isDownloads }) {
	return (
		<div class="column is-full">
			<div class={`columns is-multiline ${navHeroStyles.fls__nav}`}>
				{navItems.map(navItem => {
					return (
						<div
							class={`column is-2-desktop is-one-third-tablet ${
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
