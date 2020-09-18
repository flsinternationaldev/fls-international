import React from 'react';
import { Link } from 'gatsby';

import cardStyles from './Card.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faClock, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Card({
	isLocation,
	isCarouselLocation,
	isAffiliate,
	isContact,
	programType,
	cardData,
}) {
	const renderProgramPill = programType => {
		if (programType === 'in-person') {
			return (
				<span className="fls__pill fls__pill--in-person">
					In Person
				</span>
			);
		} else if (programType === 'online') {
			return <span className="fls__pill fls__pill--online">Online</span>;
		}
	};

	if (programType === 'specialty-tours') {
		console.log('specialty tours card', cardData);
		return (
			<Link
				to={`/programs/specialty-tours/${cardData.path}`}
				className={cardStyles.fls__card}
			>
				<div className={cardStyles.fls__cardContents}>
					<div className={cardStyles.fls__cardHeader}>
						<FontAwesomeIcon
							className={cardStyles.flsCard__userIcon}
							icon={faUser}
						/>
						{`Age ${cardData.speciality_tour_details.minimum_age}+`}
					</div>

					<div>
						<h5 className={cardStyles.fls__cardTitle}>
							{cardData.name}
						</h5>
						<h6 className={cardStyles.fls__cardSubtitle}>
							{cardData.centerName}
						</h6>

						<p className={cardStyles.fls__cardCopy}>
							{cardData.speciality_tour_description}
						</p>
					</div>

					<div
						className={`${cardStyles.fls__cardDetails} ${cardStyles.fls__cardDetailsSpecialityTours}`}
					>
						<span>Read More</span>
					</div>
				</div>

				<img
					// NOTE: Default to the first carousel image
					src={cardData.carousel_images[0]}
					alt={`${cardData.name} background image`}
					className={`${cardStyles.fls__cardBg} ${cardStyles.fls__cardBgSpecialityTours}`}
				/>
				<div className={cardStyles.fls__cardBgOverlay}></div>
				<div className={cardStyles.fls__cardFooterOverlay}></div>
			</Link>
		);
	} else if (isLocation) {
		return (
			<div
				className={`fls__location ${
					isCarouselLocation
						? 'fls__location--carousel'
						: 'fls__location--post'
				}`}
			>
				<div className="fls__location-img-container">
					<img
						className="fls__location-img"
						src={cardData.carousel_images[0]}
						alt={`${cardData.name} background image`}
					/>
					<Link
						to={`/locations/${cardData.path}`}
						className="fls__button fls__button--card fls__button--locations-card"
					>
						Read More
					</Link>
				</div>

				<div
					className={`fls__location-copy-container ${
						isCarouselLocation
							? ''
							: 'fls__location-copy-container--post'
					}`}
				>
					<h3 className="fls__location-title">{cardData.pageName}</h3>
					<h4 className="fls-location__subtitle">{cardData.name}</h4>

					<p className="fls__location-copy">{cardData.description}</p>
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
	} else if (programType === 'in-person' || programType === 'online') {
		return (
			// TODO: Render bg images based on CMS, and figure out why the pills don't have the space between them that they do in the static site
			<Link
				to={`/programs/${programType}/${cardData.path}`}
				className={cardStyles.fls__card}
			>
				<div className={cardStyles.fls__cardContents}>
					{renderProgramPill(programType)}

					<div>
						<h5 className={cardStyles.fls__cardTitle}>
							{cardData.name}
						</h5>
						<p className={cardStyles.fls__cardCopy}>
							{cardData.description}
						</p>
					</div>

					<div className={cardStyles.fls__cardDetails}>
						{/* TODO: Icons */}
						<span>
							<FontAwesomeIcon
								className="fls-post__subhero-icon"
								icon={faBook}
							/>
							{cardData.program_details.lessons_per_week} lessons
							per week
						</span>
						<span>
							<FontAwesomeIcon
								className="fls-post__subhero-icon"
								icon={faClock}
							/>
							{cardData.program_details.hours_per_week} hours per
							week
						</span>
					</div>
				</div>

				<img
					className={cardStyles.fls__cardBg}
					src={cardData.hero_image}
				/>
				<div className={cardStyles.fls__cardBgOverlay}></div>
			</Link>
		);
	}
}
