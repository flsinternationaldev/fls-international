import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { handleSubmission } from 'src/components/application/NetlifyStaticForm';

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
					<h3 className="fls__post-title">Checkout</h3>
					<h3 className="application__total-price">
						Estimated Price: ${calculatePrice(prices)}
					</h3>
				</div>
			</div>

			<div className="column is-full">
				<div className="application__price-summary">
					<h3 className="fls__post-title">General Fees</h3>

					<div className="application__general-fees">
						<div className="application__price-container">
							<span className="application__price-title">
								Extra Night: Student Residences
							</span>

							<div className="application__price-amount-container">
								<span className="application__price-amount">
									<strong>$75</strong>
								</span>

								<span className="application__price-amount-subtitle">
									Per Night
								</span>
							</div>
						</div>

						<div className="application__price-container">
							<span className="application__price-title">
								Extra Night: Student Residences
							</span>
							<span className="application__price-amount">
								<strong>$75</strong>
							</span>
						</div>

						<div className="application__price-container">
							<span className="application__price-title">
								Extra Night: Student Residences
							</span>
							<span className="application__price-amount">
								<strong>$75</strong>
							</span>
						</div>
					</div>
				</div>
			</div>

			<div className="column is-full">
				<div className="application__price-summary">
					<h3 className="fls__post-title">Program Details</h3>

					<div className="application__price-container">
						<span className="application__price-title">Center</span>
						<span className="application__price-amount">
							{/* <strong>{currentCenter.name}</strong> */}
						</span>
					</div>

					<div className="application__price-container">
						<span className="application__price-title">
							Program
						</span>
						<span className="application__price-amount">
							{/* <strong>{currentProgram.name}</strong> */}
						</span>
					</div>

					{prices.map(price => (
						<div
							className="application__price-container application__price-container--indented"
							key={price.label}
						>
							<span className="application__price-title">
								{price.label}
							</span>
							<span className="application__price-amount">
								<strong>${price.cost}</strong>
							</span>
						</div>
					))}
				</div>

				<div></div>
			</div>

			<div className="column is-full">
				<div className="application__price-summary">
					<h3 className="fls__post-title">Housing</h3>

					<div className="application__general-fees">
						<div className="application__price-container">
							<span className="application__price-title">
								Extra Night: Student Residences
							</span>

							<div className="application__price-amount-container">
								<span className="application__price-amount">
									<strong>$75</strong>
								</span>

								<span className="application__price-amount-subtitle">
									Per Night
								</span>
							</div>
						</div>

						<div className="application__price-container">
							<span className="application__price-title">
								Extra Night: Student Residences
							</span>
							<span className="application__price-amount">
								<strong>$75</strong>
							</span>
						</div>

						<div className="application__price-container">
							<span className="application__price-title">
								Extra Night: Student Residences
							</span>
							<span className="application__price-amount">
								<strong>$75</strong>
							</span>
						</div>
					</div>
				</div>
			</div>

			<div className="column is-full">
				<div>
					<span>Total Cost</span>
				</div>
			</div>

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
