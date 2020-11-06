import React, { useState } from 'react';
import announcementBannerStyles from './AnnouncementBanner.module.scss';
import 'animate.css';

export default function AnnouncementBanner() {
	const lsIsAnnouncementBannerOpen = /*localStorage.getItem(
		'isAnnouncementBannerOpen'
	);*/ true;

	// Love me a React Hook
	const [isAnnouncementBannerOpen, setIsAnnouncementBannerOpen] = useState(
		lsIsAnnouncementBannerOpen !== null
			? lsIsAnnouncementBannerOpen == 'true'
			: true
	);

	const closeAnnouncementBanner = () => {
		// localStorage.setItem('isAnnouncementBannerOpen', false);
		setIsAnnouncementBannerOpen(false);
	};

	return (
		// TODO: Might be nice to have some kind of session variable that keeps track of whether or not this has been closed
		<div
			className={`${
				announcementBannerStyles.fls__announcementBanner
			} animate__animated ${
				isAnnouncementBannerOpen
					? 'animate__slideInUp'
					: 'animate__slideOutDown'
			}`}
		>
			{/* TODO: Ensure this close button works on mobile */}
			<span
				className={
					announcementBannerStyles.fls__announcementBannerClose
				}
				onClick={closeAnnouncementBanner}
			>
				X
			</span>
			<div
				className={`container ${announcementBannerStyles.containerAnnouncementBanner}`}
			>
				<div
					className={
						announcementBannerStyles.fls__announcementBannerCopy
					}
				>
					Live FLS classes are now online. Study in the US or in your
					home country. Click to read more!
				</div>
			</div>
		</div>
	);
}
