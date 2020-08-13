import React from 'react';

import navHeroStyles from './HorizontalNav.module.scss';

export default function NavHero() {
	const navLinks = [
		'Welcome',
		'Mission Statement',
		'FLS Advantage',
		'Ethical Conduct',
		'Accreditations',
		'Our Team',
	];

	return (
		<div class="column is-full">
			<div class={`columns is-multiline ${navHeroStyles.fls__nav}`}>
				{navLinks.map(navLink => {
					return (
						<div
							class={`column is-2-desktop is-one-third-tablet ${navHeroStyles.fls__navItem}`}
						>
							{navLink}
						</div>
					);
				})}
			</div>
		</div>
	);
}
