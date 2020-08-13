import React from 'react';

import cardStyles from './Card.module.scss';

export default function Card({
	isSpecialityTours,
	isLocation,
	isCarouselLocation,
	isAffiliate,
	isContact,
}) {
	if (isSpecialityTours) {
		return (
			<div className={cardStyles.fls__card}>
				<div className={cardStyles.fls__cardContents}>
					<div className={cardStyles.fls__cardHeader}>Age 6+</div>

					<div>
						<h5 className={cardStyles.fls__cardTitle}>
							Family Programs
						</h5>
						<h6 className={cardStyles.fls__cardSubtitle}>
							Citrus College
						</h6>

						<p className={cardStyles.fls__cardCopy}>
							Travelling together as a family builds memories that
							will last forever. Family travel is even more
							rewarding when you can combine a beautiful
							destination with education and the opportunity to
							make international friendships. Our Family Program
							in Los Angeles gives younger students the experience
							of building friendships with American children while
							also providing adults with the chance to practice
							their English with students from around the world.
						</p>
					</div>

					<div
						className={`${cardStyles.fls__cardDetails} ${cardStyles.fls__cardDetailsSpecialityTours}`}
					>
						<span>Read More</span>
					</div>
				</div>

				<div
					className={`${cardStyles.fls__cardBg} ${cardStyles.fls__cardBgSpecialityTours}`}
				></div>
				<div className={cardStyles.fls__cardBgOverlay}></div>
				<div className={cardStyles.fls__cardFooterOverlay}></div>
			</div>
		);
	} else if (isLocation) {
		return (
			<div>
				<div
					className={`fls__location ${
						isCarouselLocation
							? 'fls__location--carousel'
							: 'fls__location--post'
					}`}
				>
					<div className="fls__location-img-container">
						<a
							href="#"
							className="fls__button fls__button--card fls__button--locations-card"
						>
							Read More
						</a>
					</div>

					<div
						className={`fls__location-copy-container ${
							isCarouselLocation
								? ''
								: 'fls__location-copy-container--post'
						}`}
					>
						<h3 className="fls__location-title">Citrus College</h3>
						<p className="fls__location-copy">
							Study English in California! Citrus College offers a
							great combination of suburban comfort with access to
							all of the attracions and glamour of Los Angeles.
						</p>
					</div>
				</div>
			</div>
		);
	} else if (isAffiliate) {
		return (
			<div className="column is-one-quarter">
				<img
					className={cardStyles.aboutUs__affiliateCardIcon}
					src="../../img/cea-logo.png"
					alt=""
				/>

				<div className={cardStyles.aboutUs__affiliateCardTitle}>
					Commission on English Language Program Accreditation
				</div>

				<div className={cardStyles.aboutUs__affiliateCardCopy}>
					CEA is a national accrediting agency recognized by the U.S.
					Department of Education. CEA is a specialized accrediting
					agency founded by active professionals in English language
					education and is the only U.S. agency designed specifically
					to accredit English language programs.
				</div>
			</div>
		);
	} else if (isContact) {
		return (
			<div className="column is-one-third-desktop is-half-tablet">
				<div className={cardStyles.aboutUs__contactCard}>
					<div className={cardStyles.aboutUs__contactCardDetails}>
						<img
							className={cardStyles.aboutUs__contactCardIcon}
							src="../../img/luke-icon.jpeg"
							alt=""
						/>
						<strong>Mr. Luke Frerichs</strong>
						<div
							className={cardStyles.aboutUs__contactCardPosition}
						>
							President
						</div>
					</div>

					<div className={cardStyles.aboutUs__contactCardEmail}>
						luke.frerichs@fls.net
					</div>
				</div>
			</div>
		);
	} else {
		return (
			// TODO: Render bg images based on CMS, and figure out why the pills don't have the space between them that they do in the static site
			<div className={cardStyles.fls__card}>
				<div className={cardStyles.fls__cardContents}>
					<span className="fls__pill fls__pill--in-person">
						In Person
					</span>
					<span className="fls__pill fls__pill--online">Online</span>

					<div>
						<h5 className={cardStyles.fls__cardTitle}>
							Academic English
						</h5>
						<p className={cardStyles.fls__cardCopy}>
							Our high-powered Academic English program offers the
							fastest way to develop your English.
						</p>
					</div>

					<div className={cardStyles.fls__cardDetails}>
						{/* TODO: Icons */}
						<span>36 lessons per week</span>
						<span>30 hours per week</span>
					</div>
				</div>

				<div className={cardStyles.fls__cardBg}></div>
				<div className={cardStyles.fls__cardBgOverlay}></div>
			</div>
		);
	}
}
