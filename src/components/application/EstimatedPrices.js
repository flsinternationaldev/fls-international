import React from 'react';

export default function EstimatedPrices({ prices }) {
	console.log('prices in the estimator', prices);
	return (
		<div className="column is-full">
			{prices.map(priceItem => (
				<div className="application__price-summary">
					<h3 className="fls-post__subtitle">{priceItem.type}</h3>

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
					</div>
				</div>
			))}
		</div>
	);
}
