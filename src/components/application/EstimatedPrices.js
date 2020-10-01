import React, { Fragment } from 'react';

export default function EstimatedPrices({ prices }) {
	return (
		<div className="column is-full">
			<div className="columns is-multiline">
				{prices.map(priceItem => (
					<div className="column is-half">
						<div className="application__price-summary">
							<h3 className="fls-post__subtitle">
								{priceItem.type}
							</h3>

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
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
