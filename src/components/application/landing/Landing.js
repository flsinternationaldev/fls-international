import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import useLocalStorageState from 'use-local-storage-state';

import InPersonForm from 'src/components/application/landing/InPersonForm';

// TODO: Figure out how best to handle validation
export default function Landing() {
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

	const [applicationData, setApplicationData] = useLocalStorageState(
		'applicationData',
		{
			center: '',
			duration: '',
			programStartDate: '',
			housing: '',
			program: '',
			programType: '',
			// TODO: Figure out passport photo & financial document image upload
		}
	);

	const [programType, setProgramType] = useState('on-location');
	const [prices, setPrices] = useLocalStorageState('prices', []);

	// TODO: This is a repeat of logic from the main application
	const handleSetApplicationData = (name, value) => {
		setApplicationData({
			...applicationData,
			[name]: value,
		});
	};

	if (
		applicationData.programType === 'on-location' ||
		!applicationData.programType
	) {
		return (
			<InPersonForm
				applicationData={applicationData}
				handleSetApplicationData={handleSetApplicationData}
				setApplicationData={setApplicationData}
				prices={prices}
				setPrices={setPrices}
				programsData={programsData.inPerson}
			/>
		);
	}
}
