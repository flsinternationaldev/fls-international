import React, { Fragment } from 'react';

import Section from '../section/Section';

import navHeroStyles from './NavHero.module.scss';

export default function NavHero({ pageTitle, hasNavButtons }) {
	const handleNavButtons = () => {
		return hasNavButtons ? (
			<Fragment>
				<div className="column is-one-third-desktop is-half-tablet">
					<button className={navHeroStyles.fls__pageHeroButton}>
						Apply Now
					</button>
				</div>
				<div className="column is-one-third-desktop is-half-tablet">
					<button className={navHeroStyles.fls__pageHeroButton}>
						Contact Us
					</button>
				</div>
				<div className="column is-one-third-desktop is-full-tablet">
					<button className={navHeroStyles.fls__pageHeroButton}>
						English Proficiency Test
					</button>
				</div>
			</Fragment>
		) : null;
	};
	return (
		<Section
			sectionClasses={['hero', 'is-medium', 'hero--page']}
			containerClasses={['hero-body', 'hero-body--page']}
			isFullWidthContainer={true}
		>
			<div className={navHeroStyles.fls__pageHeroCopyContainer}>
				<div className="container">
					<div className="columns is-multiline is-centered">
						<div className="column is-full">
							<h1 className={navHeroStyles.fls__pageHeroTitle}>
								{pageTitle}
							</h1>
						</div>

						{handleNavButtons}
					</div>
				</div>
			</div>
		</Section>
	);
}
