import React from 'react';

import Section from '../section/Section';

import navHeroStyles from './NavHero.module.scss';

export default function NavHero(props) {
	console.log('styles', navHeroStyles);
	// TODO: The carousel needs to be its own component
	const slickSettings = {
		autoplay: true,
		draggable: false,
		// TODO: Weird outline borders appear when clicking on the carousel
		focusOnSelect: false,
		arrows: false,
		autoplaySpeed: 4000,
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
								Programs
							</h1>
						</div>

						<div className="column is-one-third-desktop is-half-tablet">
							<button
								className={navHeroStyles.fls__pageHeroButton}
							>
								Apply Now
							</button>
						</div>
						<div className="column is-one-third-desktop is-half-tablet">
							<button
								className={navHeroStyles.fls__pageHeroButton}
							>
								Contact Us
							</button>
						</div>
						<div className="column is-one-third-desktop is-full-tablet">
							<button
								className={navHeroStyles.fls__pageHeroButton}
							>
								English Proficiency Test
							</button>
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
}
