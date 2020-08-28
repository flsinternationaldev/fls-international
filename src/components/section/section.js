import React from 'react';

export default function Section(props) {
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
