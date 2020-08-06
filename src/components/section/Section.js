import React from 'react';

export default function Section(props) {
	// const containerClasses = props.isFullWidthContainer
	// 		? props.containerClasses.join(' ')
	// 		: `container ${props.sectionClasses.join(' ')}`,
	// 	sectionClasses =
	// 		props.sectionClasses && props.sectionClasses.length
	// 			? `section ${props.sectionClasses.join(' ')}`

	const containerClasses =
			'containerClasses' in props
				? props.containerClasses.join(' ')
				: 'container',
		sectionClasses =
			'sectionClasses' in props
				? props.sectionClasses.join(' ')
				: 'section';

	return (
		<section className={sectionClasses}>
			<div className={containerClasses}>{props.children}</div>
		</section>
	);
}
