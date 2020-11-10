import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { RadioGroup, Radio } from 'react-radio-group';
import useLocalStorageState from 'use-local-storage-state';

import InPersonForm from 'src/components/application/landing/InPersonForm';
import OnlineForm from 'src/components/application/landing/OnlineForm';
import SpecialtyToursForm from 'src/components/application/landing/SpecialtyToursForm';

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
			onlineProgramType: '',
			programType: 'in-person',
			// TODO: Figure out passport photo & financial document image upload
		}
	);

	const [prices, setPrices] = useLocalStorageState('prices', []);

	// TODO: This is a repeat of logic from the main application
	const handleSetApplicationData = (name, value) => {
		setApplicationData({
			...applicationData,
			[name]: value,
		});
	};

	const renderAppForms = () => {
		if (applicationData.programType === 'in-person') {
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
		} else if (applicationData.programType === 'online') {
			return (
				<OnlineForm
					applicationData={applicationData}
					handleSetApplicationData={handleSetApplicationData}
					setApplicationData={setApplicationData}
					prices={prices}
					setPrices={setPrices}
					programsData={programsData.online}
				/>
			);
		} else if (applicationData.programType === 'specialty-tours') {
			return (
				<SpecialtyToursForm
					applicationData={applicationData}
					handleSetApplicationData={handleSetApplicationData}
					setApplicationData={setApplicationData}
					prices={prices}
					setPrices={setPrices}
					programsData={programsData.specialtyTours}
				/>
			);
		}
	};

	return (
		<div className="columns is-multiline">
			<div className="column is-full control">
				{/* TODO: Ensure you can click the label to select the radio */}
				<RadioGroup
					name="program-type"
					selectedValue={applicationData.programType}
					onChange={value => {
						setApplicationData({ programType: value });
					}}
				>
					<Radio value="in-person" />
					<span className="fls__radio-label">On Location</span>

					<Radio value="online" />
					<span className="fls__radio-label">Online</span>

					<Radio value="specialty-tours" />
					<span className="fls__radio-label">Specialty Tour</span>
				</RadioGroup>
			</div>

			{renderAppForms()}

			<Link to={'/application'} className="column is-half">
				<button className="fls__button">Apply Now</button>
			</Link>
		</div>
	);
}
