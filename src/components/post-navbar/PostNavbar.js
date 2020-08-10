import React from 'react';

import postNavbarStyles from './PostNavbar.module.scss';

export default function PostNavbar(props) {
	// TODO: This needs to derive from the CMS
	const routes = [
		'English Langauge Programs',
		'Speciality Tours',
		'High School & University Placement',
		'College Auditing',
		'FLS Pathways',
		'Concurrent Enrollment',
		'High School Completion',
		'Study 30+',
		'High School Immersion',
		'Business Speciality Skills Certificates',
	];

	return (
		<div className="column is-full-desktop is-half-tablet">
			{routes.map((route, index) => (
				<a
					href="#"
					className={postNavbarStyles.fls__postNavbarItem}
					key={index}
				>
					<span>{route}</span>
				</a>
			))}
		</div>
	);
}
