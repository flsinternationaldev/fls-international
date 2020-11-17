import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Formsy from 'formsy-react';

import EstimatedPrices from 'src/components/application/EstimatedPrices';
import InPersonInfoForm from 'src/components/application/InPersonInfoForm';
import OnlineInfoForm from 'src/components/application/OnlineInfoForm';
import SpecialtyToursInfoForm from 'src/components/application/SpecialtyToursInfoForm';
import AdditionalInfoFormHeader from 'src/components/application/AdditionalInfoFormHeader';

export default function AdditionalInfoForm({
	calculatePrice,
	nextStep,
	previousStep,
	handleDataChange,
	handleBatchInputChange,
	prices,
	setPrices,
	applicationData,
	setApplicationData,
	handleApplicationState,
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
								range {
									maxWeeks
									weekThresholds {
										pricePerWeek
										thresholdMax
									}
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
							centerNameRelation
							minimumAge
							priceDetails {
								package {
									payPeriod
									price
									duration
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

	/* Although we're using Formsy elsewhere in the application for validation, something about the structure of this section of the application
	is screwing with Formsy. Hence, this custom solution. */
	// const validateForm = () => {
	// 	let requiredFields;

	// 	if (applicationData.programType === 'in-person') {
	// 		requiredFields = [
	// 			'center',
	// 			'program',
	// 			'duration',
	// 			'housing',
	// 			'programStartDate',
	// 			'programEndDate',
	// 			'housingCheckInDate',
	// 			'housingCheckOutDate',
	// 			'extraNights',
	// 			'requiresI20',
	// 			'transferStudent',
	// 			'flsHealthInsurance',
	// 			'unaccompaniedMinorService',
	// 		];

	// 		if (applicationData.requiresI20 === 'yes') {
	// 			requiredFields.concat('expressMail', 'processSEVISAppFee');
	// 		}

	// 		// TODO: Make sure to include airport pick up options & special requests
	// 		// if (
	// 		// 	applicationData.airportPickUp ||
	// 		// 	applicationData.airportDropOff
	// 		// ) {
	// 		// 	requiredFields.concat('');
	// 		// }
	// 	} else if (applicationData.programType === 'online') {
	// 		requiredFields = [];
	// 	} else if (applicationData.programType === 'speciality-tours') {
	// 		requiredFields = [];
	// 	}

	// 	return requiredFields.every(
	// 		requiredField => applicationData[requiredField]
	// 	);
	// };

	const [isValidForm, setIsValidForm] = useState();

	const renderFormViews = programType => {
		if (programType === 'in-person') {
			return (
				<InPersonInfoForm
					calculatePrice={calculatePrice}
					handleDataChange={handleDataChange}
					handleBatchInputChange={handleBatchInputChange}
					prices={prices}
					setPrices={setPrices}
					applicationData={applicationData}
					programsData={programsData.inPerson}
					setIsValidForm={setIsValidForm}
					handleApplicationState={handleApplicationState}
					setIsValidForm={setIsValidForm}
				/>
			);
		} else if (programType === 'online') {
			return (
				<OnlineInfoForm
					programType={programType}
					applicationData={applicationData}
					programsData={programsData.online}
					handleDataChange={handleDataChange}
					handleBatchInputChange={handleBatchInputChange}
					prices={prices}
					setPrices={setPrices}
				/>
			);
		} else if (programType === 'specialty-tours') {
			return (
				<SpecialtyToursInfoForm
					calculatePrice={calculatePrice}
					handleDataChange={handleDataChange}
					handleBatchInputChange={handleBatchInputChange}
					prices={prices}
					setPrices={setPrices}
					applicationData={applicationData}
					programsData={programsData.specialtyTours}
				/>
			);
		}
	};

	return (
		<Formsy
			onChange={handleApplicationState}
			onValid={() => {
				// console.log(`form is good`);
				setIsValidForm(true);
			}}
			onInvalid={() => {
				// console.log(`form ain't good`);
				setIsValidForm(false);
			}}
		>
			<div className="columns is-multiline">
				<AdditionalInfoFormHeader
					programType={applicationData.programType}
					calculatePrice={calculatePrice}
					prices={prices}
					handleDataChange={handleDataChange}
					setApplicationData={setApplicationData}
					setPrices={setPrices}
				/>
				{renderFormViews(applicationData.programType)}
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
						disabled={!isValidForm}
						className={
							isValidForm
								? 'fls__button'
								: 'fls__button fls__button--disabled'
						}
					>
						Save & Continue
					</button>
				</div>
			</div>
		</Formsy>
	);
}
