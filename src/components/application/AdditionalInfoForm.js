import React, { useState, Fragment } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { RadioGroup, Radio } from 'react-radio-group';
import ReactTooltip from 'react-tooltip';
import { useStaticQuery, graphql } from 'gatsby';
import Checkbox from 'rc-checkbox';

import EstimatedPrices from 'src/components/application/EstimatedPrices';
import InPersonInfoForm from 'src/components/application/InPersonInfoForm';
import OnlineInfoForm from 'src/components/application/OnlineInfoForm';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import {
	kebabToCamel,
	formatEdges,
	updatePrices,
	removePrices,
} from 'src/utils/helpers';

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
							name
							programDetails {
								lessonsPerWeek
								hoursPerWeek
							}
							hero_image
							durationOptions {
								maxWeeks
								weekThresholds {
									pricePerWeek
									thresholdMax
								}
							}
							lessonsPerWeek
							minutesPerLesson
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
									Additional Info
								</h3>

								<h3 className="application__total-price">
									Total Price: ${calculatePrice(prices)}
								</h3>
							</div>
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
									Additional Info
								</h3>

								<h3 className="application__total-price">
									Total Price: ${calculatePrice(prices)}
								</h3>
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
		}
	};

	return renderFormViews(applicationData.programType);
}
