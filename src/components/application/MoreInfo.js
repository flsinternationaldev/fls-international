import React, { Fragment } from 'react';
import ReactTooltip from 'react-tooltip';
import Select from 'react-select';
import EstimatedPrices from './EstimatedPrices';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

// TODO: Figure out how best to handle validation
export default function MoreInfo({
	applicationData,
	nextStep,
	previousStep,
	userData,
	handleDataChange,
	calculatePrice,
	prices,
}) {
	const referralOptions = [
		{
			label: 'Other',
			value: 'other',
		},
		{
			label: 'Agent',
			value: 'other',
		},
	];

	return (
		<Fragment>
			<ReactTooltip
				type="info"
				effect="solid"
				html={true}
				multiline={true}
				className="fls__tooltip"
				clickable={true}
			/>

			<div className="columns is-multiline">
				<div className="column is-full">
					<div className="application__header-container">
						<h3 className="fls-post__title">More Info</h3>
						<h3 className="application__total-price">
							Total Price: ${calculatePrice(prices)}
						</h3>
					</div>
				</div>
				<div className="column is-half">
					<label className="label">How did you hear about FLS?</label>
					<Select
						className="fls__select-container"
						classNamePrefix={'fls'}
						value={{
							label: userData.howDidYouHearAboutFls,
							value: userData.howDidYouHearAboutFls,
						}}
						onChange={referralOption => {
							handleDataChange(
								'howDidYouHearAboutFls',
								referralOption.label,
								'user'
							);
						}}
						options={referralOptions}
					/>
				</div>

				{/* TODO: Casing issues here make this condition highly fragile */}
				{userData.howDidYouHearAboutFls === 'Other' ? (
					<div className="column is-half">
						{/* TODO: Should only show if they select 'Other' for 'How did you hear about FLS?' */}
						<label className="label">
							Specify How You Heard About FLS
						</label>
						<div className="control">
							<input
								className="input fls__base-input"
								type="text"
								value={userData.specifyHowHeardAboutFls}
								onChange={e =>
									handleDataChange(
										'specifyHowHeardAboutFls',
										e.target.value,
										'user'
									)
								}
							/>
						</div>
					</div>
				) : null}

				{userData.howDidYouHearAboutFls === 'Agent' ? (
					<div className="column is-half">
						{/* TODO: Should only show if they select 'Other' for 'How did you hear about FLS?' */}
						<label className="label">Which Agency?</label>
						<div className="control">
							<input
								className="input fls__base-input"
								type="text"
								value={userData.specifyHowHeardAboutFls}
								onChange={e =>
									handleDataChange(
										'specifyHowHeardAboutFls',
										e.target.value,
										'user'
									)
								}
							/>
						</div>
					</div>
				) : null}

				{/* TODO: Need to see if there's a way to get this into Netlify */}
				{applicationData.requiresI20 === 'yes' ? (
					<Fragment>
						<ReactTooltip
							type="info"
							effect="solid"
							html={true}
							multiline={true}
							className="fls__tooltip"
							clickable={true}
						/>
						<div className="column is-full">
							<div className="columns">
								<div className="column is-half">
									<label className="label">
										Passport Photo (.jpg, .png, .pdf)(Max
										File Size 5mb)
										<FontAwesomeIcon
											className="application__info-icon"
											icon={faInfoCircle}
											data-tip="A passport photo is not required now. This can be provided at a future date."
										/>
									</label>

									<div className="file has-name">
										<label className="file-label">
											<input
												className="file-input"
												type="file"
												name="passport"
											/>

											<span className="file-cta">
												<span className="file-icon">
													<i className="fas fa-upload"></i>
												</span>

												<span className="file-label">
													Choose a file…
												</span>
											</span>

											<span className="file-name">
												Screen Shot 2017-07-29 at
												15.54.25.png
											</span>
										</label>
									</div>
								</div>

								<div className="column is-half">
									<label className="label">
										Financial Document (.jpg, .png,
										.pdf)(Max File Size 5mb)
										<FontAwesomeIcon
											className="application__info-icon"
											icon={faInfoCircle}
											data-tip="A financial document
									 is not required now. This can be provided at a future date."
										/>
									</label>
									<div className="file has-name">
										<label className="file-label">
											<input
												className="file-input"
												type="file"
												name="financial-document"
											/>

											<span className="file-cta">
												<span className="file-icon">
													<i className="fas fa-upload"></i>
												</span>
												<span className="file-label">
													Choose a file…
												</span>
											</span>

											<span className="file-name">
												Screen Shot 2017-07-29 at
												15.54.25.png
											</span>
										</label>
									</div>
								</div>
							</div>
						</div>
					</Fragment>
				) : null}

				<div className="column is-full">
					<label className="label">Additional Comments</label>
					<textarea
						className="textarea"
						value={userData.additionalComments}
						onChange={e =>
							handleDataChange(
								'additionalComments',
								e.target.value,
								'user'
							)
						}
					></textarea>
				</div>

				<div className="column is-full">
					<label className="checkbox">
						<input type="checkbox" />
						<span className="fls__radio-label">
							I acknowledge, by checking the box below, that I
							have read and agree to the above GDPR privacy policy
							and FLS <a href="#">Terms and Conditions.</a> *
						</span>
					</label>
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
							nextStep();
						}}
						className="fls__button"
					>
						Save & Continue
					</button>
				</div>
			</div>
		</Fragment>
	);
}
