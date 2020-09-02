import React from 'react';
import heroStyles from './Hero.module.scss';
import 'slick-carousel/slick/slick.css';
import Slick from 'react-slick';

export default function Hero({ carouselItems }) {
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
				{/* TODO: Figure out how to render the bg image */}
				{carouselItems.map(carouselItem => (
					<div
						className={heroStyles.heroBody__carouselItem}
						key={carouselItem.title}
					>
						<div className={heroStyles.hero__copyContainer}>
							<h2
								className={`subtitle ${heroStyles.hero__copyTitle}`}
							>
								{carouselItem.title}
							</h2>
							<h1 className={heroStyles.hero__copy}>
								{carouselItem.copy}
							</h1>
						</div>
					</div>
				))}
			</Slick>
		</section>
	);
}
