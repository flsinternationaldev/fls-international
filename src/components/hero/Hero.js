import React from 'react';
import heroStyles from './Hero.module.scss';
import 'slick-carousel/slick/slick.css';
import Slick from 'react-slick';

export default function Hero({ carouselItems }) {
	// TODO: The carousel needs to be its own component
	const slickSettings = {
		autoplay: true,
		draggable: false,
		focusOnSelect: false,
		arrows: false,
		autoplaySpeed: 4000,
		infinite: true,
		adaptiveHeight: true,
	};

	return (
		<section className={`hero is-fullheight ${heroStyles.heroFls}`}>
			<Slick {...slickSettings}>
				{carouselItems.map(carouselItem => (
					<div key={carouselItem.title}>
						<div
							className={heroStyles.heroBody__carouselItem}
							style={{
								backgroundImage: `url(${carouselItem.carousel_image})`,
							}}
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
					</div>
				))}
			</Slick>
		</section>
	);
}
