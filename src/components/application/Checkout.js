import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { handleSubmission } from 'src/components/application/NetlifyStaticForm';
import EstimatedPrices from './EstimatedPrices';

export default function Checkout({
	previousStep,
	nextStep,
	userData,
	billingData,
	handleDataChange,
	handleBatchInputChange,
	prices,
	calculatePrice,
	applicationData,
	generalFeesTitle,
	currentCenter,
	currentProgram,
}) {
	const data = useStaticQuery(graphql`
		{
			allMarkdownRemark(
				filter: { fileAbsolutePath: { regex: "/general-fees/" } }
			) {
				edges {
					node {
						frontmatter {
							fees {
								cost
								name
								pay_period
								period
							}
							title
						}
						fileAbsolutePath
					}
				}
			}
		}
	`);

	// TODO: Probably want to make some kind of mix in to pass this function around
	let formattedData = data.allMarkdownRemark.edges.filter(
		edge => edge.node.frontmatter.title === generalFeesTitle
	);

	if (formattedData) {
		formattedData = formattedData.map(edge => {
			return { ...edge.node.frontmatter };
		});
	}
	//
	return (
		<div className="columns is-multiline">
			<div className="column is-full">
				<div className="application__header-container">
					<h3 className="fls-post__title">Checkout</h3>
					<h3 className="application__total-price">
						Total Price: ${calculatePrice(prices)}
					</h3>
				</div>
			</div>

			<EstimatedPrices prices={prices} />

			<div className="column is-4">
				<button onClick={previousStep} className="fls__button">
					Previous
				</button>
			</div>

			{/* TODO: This works for now... but it's probably not the best implementation */}
			<div className="column is-4"></div>

			<div className="column is-4">
				<button
					onClick={() => {
						handleSubmission();
					}}
					className="fls__button fls__button--yellow"
				>
					{/* TODO: Should probably be FLS yellow, to highlight its importance */}
					Submit & Pay
				</button>
			</div>
		</div>
	);
}
