import React, { Fragment } from 'react';
import ReactFlagsSelect from 'react-flags-select';
import { loadStripe } from '@stripe/stripe-js';
import {
	CardElement,
	Elements,
	// useStripe,
	// useElements,
} from '@stripe/react-stripe-js';
import { getName, getCode } from 'country-list';
import { handleSubmission } from 'src/components/application/NetlifyStaticForm';

import EstimatedPrices from './EstimatedPrices';

import paymentOptionsImg from 'src/img/stripe-payments.png';
import 'react-flags-select/scss/react-flags-select.scss';

// TODO: We need our REAL stripe key
const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

export default function BillingCheckout({
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
}) {
	const useHomeAddress = () => {
		const billingKeys = [
				'firstName',
				'lastName',
				'address',
				'addressCountry',
				'city',
				'stateProvince',
				'postalCode',
			],
			capitalizeFirstLetter = string => {
				// TODO: There is probably a cleaner way to handle this weirdness
				return string.charAt(0).toUpperCase() + string.slice(1);
			};

		const batchedBillingData = billingKeys.reduce((accum, billingKey) => {
			accum[`billing${capitalizeFirstLetter(billingKey)}`] =
				userData[billingKey];

			return accum;
		}, {});

		handleBatchInputChange(batchedBillingData, 'billing');
	};

	return (
		<Fragment>
			<div className="columns is-multiline">
				<div className="column is-full">
					<div className="application__header-container">
						<h3 className="fls-post__title">Billing & Checkout</h3>
						<h3 className="application__total-price">
							Total Price: ${calculatePrice(prices)}
						</h3>
					</div>
				</div>

				<div className="column is-full">
					<div className="columns">
						<div className="column is-half">
							<button
								className="fls__button"
								onClick={useHomeAddress}
							>
								Same as Home Address
							</button>
						</div>
					</div>
				</div>

				<div className="column is-half">
					<div className="field">
						<label className="label">First Name</label>

						<div className="control">
							<input
								className="input fls__base-input"
								type="text"
								onChange={e =>
									handleDataChange(
										'billingFirstName',
										e.target.value,
										'user'
									)
								}
								value={billingData.billingFirstName}
							/>
						</div>
					</div>
				</div>
				<div className="column is-half">
					<div className="field">
						<label className="label">Last Name</label>

						<div className="control">
							<input
								className="input fls__base-input"
								type="text"
								onChange={e =>
									handleDataChange(
										'billingLastName',
										e.target.value,
										'user'
									)
								}
								value={billingData.billingLastName}
							/>
						</div>
					</div>
				</div>

				<div className="column is-full">
					<div className="field">
						<label className="label">Address</label>

						<div className="control">
							<input
								className="input fls__base-input"
								type="text"
								onChange={e =>
									handleDataChange(
										'billingAddress',
										e.target.value,
										'user'
									)
								}
								value={billingData.billingAddress}
							/>
						</div>
					</div>
				</div>

				<div className="column is-half">
					<div className="field">
						<label className="label">City</label>

						<div className="control">
							<input
								className="input fls__base-input"
								type="text"
								onChange={e =>
									handleDataChange(
										'billingCity',
										e.target.value,
										'user'
									)
								}
								value={billingData.billingCity}
							/>
						</div>
					</div>
				</div>

				<div className="column is-half">
					<div className="field">
						<label className="label">State/Province</label>

						<div className="control">
							<input
								className="input fls__base-input"
								type="text"
								onChange={e =>
									handleDataChange(
										'billingStateProvince',
										e.target.value,
										'user'
									)
								}
								value={billingData.billingStateProvince}
							/>
						</div>
					</div>
				</div>

				<div className="column is-half">
					<div className="field">
						<label className="label">Zip/Postal Code</label>

						<div className="control">
							<input
								className="input fls__base-input"
								type="text"
								onChange={e =>
									handleDataChange(
										'billingPostalCode',
										e.target.value,
										'user'
									)
								}
								value={billingData.billingPostalCode}
							/>
						</div>
					</div>
				</div>
				<div className="column is-half">
					<div className="field">
						{/* TODO: figure out this country input  */}
						<label className="label">Country</label>
						<div className="control">
							{/* TODO: Figure out how to change this with state change */}
							<ReactFlagsSelect
								defaultCountry={getCode(
									billingData.billingAddressCountry
								)}
								searchable={true}
								onSelect={countryCode => {
									handleDataChange(
										'billingAddressCountry',
										getName(countryCode),
										'user'
									);
								}}
							/>
						</div>
					</div>
				</div>

				<div className="column is-half">
					<h3 className="fls-post__title">Payment Information</h3>

					<div className="fls__payment-container">
						<div className="fls__payment-label">
							<span className="fls__payment-label-copy">
								Credit or Debit Card Payment
							</span>
							<img
								className="fls__payment-options-img"
								src={paymentOptionsImg}
								alt="payment options"
							/>
						</div>
						<Elements stripe={stripePromise}>
							<CardElement className="fls__base-input fls__base-input--payment" />
						</Elements>
					</div>
				</div>
			</div>

			<EstimatedPrices prices={prices} />

			<div className="columns">
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
		</Fragment>
	);
}
