import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { RadioGroup, Radio } from 'react-radio-group';
import { useStaticQuery, graphql } from 'gatsby';
// import moment from 'moment';

export default function AdditionalInfoForm({
	calculatePrice,
	nextStep,
	previousStep,
	setGeneralFeesTitle,
	currentCenter,
	setCurrentCenter,
	currentProgram,
	setCurrentProgram,
	handleInputChange,
	handleBatchInputChange,
	prices,
	setPrices,
	applicationData,
}) {
	console.log('prices!', prices);
	const data = useStaticQuery(graphql`
		{
			locations: allMarkdownRemark(
				limit: 1000
				filter: { fileAbsolutePath: { regex: "/data/locations/" } }
			) {
				edges {
					node {
						frontmatter {
							name
							centerName
						}
					}
				}
			}
			housing: allMarkdownRemark(
				limit: 1000
				filter: { fileAbsolutePath: { regex: "/data/housing/" } }
			) {
				edges {
					node {
						frontmatter {
							name
							centerNameRelation
							priceDetails {
								payPeriod
								price
							}
						}
					}
				}
			}
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
							hoursPerWeek
							lessonsPerWeek
							minutesPerLesson
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
							hoursPerWeek
							lessonsPerWeek
							minutesPerLesson
						}
					}
				}
			}
			enhancements: allMarkdownRemark(
				limit: 1000
				filter: { fileAbsolutePath: { regex: "/data/enhancements//" } }
			) {
				edges {
					node {
						frontmatter {
							name
							centerNameRelation
							priceDetails {
								price
								payPeriod
							}
							notes
						}
					}
				}
			}
			generalFees: allMarkdownRemark(
				limit: 1000
				filter: { fileAbsolutePath: { regex: "/data/general-fees//" } }
			) {
				edges {
					node {
						frontmatter {
							name
							centerNameRelation
							priceDetails {
								price
								payPeriod
							}
						}
					}
				}
			}
		}
	`);

	// TODO: This is a straight copy/paste from Application Landing, and is in need of DRYing
	const programsData = data[
		applicationData.programType.replace(/-([a-z])/g, g =>
			g[1].toUpperCase()
		)
	].edges.map(edge => edge.node.frontmatter);

	// TODO: DRY this up
	const centersData = data.locations.edges.map(edge => edge.node.frontmatter);

	const housingData = data.housing.edges.map(edge => edge.node.frontmatter);

	const enhancementsData = data.enhancements.edges.map(
		edge => edge.node.frontmatter
	);

	const generalFeesData = data.generalFees.edges.map(
		edge => edge.node.frontmatter
	);

	const [durationOptions, setDurationOptions] = useState([]);
	const [programOptions, setProgramOptions] = useState([]);
	const [housingOptions, setHousingOptions] = useState([]);
	const [airportOptions, setAirportOptions] = useState([]);
	const [currentDuration, setCurrentDuration] = useState(0);

	const [durationLabel, setDurationLabel] = useState('Choose Your Duration');
	const [durationValue, setDurationValue] = useState(null);

	const [centerLabel, setCenterLabel] = useState('Choose Your Center');
	const [centerValue, setCenterValue] = useState(null);

	const [housingLabel, setHousingLabel] = useState('Choose Your Housing');
	const [housingValue, setHousingValue] = useState(null);

	const [programLabel, setProgramLabel] = useState('Choose Your Program');
	const [programValue, setProgramValue] = useState(null);

	const [programType, setProgramType] = useState('on-location');

	const centerOptions = centersData.map(center => {
		return {
			value: center.centerName,
			label: `${center.centerName} @ ${center.name}`,
		};
	});

	// TODO: DRY up these functions	const handleCenterChange = centerChange => {
	const handleCenterChange = centerChange => {
		setCenterLabel(centerChange.label);
		setCenterValue(centerChange.value);

		// Set state operatons are async, so we'll use this non-async version for the below operations
		const currentCenter = centersData.find(
			center => center.centerName === centerChange.value
		);

		// setGeneralFeesTitle(currentCenter.general_fees);

		handleInputChange('flsCenter', centerChange.label, 'application');

		setCurrentCenter(currentCenter);

		// Set program options to be the programs associated with the selected center
		setProgramOptions(
			programsData
				.filter(program => {
					return program.centerNameRelation.includes(
						centerChange.value
					);
				})
				.map(program => {
					return {
						value: program.name.toLowerCase().split(' ').join('-'),
						label: program.name,
					};
				})
		);

		setHousingOptions(
			housingData
				.filter(housing => {
					return housing.centerNameRelation.includes(
						centerChange.value
					);
				})
				.map(housing => {
					return {
						value: housing.name.toLowerCase().split(' ').join('-'),
						label: housing.name,
					};
				})
		);

		const airportData = enhancementsData.filter(enhancement => {
			return (
				enhancement.centerNameRelation.includes(centerChange.value) &&
				enhancement.name.toLowerCase().includes('airport')
			);
		});

		if (airportData) {
			setAirportOptions(
				airportData.reduce((accum, enhancement) => {
					enhancement.notes.forEach(note => {
						accum.push({
							value: note,
							label: note,
						});
					});

					return accum;
				}, [])
			);
		}
	};

	const handleProgramChange = programChange => {
		setProgramLabel(programChange.label);
		setProgramValue(programChange.value);

		handleInputChange('program', programChange.label, 'application');

		const currentProgram = programsData.find(
			program => program.name === programChange.label
		);

		let durationOptions = [];

		for (let i = 0; i <= currentProgram.durationOptions.maxWeeks; i++) {
			const weekNum = i + 1;

			// TODO: Likely need to make a special note during submission if they select more than the max weeks
			if (
				currentProgram.durationOptions.exceedMaxWeeks &&
				i == currentProgram.durationOptions.maxWeeks
			) {
				durationOptions.push({
					label: `${i}+ weeks`,
					value: `${weekNum}+`,
				});
			} else if (i < currentProgram.durationOptions.maxWeeks) {
				durationOptions.push({
					label: weekNum === 1 ? `${i + 1} week` : `${i + 1} weeks`,
					value: weekNum,
				});
			}
		}

		setCurrentProgram(currentProgram);

		setDurationOptions(durationOptions);
	};

	// TODO: These changes need to also recalculate off of each other, e.g. if you have a type of housing selected, then change the duration, the housing price needs to be recalculated ... might be time for the old redux
	const handleDurationChange = durationChange => {
		setDurationLabel(durationChange.label);
		setDurationValue(durationChange.value);

		handleInputChange('duration', durationChange.label, 'application');

		let pricePerWeek = currentProgram.durationOptions.weekThresholds.reduce(
			(pricePerWeek, currentWeek, index, arr) => {
				// If there are no previous thresholds, previous max defaults to 0. Otherwise, the minimum threshold value is last week's max threshold, plus one.
				let thresholdMin =
					index === 0 ? 1 : arr[index - 1].thresholdMax + 1;

				if (
					durationChange.value >= thresholdMin &&
					durationChange.value <= currentWeek.thresholdMax
				) {
					return currentWeek.pricePerWeek;
				} else {
					return pricePerWeek;
				}
			},
			0
		);

		setCurrentDuration(durationChange.value);

		// TODO: This 'update prices' logic is begging to be refactored & DRYed up
		prices = prices.map(priceItem => {
			if (priceItem.type === 'program') {
				return {
					...priceItem,
					priceDetails: {
						duration: durationChange.value,
						price: pricePerWeek,
					},
				};
			} else if (prices.find(priceItem => priceItem.type === 'housing')) {
				if (priceItem.type === 'housing') {
				}
				return {
					...priceItem,
					priceDetails: {
						...priceItem.priceDetails,
						duration: durationChange.value,
					},
				};
			} else {
				return priceItem;
			}
		});

		/*
			The duration input is only responsible for adding a new program,
			since programs are inextricably tied to duration. Other price types, like housing,
			are handled by the change of their respective inputs.
		*/
		if (!prices.find(priceItem => priceItem.type === 'program')) {
			prices.push({
				type: 'program',
				label: `${currentProgram.name} @ ${currentCenter.centerName}`,
				priceDetails: {
					duration: durationChange.value,
					price: pricePerWeek,
				},
			});
		}

		setPrices(prices);
	};

	const handleHousingChange = housingChange => {
		setHousingLabel(housingChange.label);
		setHousingValue(housingChange.value);

		handleInputChange('housingType', housingChange.label, 'application');

		const currentHousing = housingData.find(
			housing => housing.name === housingChange.label
		);

		// TODO: This 'new price' logic is begging to be refactored & DRYed up
		if (prices.find(priceItem => priceItem.type === 'housing')) {
			prices = prices.map(priceItem => {
				if (priceItem.type === 'housing') {
					return {
						...priceItem,
						priceDetails: {
							duration: currentDuration,
							price: currentHousing.priceDetails[0].price,
						},
					};
				}
			});
		} else {
			prices.push({
				type: 'housing',
				label: `${currentHousing.name}`,
				priceDetails: {
					duration: currentDuration,
					price: currentHousing.priceDetails[0].price,
				},
			});
		}

		setPrices(prices);
	};

	const isMonday = date => date.getDay() === 1;

	const renderFormViews = programType => {
		if (programType === 'in-person') {
			return (
				<div className="columns is-multiline">
					<div className="column is-full">
						<div className="application__header-container">
							<h3 className="fls__post-title">Additional Info</h3>
							<h3 className="application__total-price">
								Estimated Price: ${calculatePrice(prices)}
							</h3>
						</div>
					</div>
					<div className="column is-half">
						<label className="label">FLS Center*</label>

						<Select
							className="fls__select-container"
							classNamePrefix={'fls'}
							value={{
								label: applicationData.flsCenter,
								value: applicationData.flsCenter,
							}}
							onChange={centerOption => {
								handleCenterChange(centerOption);
							}}
							options={centerOptions}
						/>
					</div>
					<div className="column is-half">
						<label className="label">
							{currentCenter
								? 'Program'
								: 'Program * - Select a location first.'}
						</label>
						<Select
							className={`fls__select-container ${
								!currentCenter
									? 'fls__select-container--disabled'
									: ''
							}`}
							classNamePrefix={'fls'}
							defaultValue={{
								label: 'Select your location first.',
								value: null,
							}}
							value={{
								label: applicationData.program,
								value: applicationData.program,
							}}
							onChange={handleProgramChange}
							options={programOptions}
							isDisabled={!currentCenter}
						/>
					</div>
					<div className="column is-half">
						<label className="label">
							{currentProgram
								? 'Duration'
								: 'Duration * - Select a program first.'}
						</label>
						<Select
							className={`fls__select-container ${
								!currentProgram
									? 'fls__select-container--disabled'
									: ''
							}`}
							classNamePrefix={'fls'}
							value={{
								label: applicationData.duration,
								value: applicationData.duration,
							}}
							onChange={handleDurationChange}
							options={durationOptions}
							isDisabled={!currentProgram}
						/>
					</div>

					<div className="column is-half">
						<label className="label">
							{currentCenter
								? 'Housing Type'
								: 'Housing Type * - Select a center first.'}
						</label>
						<Select
							className={`fls__select-container ${
								!currentCenter
									? 'fls__select-container--disabled'
									: ''
							}`}
							classNamePrefix={'fls'}
							value={{
								label: applicationData.housingType,
								value: applicationData.housingType,
							}}
							onChange={handleHousingChange}
							options={housingOptions}
							isDisabled={!currentCenter}
						/>
					</div>

					{/* TODO: This field needs some serious validation */}
					<div className="column is-half">
						<label className="label">
							{currentProgram
								? 'Program Start Date *'
								: 'Program Start Date * - Select a center first.'}
						</label>

						<DatePicker
							selected={applicationData.startDate}
							onChange={date => {
								handleBatchInputChange(
									{
										startDate: date,
										endDate: new Date(
											Date.parse(date) +
												currentDuration *
													7 *
													24 *
													60 *
													60 *
													1000
										),
									},
									'application'
								);
							}}
							minDate={new Date()}
							value={applicationData.startDate}
							wrapperClassName={`fls__date-wrapper ${
								!currentDuration
									? 'fls__select-container--disabled'
									: ''
							}`}
							className={'input fls__base-input'}
							placeholderText={'Choose Your Start Date'}
							filterDate={isMonday}
							readOnly={!currentDuration}
						/>
					</div>

					<div className="column is-half">
						<label className="label">Program End Date *</label>
						<DatePicker
							// TODO: Should be disabled, calculates based off start date
							selected={applicationData.endDate}
							value={applicationData.endDate}
							wrapperClassName={`fls__date-wrapper ${
								!currentDuration
									? 'fls__select-container--disabled'
									: ''
							}`}
							className={'input fls__base-input'}
							placeholderText={'Program End Date'}
							readOnly={true}
						/>
					</div>

					<div className="column is-half">
						<label className="label">Housing Check In Date *</label>
						<DatePicker
							selected={applicationData.checkInDate}
							onChange={date =>
								handleInputChange(
									'checkInDate',
									date,
									'application'
								)
							}
							value={applicationData.checkInDate}
							wrapperClassName={'fls__date-wrapper'}
							className={'input fls__base-input'}
							placeholderText={'Housing Check-in Date'}
						/>
					</div>

					<div className="column is-half">
						<label className="label">
							Housing Check Out Date *
						</label>
						<DatePicker
							selected={applicationData.checkOutDate}
							onChange={date =>
								handleInputChange(
									'checkOutDate',
									date,
									'application'
								)
							}
							value={applicationData.checkOutDate}
							className={'input fls__base-input'}
							placeholderText={'Housing Check Out Date'}
						/>
					</div>

					<div className="column is-full">
						<label className="label">
							Extra Nights of Housing Required? *
						</label>
						<RadioGroup
							name="extra-housing"
							selectedValue={applicationData.extraNights}
							onChange={value => {
								handleInputChange(
									'extraNights',
									value,
									'application'
								);
							}}
						>
							<Radio value="needs-extra-housing" />
							<span className="fls__radio-label">Yes</span>
							<Radio value="no-extra-housing" />
							<span className="fls__radio-label">No</span>
						</RadioGroup>
					</div>

					<div className="column is-half">
						<label className="label">
							{currentCenter
								? 'Airport'
								: 'Airport * - Select a location first.'}
						</label>

						<Select
							className={`fls__select-container ${
								!currentCenter
									? 'fls__select-container--disabled'
									: ''
							}`}
							classNamePrefix={'fls'}
							value={{
								label: applicationData.airport,
								value: applicationData.airport,
							}}
							onChange={airportOption => {
								handleInputChange(
									'airport',
									airportOption.value,
									'application'
								);
							}}
							options={airportOptions}
						/>
					</div>
					<div className="column is-half">
						<label className="checkbox">
							<input type="checkbox" />
							{/* TODO: This value should come from the CMS */}
							<span className="fls__radio-label">
								Airport Pick up - $150
							</span>
						</label>

						<label className="checkbox">
							<input type="checkbox" />
							<span className="fls__radio-label">
								Airport Drop Off - $150
							</span>
						</label>
					</div>
					<div className="column is-full">
						{/* TODO: Should have a helpful tooltip */}
						<label className="label">
							Do you require an I-20 Form?
						</label>

						<RadioGroup
							selectedValue={applicationData.requiresI20}
							onChange={value => {
								handleInputChange(
									'requiresI20',
									value,
									'application'
								);
							}}
						>
							<Radio value="yes" />
							<span className="fls__radio-label">Yes</span>
							<Radio value="no" />
							<span className="fls__radio-label">No</span>
						</RadioGroup>
					</div>
					<div className="column is-full">
						{/* TODO: Should have a helpful tooltip */}
						<label className="label">
							Are you a transfer student?
						</label>

						<RadioGroup
							selectedValue={applicationData.transferStudent}
							onChange={value => {
								handleInputChange(
									'transferStudent',
									value,
									'application'
								);
							}}
						>
							<Radio value="yes" />
							<span className="fls__radio-label">Yes</span>
							<Radio value="no" />
							<span className="fls__radio-label">No</span>
						</RadioGroup>
					</div>
					<div className="column is-full">
						{/* TODO: Should have a helpful tooltip */}
						<label className="label">
							Would you like to purchase health insurance through
							FLS?
						</label>

						<RadioGroup
							selectedValue={
								applicationData.buyingHealthInsurance
							}
							onChange={value => {
								const healthInsuranceData = generalFeesData.find(
									generalFee =>
										generalFee.name
											.toLowerCase()
											.includes('health')
								);

								if (value === 'yes') {
									// TODO: Looking for the word 'health' in the name is far from the most robust way of finding this specific general fee
									if (
										!prices.find(
											priceItem =>
												priceItem.type ===
													'general-fee' &&
												priceItem.name
													.toLowerCase()
													.includes('health')
										)
									) {
										prices.push({
											type: 'general-fee',
											label: healthInsuranceData.name,
											priceDetails: {
												price:
													healthInsuranceData
														.priceDetails[0].price,
												duration: currentDuration,
											},
										});

										setPrices(prices);
									}
								} else if (value === 'no') {
									setPrices(
										prices.filter(
											priceItem =>
												priceItem.type !==
													'general-fee' &&
												!priceItem.label
													.toLowerCase()
													.includes('health')
										)
									);
								}

								handleInputChange(
									'buyingHealthInsurance',
									value,
									'application'
								);
							}}
						>
							<Radio value="yes" />
							<span className="fls__radio-label">Yes</span>
							<Radio value="no" />
							<span className="fls__radio-label">No</span>
						</RadioGroup>
					</div>
					<div className="column is-full">
						{/* TODO: Should have a helpful tooltip */}
						<label className="label">
							Would you like your I-20 Form and acceptance
							documents to be sent by Express Mail?
						</label>

						<RadioGroup
							selectedValue={applicationData.expressMail}
							onChange={value => {
								handleInputChange(
									'expressMail',
									value,
									'application'
								);
							}}
						>
							<Radio value="yes" />
							<span className="fls__radio-label">Yes</span>
							<Radio value="no" />
							<span className="fls__radio-label">No</span>
						</RadioGroup>
					</div>
					<div className="column is-full">
						{/* TODO: Should have a helpful tooltip */}
						<label className="label">
							{/* TODO: If chosen, should this actually add $350 to the final billing? */}
							Would you like FLS to process the $350 SEVIS
							Application Fee for you?
						</label>

						<RadioGroup
							selectedValue={applicationData.processSEVISAppFee}
							onChange={value => {
								handleInputChange(
									'processSEVISAppFee',
									value,
									'application'
								);
							}}
						>
							<Radio value="yes" />
							<span className="fls__radio-label">Yes</span>
							<Radio value="no" />
							<span className="fls__radio-label">No</span>
						</RadioGroup>
					</div>
					<div className="column is-full">
						{/* TODO: Should have a helpful tooltip */}
						<label className="label">
							Would you like FLS to provide Unaccompanied Minor
							Service?
						</label>

						<RadioGroup
							selectedValue={
								applicationData.unaccompaniedMinorService
							}
							onChange={value => {
								handleInputChange(
									'unaccompaniedMinorService',
									value,
									'application'
								);
							}}
						>
							<Radio value="yes" />
							<span className="fls__radio-label">Yes</span>
							<Radio value="no" />
							<span className="fls__radio-label">No</span>
						</RadioGroup>
					</div>
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
								console.log(
									'application data - additional info',
									applicationData
								);
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
