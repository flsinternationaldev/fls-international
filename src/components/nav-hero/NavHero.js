import React, { Fragment } from 'react';
import { Link } from 'gatsby';

import Section from 'src/components/section/Section';

import navHeroStyles from './NavHero.module.scss';

export default function NavHero({ pageTitle, hasNavButtons }) {
	const handleNavButtons = () => {
		return hasNavButtons ? (
			<Fragment>
				{/* TODO: Might want to make this preload some data into the application */}
				<Link
					to={'/application'}
					className="column is-one-third-desktop is-half-tablet"
				>
					<button className={navHeroStyles.fls__pageHeroButton}>
						Apply Now
					</button>
				</Link>
				<Link
					to={'/contact'}
					className="column is-one-third-desktop is-half-tablet"
				>
					<button className={navHeroStyles.fls__pageHeroButton}>
						Contact Us
					</button>
				</Link>
				<a
					href="https://fls-international.web.app/"
					className="column is-one-third-desktop is-full-tablet"
				>
					<button className={navHeroStyles.fls__pageHeroButton}>
						English Proficiency Test
					</button>
				</a>
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

						{handleNavButtons()}
					</div>
				</div>
			</div>
		</Section>
	);
}
