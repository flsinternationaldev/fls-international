import React, { useState } from 'react';
import { graphql, useStaticQuery, navigate } from 'gatsby';
import useLocalStorageState from 'use-local-storage-state';

import announcementBannerStyles from './AnnouncementBanner.module.scss';
import 'animate.css';

import { formatEdges } from 'src/utils/helpers';

export default function AnnouncementBanner() {
	const data = useStaticQuery(graphql`
		{
			allMarkdownRemark(
				limit: 1000
				filter: {
					fileAbsolutePath: { regex: "/netlify-content/components//" }
				}
			) {
				edges {
					node {
						frontmatter {
							path
						}
						fileAbsolutePath
					}
				}
			}
		}
	`);

	// const formattedData = formatEdges(data.allMarkdownRemark);
	const formattedData = {};

	const [
		hasClosedAnnouncementBanner,
		setHasClosedAnnouncementBanner,
	] = useLocalStorageState('hasClosedAnnouncementBanner');

	// Love me a React Hook
	const [isAnnouncementBannerOpen, setIsAnnouncementBannerOpen] = useState(
		true
	);

	const closeAnnouncementBanner = () => {
		setIsAnnouncementBannerOpen(false);

		// TODO: Dumb way to ensure the CSS animation has time to play
		setTimeout(() => {
			setHasClosedAnnouncementBanner(true);
		}, 800);
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

	return hasClosedAnnouncementBanner ? null : (
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
					{/* TODO: Some weird fucking bullshit is preventing the graphql
					query from running here for reasons un-fucking-known */}
					{/* {formattedData.copy} */}
					Live FLS classes are now online. Study in the US or in your
					home country. Click to read more!
				</div>
			</div>
		</div>
	);
}
