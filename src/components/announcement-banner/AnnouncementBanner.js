import React, { useState } from 'react';
import { graphql, useStaticQuery, navigate } from 'gatsby';

import announcementBannerStyles from './AnnouncementBanner.module.scss';
import 'animate.css';

import { formatEdges } from 'src/utils/helpers';

export default function AnnouncementBanner() {
	const data = useStaticQuery(graphql`
		{
			allMarkdownRemark(
				limit: 1000
				filter: {
					fileAbsolutePath: {
						regex: "/pages/static/announcement-banner/"
					}
				}
			) {
				edges {
					node {
						frontmatter {
							pageContent
							path
							showBanner
						}
						fileAbsolutePath
					}
				}
			}
		}
	`);

	const formattedData = formatEdges(data.allMarkdownRemark);

	// Love me a React Hook
	const [isAnnouncementBannerOpen, setIsAnnouncementBannerOpen] = useState(
		true
	);

	const closeAnnouncementBanner = () => {
		setIsAnnouncementBannerOpen(false);

		// TODO: Dumb way to ensure the CSS animation has time to play
		setTimeout(() => {
			localStorage.setItem('hasClosedAnnouncementBanner', true);
		}, 2000);
	};

	const handleBannerClick = e => {
		// TODO: Not the most robust way to handle this nested event handler
		e.target.classList.forEach(cssClass => {
			if (cssClass.includes('fls__announcement-banner-close')) {
				closeAnnouncementBanner();
				return;
			} else {
				navigate(formattedData.path);
			}
		});
	};

	return localStorage.getItem('hasClosedAnnouncementBanner') !== null ||
		!formattedData.showBanner ? null : (
		<div
			className={`${
				announcementBannerStyles.fls__announcementBanner
			} animate__animated ${
				isAnnouncementBannerOpen
					? 'animate__slideInUp'
					: 'animate__slideOutDown'
			}`}
			onClick={handleBannerClick}
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
					{formattedData.pageContent}
				</div>
			</div>
		</div>
	);
}
