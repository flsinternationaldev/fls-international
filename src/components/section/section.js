import React from 'react';

export default function Section(props) {
	const containerClasses = props.isFullWidthContainer ? '' : 'container',
		sectionClasses =
			props.sectionClasses && props.sectionClasses.length
				? `section ${props.sectionClasses.join(' ')}`
				: `section`;

	return (
		<section className={sectionClasses}>
			<div className={containerClasses}>{props.children}</div>
		</section>
	);
}
