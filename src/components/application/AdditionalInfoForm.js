import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

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
	generalFeesData,
	handleBatchInputChange,
	prices,
	setPrices,
	applicationData,
	setApplicationData,
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

	const renderFormViews = programType => {
		if (programType === 'in-person') {
			return (
				<div className="columns is-multiline">
					<AdditionalInfoFormHeader
						programType={programType}
						calculatePrice={calculatePrice}
						prices={prices}
						handleDataChange={handleDataChange}
						setApplicationData={setApplicationData}
						setPrices={setPrices}
					/>

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
			);
		} else if (programType === 'online') {
			return (
				<div className="columns is-multiline">
					<AdditionalInfoFormHeader
						programType={programType}
						calculatePrice={calculatePrice}
						prices={prices}
						handleDataChange={handleDataChange}
						setApplicationData={setApplicationData}
						setPrices={setPrices}
					/>

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
			);
		} else if (programType === 'specialty-tours') {
			return (
				<div className="columns is-multiline">
					<AdditionalInfoFormHeader
						programType={programType}
						calculatePrice={calculatePrice}
						prices={prices}
						handleDataChange={handleDataChange}
						setApplicationData={setApplicationData}
						setPrices={setPrices}
					/>

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
			);
		}
	};

	return renderFormViews(applicationData.programType);
}
