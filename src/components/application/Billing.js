import React, { Fragment } from 'react';
import ReactFlagsSelect from 'react-flags-select';
import { loadStripe } from '@stripe/stripe-js';
import {
	CardElement,
	Elements,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js';

import paymentOptionsImg from 'src/img/stripe-payments.png';
import 'react-flags-select/scss/react-flags-select.scss';

export default function Billing({ nextStep, previousStep }) {
	// TODO: We need our REAL stripe key
	const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

	// TODO: Should have a 'same as home address' button
	return (
		<Fragment>
			<div className="columns is-multiline">
				<div className="column is-full">
					<h3 className="fls__post-title">Billing Address</h3>
				</div>
				<div className="column is-half">
					<div className="field">
						<label className="label">First Name</label>

						<div className="control">
							<input
								className="input fls__base-input"
								type="text"
								placeholder="Text input"
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
								placeholder="Text input"
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
								placeholder="Text input"
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
								placeholder="Text input"
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
								placeholder="Text input"
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
								placeholder="Text input"
							/>
						</div>
					</div>
				</div>
				<div className="column is-half">
					<div className="field">
						{/* TODO: figure out this country input  */}
						<label className="label">Country</label>

						<div className="control">
							<ReactFlagsSelect
								defaultCountry="US"
								searchable={true}
							/>
						</div>
					</div>
				</div>
				<div className="column is-half">
					<h3 className="fls__post-title">Payment Information</h3>

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

				<div className="column is-half">
					<div className="columns is-multiline">
						<div className="column is-full column--alternate column--app-program-details">
<<<<<<< HEAD
							{/* TODO: Need to make sure to include all the optional costs here as well */}
=======
>>>>>>> 9aa9880ec26bfb97040c3a6ab3ce8db585c7cb34
							<h3 className="fls__post-title">Program Details</h3>

							<div className="fls__app-program-details">
								<div className="fls__app-program-detail-item">
									<strong>Start Date:</strong>

									<span>Aug 24, 2020</span>
								</div>

								<div className="fls__app-program-detail-item">
									<strong>Duration:</strong>

									<span>2 Weeks</span>
								</div>

								<div className="fls__app-program-detail-item">
									<strong>Location:</strong>

									<span>Citrus College</span>
								</div>

								<div className="fls__app-program-detail-item">
									<strong>Program:</strong>

									<span>Intensive English</span>
								</div>
<<<<<<< HEAD

								<div className="fls__app-program-detail-item">
									<strong>Airport Pick Up:</strong>

									<span>$150</span>
								</div>
=======
>>>>>>> 9aa9880ec26bfb97040c3a6ab3ce8db585c7cb34
							</div>
						</div>

						<div className="column is-full column--alternate fls__app-program-total-container">
							<strong>Total:</strong>
							<span>$1200</span>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
