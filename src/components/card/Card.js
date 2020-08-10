import React from 'react';

import cardStyles from './Card.module.scss';

export default function Card() {
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
