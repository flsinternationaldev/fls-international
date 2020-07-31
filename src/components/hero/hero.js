import React from 'react';
import heroStyles from './hero.module.scss';
import 'slick-carousel/slick/slick.css';
import Slick from 'react-slick';

export default function Hero(props) {
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
		<section className="hero is-link is-fullheight">
			{/* TODO: _.template these carousel slides */}
			<Slick {...slickSettings}>
				<div className={heroStyles.heroBody__carouselItem}>
					<div className={heroStyles.hero__copyContainer}>
						<h2
							className={`subtitle ${heroStyles.hero__copyTitle}`}
						>
							{props.carousel_settings.title}
						</h2>
						<h1 className={heroStyles.hero__copy}>
							{props.carousel_settings.copy}
						</h1>
					</div>
				</div>

				<div className={heroStyles.heroBody__carouselItem}>
					<div className={heroStyles.hero__copyContainer}>
						<h2
							className={`subtitle ${heroStyles.hero__copyTitle}`}
						>
							FLS International
						</h2>
						<h1 className={heroStyles.hero__copy}>
							ENGLISH LANGUAGE PROGRAMS, PATHWAYS & SPECIALTY
							TOURS
						</h1>
					</div>
				</div>

				<div className={heroStyles.heroBody__carouselItem}>
					<div className={heroStyles.hero__copyContainer}>
						<h2
							className={`subtitle ${heroStyles.hero__copyTitle}`}
						>
							FLS International
						</h2>
						<h1 className={heroStyles.hero__copy}>
							ENGLISH LANGUAGE PROGRAMS, PATHWAYS & SPECIALTY
							TOURS
						</h1>
					</div>
				</div>
			</Slick>
		</section>
	);
}
