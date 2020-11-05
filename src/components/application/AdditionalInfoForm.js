import React, { Fragment } from 'react';
import ReactTooltip from 'react-tooltip';
import { useStaticQuery, graphql } from 'gatsby';

import EstimatedPrices from 'src/components/application/EstimatedPrices';
import InPersonInfoForm from 'src/components/application/InPersonInfoForm';
import OnlineInfoForm from 'src/components/application/OnlineInfoForm';
import SpecialtyToursInfoForm from 'src/components/application/SpecialtyToursInfoForm';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

export default function AdditionalInfoForm({
	calculatePrice,
	nextStep,
	previousStep,
	handleDataChange,
	generalFeesData,
	handleBatchInputChange,
	prices,
	setPrices,
	applicationData,
}) {
	const programsData = useStaticQuery(graphql`
		{
			inPerson: allMarkdownRemark(
				limit: 1000
				filter: {
					fileAbsolutePath: { regex: "/data/programs/in-person//" }
				}
			) {
				edges {
					node {
						frontmatter {
							name
							centerNameRelation
							durationOptions {
								maxWeeks
								exceedMaxWeeks
								weekThresholds {
									pricePerWeek
									thresholdMax
								}
							}
							hoursPerWeek
							lessonsPerWeek
							minutesPerLesson
						}
					}
				}
			}
			online: allMarkdownRemark(
				limit: 1000
				filter: {
					fileAbsolutePath: { regex: "/data/programs/online//" }
				}
			) {
				edges {
					node {
						frontmatter {
							name
							onlineProgramType
							priceDetails {
								price
								payPeriod
							}
							durationOptions {
								maxWeeks
								weekThresholds {
									pricePerWeek
									thresholdMax
								}
							}
							hoursPerWeek
							lessonsPerWeek
							minutesPerLesson
							timesOffered
							termDates {
								start
								end
							}
						}
					}
				}
			}
			specialtyTours: allMarkdownRemark(
				limit: 1000
				filter: {
					fileAbsolutePath: {
						regex: "/data/programs/specialty-tours//"
					}
				}
			) {
				edges {
					node {
						frontmatter {
							centerNameRelation
							minimumAge
							priceDetails {
								package {
									payPeriod
									price
								}
								range {
									maxWeeks
									weekThresholds {
										pricePerWeek
										thresholdMax
									}
								}
							}
							programDates {
								arrive
								depart
							}
							sampleCalendar
						}
					}
				}
			}
		}
	`);

	const renderFormViews = programType => {
		if (programType === 'in-person') {
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
								<h3 className="fls-post__title">
									{/* TODO: This section, before the program specific info form component, needs to be DRYed */}
									{`Additional Info - ${programType.replace(
										/-/g,
										' '
									)}`}
								</h3>

								<h3 className="application__total-price">
									Total Price: ${calculatePrice(prices)}
								</h3>
							</div>
						</div>

						<div className="column is-full">
							<button
								className="fls__button fls__button--half"
								onClick={() => {
									console.log('click me, daddy');
									handleDataChange(
										'programType',
										'',
										'application'
									);
								}}
							>
								<FontAwesomeIcon
									className="fls-post__subhero-icon"
									icon={faChevronLeft}
								/>{' '}
								Return to Program Type Selection
							</button>
						</div>

						<InPersonInfoForm
							calculatePrice={calculatePrice}
							handleDataChange={handleDataChange}
							generalFeesData={generalFeesData}
							handleBatchInputChange={handleBatchInputChange}
							prices={prices}
							setPrices={setPrices}
							applicationData={applicationData}
							programsData={programsData.inPerson}
						/>

						<EstimatedPrices prices={prices} />

						<div className="column is-4">
							<button
								onClick={previousStep}
								className="fls__button"
							>
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
		} else if (programType === 'online') {
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
								<h3 className="fls-post__title">
									{`Additional Info - ${programType.replace(
										/-/g,
										' '
									)}`}
								</h3>

								<h3 className="application__total-price">
									Total Price: ${calculatePrice(prices)}
								</h3>
							</div>

							<div className="column is-full">
								<button
									className="fls__button fls__button--half"
									onClick={() => {
										console.log('click me, daddy');
										handleDataChange(
											'programType',
											'',
											'application'
										);
									}}
								>
									<FontAwesomeIcon
										className="fls-post__subhero-icon"
										icon={faChevronLeft}
									/>{' '}
									Return to Program Type Selection
								</button>
							</div>
						</div>

						<OnlineInfoForm
							programType={programType}
							applicationData={applicationData}
							programsData={programsData.online}
							handleDataChange={handleDataChange}
							handleBatchInputChange={handleBatchInputChange}
							prices={prices}
							setPrices={setPrices}
						/>

						<EstimatedPrices prices={prices} />

						<div className="column is-4">
							<button
								onClick={previousStep}
								className="fls__button"
							>
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
		} else if (programType === 'specialty-tours') {
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
								<h3 className="fls-post__title">
									{`Additional Info - ${programType.replace(
										/-/g,
										' '
									)}`}
								</h3>

								<h3 className="application__total-price">
									Total Price: ${calculatePrice(prices)}
								</h3>
							</div>
						</div>

						<div className="column is-full">
							<button
								className="fls__button fls__button--half"
								onClick={() => {
									handleDataChange(
										'programType',
										'',
										'application'
									);
								}}
							>
								<FontAwesomeIcon
									className="fls-post__subhero-icon"
									icon={faChevronLeft}
								/>{' '}
								Return to Program Type Selection
							</button>
						</div>

						<SpecialtyToursInfoForm
							calculatePrice={calculatePrice}
							handleDataChange={handleDataChange}
							generalFeesData={generalFeesData}
							handleBatchInputChange={handleBatchInputChange}
							prices={prices}
							setPrices={setPrices}
							applicationData={applicationData}
							programsData={programsData.specialtyTours}
						/>

						<EstimatedPrices prices={prices} />

						<div className="column is-4">
							<button
								onClick={previousStep}
								className="fls__button"
							>
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
	};

	return renderFormViews(applicationData.programType);
}
