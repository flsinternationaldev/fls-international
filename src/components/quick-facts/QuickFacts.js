import React from 'react';

import quickFactsStyles from './QuickFacts.module.scss';

import MarkdownContent from '../MarkdownContent';

console.log('quickFactsStyles', quickFactsStyles);
const classMap = {
	li: quickFactsStyles.fls__quickFactItem,
};

export default function QuickFacts({ data }) {
	return (
		<div className={`${quickFactsStyles.fls__quickFacts} column is-full`}>
			<h6 className="fls-post__subtitle">Quick Facts</h6>

			{data.map(quickFact => (
				<div
					className={quickFactsStyles.fls__quickFactContainer}
					key={quickFact.name}
				>
					<img
						src={quickFact.icon}
						alt={`${quickFact.name} icon`}
						className={quickFactsStyles.fls__quickFactIcon}
					/>
					<div className={quickFactsStyles.fls__quickFactCopy}>
						<div className={quickFactsStyles.fls__quickFactTitle}>
							{quickFact.name}
						</div>
						<ul>
							<MarkdownContent
								classMap={classMap}
								content={quickFact.items}
							/>
						</ul>
					</div>
				</div>
			))}
		</div>
	);
}
