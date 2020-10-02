import React, { Fragment } from 'react';

export default function EstimatedPrices({ prices }) {
	const formattedGeneralFees = prices.reduce(
		(accum, priceItem) => {
			if (priceItem.type === 'general fees') accum.items.push(priceItem);

			return accum;
		},
		{ type: 'general fees', items: [] }
	);

	const formattedPrices = prices
		.filter(priceItem => priceItem.type !== 'general fees')
		.concat(formattedGeneralFees);

	console.log('formattedPrices', formattedPrices);

	const renderPriceItem = priceItem => {
		if (priceItem.items) {
			return priceItem.items.map(priceItem => (
				<div className="application__general-fees">
					<div className="application__price-container">
						<span className="application__price-title">
							{priceItem.label}
						</span>

						<div className="application__price-amount-container">
							<span className="application__price-amount">
								<strong>{`$${priceItem.priceDetails.price}`}</strong>
							</span>

							<span className="application__price-amount-subtitle">
								{priceItem.priceDetails.payPeriod}
							</span>
						</div>
					</div>
				</div>
			));
		} else {
			return (
				<div className="application__general-fees">
					<div className="application__price-container">
						<span className="application__price-title">
							{priceItem.label}
						</span>

						<div className="application__price-amount-container">
							<span className="application__price-amount">
								<strong>{`$${priceItem.priceDetails.price}`}</strong>
							</span>

							<span className="application__price-amount-subtitle">
								{priceItem.priceDetails.payPeriod}
							</span>
						</div>
					</div>
				</div>
			);
		}
	};

	return (
		<div className="column is-full">
			<div className="columns is-multiline">
				{formattedPrices.map(priceItem => (
					<div className="column is-half">
						<div className="application__price-summary">
							<h3 className="fls-post__subtitle">
								{priceItem.type}
							</h3>

							{renderPriceItem(priceItem)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
