import React, { useState, Fragment } from 'react';
import ReactTooltip from 'react-tooltip';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { RadioGroup, Radio } from 'react-radio-group';
import { useStaticQuery, graphql } from 'gatsby';
import Checkbox from 'rc-checkbox';
import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import {
	formatEdges,
	updatePrices,
	removePrices,
	generatePriceThresholds,
	calculateDateOffset,
} from 'src/utils/helpers';

// TODO: Figure out a better way to implement this data
let airportData;

export default function InPersonInfoForm({
	handleDataChange,
	handleBatchInputChange,
	prices,
	setPrices,
	applicationData,
	programsData,
}) {
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
			enhancements: allMarkdownRemark(
				limit: 1000
				filter: {
					fileAbsolutePath: { regex: "/data/enhancements/in-person/" }
				}
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
				filter: {
					fileAbsolutePath: {
						regex: "/data/general-fees/specialty-tours/"
					}
				}
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

	programsData = formatEdges(programsData);

	const generalFeesData = formatEdges(data.generalFees);

	const centersData = formatEdges(data.locations);

	const enhancementsData = formatEdges(data.enhancements);

	const [durationOptions, setDurationOptions] = useState([]);
	const [programOptions, setProgramOptions] = useState([]);
	const [startDateOptions, setStartDateOptions] = useState([]);
	const [airportOptions, setAirportOptions] = useState([]);

	if (
		!prices.find(priceItem =>
			priceItem.label.toLowerCase().includes('application')
		)
	) {
		const applicationFeeData = generalFeesData.find(generalFee =>
			generalFee.name.toLowerCase().includes('application')
		);

		let updatedPrices = [...prices];

		updatedPrices.push({
			type: 'general fees',
			label: applicationFeeData.name,
			priceDetails: {
				price: applicationFeeData.priceDetails.price,
				// TODO: Is there a way to capture the payPeriod for programs in the CMS?
				payPeriod: applicationFeeData.priceDetails.payPeriod,
			},
		});

		setPrices(updatedPrices);
	}

	// Prune out any centers that have no in person programs
	const centerOptions = centersData
		.map(center => {
			return {
				value: center.centerName,
				label: `${center.centerName} @ ${center.name}`,
			};
		})
		.filter(center =>
			programsData.some(program =>
				program.centerNameRelation.includes(center.value)
			)
		);

	// TODO: DRY up these functions
	const handleCenterChange = centerChange => {
		// Set state operatons are async, so we'll use this non-async version for the below operations
		const currentCenter = centersData.find(
			center => center.centerName === centerChange.value
		);

		handleDataChange('center', currentCenter, 'application');

		/*
        If the duration or program is already selected, and the user picks a new center, this can cause complications with already selected programs
        and durations. It seems easier, then, to just require them to reselect a program & duration.
    */
		if (applicationData.duration || applicationData.program) {
			/*
            Originally, this was two state changes in quick succession. This was causing problems, and though there may be a better way to handle it,
            manually batching the state changes seems to solve the problem.
        */
			let blankedApplicationData = {};

			if (applicationData.duration)
				blankedApplicationData.duration = null;
			if (applicationData.program) blankedApplicationData.program = null;

			handleBatchInputChange(blankedApplicationData, 'application');

			setPrices(removePrices(prices, ['program']));
		}

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

		airportData = enhancementsData.filter(enhancement => {
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
		const currentProgram = programsData.find(
			program => program.name === programChange.label
		);

		// TODO: State changes are async, so we keep using 'currentProgram' inside this function scope
		// With some refactoring, we could probably change 'handleDataChange' to take a callback that can be passed to the state change
		handleDataChange('program', currentProgram, 'application');

		// TODO: Need to re-enter dates in the CMS for the new date format
		const formattedDates = currentProgram.programDates.map(programDate => {
			const parsedDateString = parseInt(programDate.arrive);

			return {
				value: new Date(parsedDateString),
				label: moment(parsedDateString).format('MMM Do, YY'),
			};
		});

		setStartDateOptions(formattedDates);

		if (currentProgram.priceDetails.range) {
			// TODO: This 'generatePriceThresholds' function should be distributed among the other program types
			setDurationOptions(
				generatePriceThresholds(
					currentProgram.priceDetails.range.maxWeeks,
					currentProgram.priceDetails.range.exceedMaxWeeks
				)
			);

			handleDataChange('program', currentProgram, 'application');
		} else if (currentProgram.priceDetails.package) {
			setDurationOptions([
				{
					label: `${currentProgram.priceDetails.package.duration} weeks`,
					value: currentProgram.priceDetails.package.duration,
				},
			]);

			handleBatchInputChange(
				{
					program: currentProgram,
					duration: {
						label: `${currentProgram.priceDetails.package.duration} weeks`,
						value: currentProgram.priceDetails.package.duration,
					},
				},
				'application'
			);
		}
	};

	const handleDurationChange = durationChange => {
		// If programStartDate exists, we can be confident there's also a program end date & housing check in/check out dates
		// TODO: Implement this new 'calculateDateOffset' helpers into the other program types
		if (applicationData.programStartDate) {
			handleBatchInputChange(
				{
					programEndDate: calculateDateOffset(
						applicationData.programStartDate,
						durationChange.value * 7 - 3
					),
					duration: {
						label: durationChange.label,
						value: durationChange.value,
					},
					housingCheckInDate: calculateDateOffset(
						applicationData.programStartDate,
						-1
					),
					housingCheckOutDate: calculateDateOffset(
						applicationData.programStartDate,
						durationChange.value * 7 - 2
					),
				},
				'application'
			);
		} else {
			handleDataChange(
				'duration',
				{
					label: durationChange.label,
					value: durationChange.value,
				},
				'application'
			);
		}

		let pricePerWeek = applicationData.program.priceDetails.range.weekThresholds.reduce(
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

		let updatedPrices = [...prices];

		/*
        The duration input is only responsible for adding a new program,
        since programs are inextricably tied to duration. Other price types, like housing,
        are handled by the change of their respective inputs.
    */
		if (!updatedPrices.find(priceItem => priceItem.type === 'program')) {
			updatedPrices.push({
				type: 'program',
				label: `${applicationData.program.name} @ ${applicationData.center.centerName}`,
				priceDetails: {
					duration: durationChange.value,
					price: pricePerWeek,
					// TODO: Is there a way to capture the payPeriod for programs in the CMS?
					payPeriod: 'Per Week',
				},
			});
		} else {
			// TODO: This function might be clearer if it supports chaining, or a way to pass in multiple changes as arguments
			updatedPrices = updatePrices(updatedPrices, 'program', {
				priceDetails: {
					duration: durationChange.value,
					price: pricePerWeek,
				},
			});
		}

		setPrices(updatedPrices);
	};

	const handleStartDateChange = startDateChange => {
		if (applicationData.duration) {
			handleBatchInputChange(
				{
					programStartDate: startDateChange.value,
					programEndDate: calculateDateOffset(
						startDateChange.value,
						applicationData.duration.value * 7 - 3
					),
					housingCheckInDate: calculateDateOffset(
						startDateChange.value,
						-1
					),
					housingCheckOutDate: calculateDateOffset(
						startDateChange.value,
						applicationData.duration.value * 7 - 2
					),
				},
				'application'
			);
		}
	};

	const handleAirportChange = airportChange => {
		const currentAirport = airportData.find(airport =>
			airport.notes.includes(airportChange.label)
		);

		handleDataChange('airport', airportChange.value, 'application');

		let updatedPrices = [...prices];

		const hasAirportPickUpPrice = updatedPrices.find(
			priceItem =>
				priceItem.type === 'enhancements' &&
				priceItem.label.toLowerCase().includes('pick up')
		);

		const hasAirportDropOffPrice = updatedPrices.find(
			priceItem =>
				priceItem.type === 'enhancements' &&
				priceItem.label.toLowerCase().includes('drop off')
		);

		// TODO: This very clearly needs DRYing
		if (hasAirportPickUpPrice) {
			// TODO: This can be refactored to use 'updatePrices,' which can be refactored to accept this kind of logic
			updatedPrices = removePrices(
				prices,
				['enhancements'],
				priceItem => !priceItem.label.toLowerCase().includes('pick up')
			);
		}

		if (applicationData.airportPickUp) {
			updatedPrices.push({
				type: 'enhancements',
				label: `${currentAirport.notes[0]} - Pick Up`,
				priceDetails: {
					price: currentAirport.priceDetails.price,
					duration: 1,
					payPeriod: currentAirport.priceDetails.payPeriod,
				},
			});
		}

		if (hasAirportDropOffPrice) {
			// TODO: This can be refactored to use 'updatePrices,' which can be refactored to accept this kind of logic
			updatedPrices = removePrices(
				prices,
				['general fees'],
				priceItem => !priceItem.label.toLowerCase().includes('drop off')
			);
		}

		if (applicationData.airportDropOff) {
			updatedPrices.push({
				type: 'general fees',
				label: `${currentAirport.notes[0]} - Drop Off`,
				priceDetails: {
					price: currentAirport.priceDetails.price,
					duration: 1,
					payPeriod: currentAirport.priceDetails.payPeriod,
				},
			});
		}

		setPrices(updatedPrices);
	};

	const isMonday = date => date.getDay() === 1;

	return (
		<Fragment>
			<div className="column is-full-tablet is-half-desktop">
				<div className="application__label-container">
					<label className="label label--application">
						FLS Center
					</label>
				</div>

				<Select
					className="fls__select-container"
					classNamePrefix={'fls'}
					value={{
						label: applicationData.center
							? `${applicationData.center.centerName} @ ${applicationData.center.name}`
							: 'Select a center.',
						value: applicationData.center
							? applicationData.center.centerName
							: null,
					}}
					onChange={centerOption => {
						handleCenterChange(centerOption);
					}}
					options={centerOptions}
				/>
			</div>

			<div className="column is-full-tablet is-half-desktop">
				<div className="application__label-container">
					<label className="label label--application">Program</label>
					{applicationData.center ? null : (
						<span className="label label--application label--select-first fls--red">
							Select a center first
						</span>
					)}
				</div>

				<Select
					className={`fls__select-container ${
						!applicationData.center
							? 'fls__select-container--disabled'
							: ''
					}`}
					classNamePrefix={'fls'}
					value={{
						label: applicationData.program
							? applicationData.program.name
							: 'Select a program',
						value: applicationData.program
							? applicationData.program.name
							: 'Select a program',
					}}
					onChange={handleProgramChange}
					options={programOptions}
					isDisabled={!applicationData.center}
				/>
			</div>

			<div className="column is-full-tablet is-half-desktop">
				<div className="application__label-container">
					<label className="label label--application">
						Duration
						<FontAwesomeIcon
							className={`application__info-icon ${
								applicationData.program &&
								applicationData.program.priceDetails.package
									? ''
									: 'fls__hide'
							}`}
							icon={faInfoCircle}
							data-tip="This specialty tour has a fixed duraton."
						/>
					</label>

					{applicationData.program ? null : (
						<span className="label label--application label--select-first fls--red">
							Select a program first
						</span>
					)}
				</div>

				<Select
					className={`fls__select-container ${
						!applicationData.program
							? 'fls__select-container--disabled'
							: ''
					}`}
					classNamePrefix={'fls'}
					value={{
						label: applicationData.duration
							? applicationData.duration.label
							: 'Select a duration.',
						value: applicationData.duration
							? applicationData.duration.value
							: null,
					}}
					onChange={handleDurationChange}
					options={durationOptions}
					isDisabled={
						!applicationData.program ||
						applicationData.program.priceDetails.package
					}
				/>
			</div>

			{/* TODO: There's a better way to take up this space */}
			<div className="column is-half"></div>

			{/* TODO: This field needs some serious validation */}
			<div className="column is-full-tablet is-half-desktop">
				<div className="application__label-container">
					<label className="label label--application">
						Program Start Date
						<FontAwesomeIcon
							className="application__info-icon"
							icon={faInfoCircle}
							data-tip="In-person programs begin on Mondays."
						/>
					</label>

					{applicationData.program ? null : (
						<span className="label label--application label--select-first fls--red">
							Select a program first
						</span>
					)}
				</div>

				<Select
					className={`fls__select-container ${
						!applicationData.program
							? 'fls__select-container--disabled'
							: ''
					}`}
					classNamePrefix={'fls'}
					value={{
						label: applicationData.programStartDate
							? moment(applicationData.programStartDate).format(
									'MMMM Do, YYYY'
							  )
							: 'Select a start date.',
						value: applicationData.programStartDate,
					}}
					onChange={handleStartDateChange}
					options={startDateOptions}
					isDisabled={!applicationData.program}
				/>
			</div>

			<div className="column is-full-tablet is-half-desktop">
				<div className="application__label-container">
					<label className="label label--application">
						Program End Date
					</label>
				</div>

				<DatePicker
					selected={applicationData.programEndDate}
					wrapperClassName={`fls__date-wrapper fls__date-wrapper--read-only ${
						!applicationData.duration
							? 'fls__select-container--disabled'
							: ''
					}`}
					className={'input fls__base-input'}
					placeholderText={'Program End Date'}
					readOnly={true}
				/>
			</div>

			<div className="column is-full-tablet is-half-desktop">
				<div className="application__label-container">
					<label className="label label--application">
						Housing Check In Date
						<FontAwesomeIcon
							className="application__info-icon"
							icon={faInfoCircle}
							data-tip={`Check in is the Sunday before the program start date. If you need different accommodations, please select "Extra Nights of Housing Required" below.`}
						/>
					</label>

					{applicationData.programStartDate ? null : (
						<span className="label label--application label--select-first fls--red">
							Select a program start date
						</span>
					)}
				</div>

				<DatePicker
					selected={applicationData.housingCheckInDate}
					wrapperClassName={`fls__date-wrapper fls__date-wrapper--read-only ${
						!applicationData.programStartDate
							? 'fls__select-container--disabled'
							: ''
					}`}
					className={'input fls__base-input'}
					placeholderText={'Housing Check-in Date'}
					readOnly={true}
				/>
			</div>

			<div className="column is-full-tablet is-half-desktop">
				<div className="application__label-container">
					<label className="label label--application">
						Housing Check Out Date
						<FontAwesomeIcon
							className="application__info-icon"
							icon={faInfoCircle}
							data-tip={`Check out is the Saturday after the program end date. If you need different accommodations, please select "Extra Nights of Housing Required" below.`}
						/>
					</label>
				</div>

				<DatePicker
					selected={applicationData.housingCheckOutDate}
					className={'input fls__base-input'}
					wrapperClassName={`fls__date-wrapper fls__date-wrapper--read-only ${
						!applicationData.programStartDate
							? 'fls__select-container--disabled'
							: ''
					}`}
					placeholderText={'Housing Check Out Date'}
					readOnly={true}
				/>
			</div>

			{airportOptions.length ? (
				<div className="column is-half">
					<div className="label label--application">
						Airport Transport
					</div>

					<label className="checkbox">
						<Checkbox
							className="checkbox"
							defaultChecked={applicationData.airportPickUp}
							onChange={e =>
								handleDataChange(
									'airportPickUp',
									e.target.checked,
									'application'
								)
							}
						/>
						<span className="fls__radio-label">
							Airport Pick Up
						</span>
					</label>

					<label className="checkbox">
						<Checkbox
							className="checkbox"
							defaultChecked={applicationData.airportDropOff}
							onChange={e =>
								handleDataChange(
									'airportDropOff',
									e.target.checked,
									'application'
								)
							}
						/>
						<span className="fls__radio-label">
							Airport Drop Off
						</span>
					</label>
				</div>
			) : null}

			{applicationData.airportPickUp || applicationData.airportDropOff ? (
				<div className="column is-half">
					<label className="label label--application">
						{applicationData.center
							? 'Airport Options'
							: 'Airport Options * - Select a center first'}
					</label>

					<Select
						className={`fls__select-container ${
							!applicationData.center
								? 'fls__select-container--disabled'
								: ''
						}`}
						classNamePrefix={'fls'}
						value={{
							label: applicationData.airport,
							value: applicationData.airport,
						}}
						onChange={handleAirportChange}
						options={airportOptions}
					/>
				</div>
			) : null}

			{applicationData.airportPickUp || applicationData.airportDropOff ? (
				<div className="column is-half">
					<label className="label">
						Airport Transport Special Requests
						<FontAwesomeIcon
							className="application__info-icon"
							icon={faInfoCircle}
							data-tip="Note that any additional requests may incur extra charges."
						/>
					</label>

					<input type="text" className="input" />
				</div>
			) : null}

			<div className="column is-full">
				<label className="label label--application">
					Do you require an I-20 Form?
					<FontAwesomeIcon
						className="application__info-icon"
						icon={faInfoCircle}
						data-tip="As of July 1, 2016, the redesigned Form I-20 is required for all F and M nonimmigrant visa applications, entry into the United States, travel and applications for nonimmigrant benefits. The previous version of the Form I-20 (with a barcode) is now invalid."
					/>
				</label>

				<RadioGroup
					selectedValue={applicationData.requiresI20}
					onChange={value => {
						handleDataChange('requiresI20', value, 'application');
					}}
				>
					<Radio value="yes" />
					<span className="fls__radio-label">Yes</span>
					<Radio value="no" />
					<span className="fls__radio-label">No</span>
				</RadioGroup>
			</div>

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
						<label className="label label--application">
							Would you like your I-20 Form and acceptance
							documents to be sent by Express Mail?
						</label>

						<RadioGroup
							selectedValue={applicationData.expressMail}
							onChange={value => {
								const expressMailData = generalFeesData.find(
									generalFee =>
										generalFee.name
											.toLowerCase()
											.includes('express')
								);

								if (value === 'yes') {
									// TODO: Looking for the word 'health' in the name is far from the most robust way of finding this specific general fee
									if (
										!prices.find(
											priceItem =>
												priceItem.type ===
													'general fees' &&
												priceItem.label
													.toLowerCase()
													.includes('express')
										)
									) {
										prices.push({
											type: 'general fees',
											label: expressMailData.name,
											priceDetails: {
												price:
													expressMailData.priceDetails
														.price,
												duration: 1,
												payPeriod:
													expressMailData.priceDetails
														.payPeriod,
											},
										});

										setPrices(prices);
									}
								} else if (value === 'no') {
									setPrices(
										removePrices(
											prices,
											['general fees'],
											priceItem =>
												!priceItem.label
													.toLowerCase()
													.includes('express')
										)
									);
								}

								handleDataChange(
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
						<label className="label label--application">
							{/* TODO: If chosen, should this actually add $350 to the final billing? */}
							Would you like FLS to process the $350 SEVIS
							Application Fee for you?
							<FontAwesomeIcon
								className="application__info-icon"
								icon={faInfoCircle}
								data-tip="This is only for students who need an student F-1 visa from the US Embassy. This fee will be charged by the U.S. Government, not by FLS International."
							/>
						</label>

						<RadioGroup
							selectedValue={applicationData.processSEVISAppFee}
							onChange={value => {
								handleDataChange(
									'processSEVISAppFee',
									value,
									'application'
								);
							}}
							onChange={value => {
								const sevisAppData = generalFeesData.find(
									generalFee =>
										generalFee.name
											.toLowerCase()
											.includes('sevis')
								);

								if (value === 'yes') {
									// TODO: Looking for the word 'SEVIS' in the name is far from the most robust way of finding this specific general fee
									if (
										!prices.find(
											priceItem =>
												priceItem.type ===
													'general fees' &&
												priceItem.label
													.toLowerCase()
													.includes('sevis')
										)
									) {
										prices.push({
											type: 'general fees',
											label: sevisAppData.name,
											priceDetails: {
												price:
													sevisAppData.priceDetails
														.price,
												duration: 1,
												payPeriod:
													sevisAppData.priceDetails
														.payPeriod,
											},
										});

										setPrices(prices);
									}
								} else if (value === 'no') {
									setPrices(
										removePrices(
											prices,
											['general fees'],
											priceItem =>
												!priceItem.label
													.toLowerCase()
													.includes('sevis')
										)
									);
								}

								handleDataChange(
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
				</Fragment>
			) : null}

			<div className="column is-full">
				<div className="application__label-container">
					<label className="label label--application">
						Would you like to purchase health insurance through FLS?
						<FontAwesomeIcon
							className="application__info-icon"
							icon={faInfoCircle}
							data-tip="Health insurance is mandatory for all students. If not purchased through FLS International, you must purchase insurance in your home country."
						/>
					</label>
					{applicationData.duration ? null : (
						<span className="label label--application label--select-first fls--red">
							Select a duration first
						</span>
					)}
				</div>

				<RadioGroup
					className={`fls-input__radio-group ${
						!applicationData.duration
							? 'fls-input__radio-group--disabled'
							: ''
					}`}
					selectedValue={applicationData.buyingHealthInsurance}
					onChange={value => {
						const healthInsuranceData = generalFeesData.find(
							generalFee =>
								generalFee.name.toLowerCase().includes('health')
						);

						if (value === 'yes') {
							// TODO: Looking for the word 'health' in the name is far from the most robust way of finding this specific general fee
							if (
								!prices.find(
									priceItem =>
										priceItem.type === 'general fees' &&
										priceItem.label
											.toLowerCase()
											.includes('health')
								)
							) {
								prices.push({
									type: 'general fees',
									label: healthInsuranceData.name,
									priceDetails: {
										price:
											healthInsuranceData.priceDetails
												.price,
										duration:
											applicationData.duration.value || 0,
										payPeriod:
											healthInsuranceData.priceDetails
												.payPeriod,
									},
								});

								setPrices(prices);
							}
						} else if (value === 'no') {
							setPrices(
								removePrices(
									prices,
									['general fees'],
									priceItem =>
										!priceItem.label
											.toLowerCase()
											.includes('health')
								)
							);
						}

						handleDataChange(
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
				<label className="label label--application">
					Would you like FLS to provide Unaccompanied Minor Service?
					<FontAwesomeIcon
						className="application__info-icon"
						icon={faInfoCircle}
						data-tip="Upon request, FLS will provide the name and contact information of a specific designated driver to the agent and airline
                        for pick-up and provide chaperone service to airport security for airport drop-off."
					/>
				</label>

				<RadioGroup
					selectedValue={applicationData.unaccompaniedMinorService}
					onChange={value => {
						const unaccompaniedMinorServiceData = enhancementsData.find(
							generalFee =>
								generalFee.name
									.toLowerCase()
									.includes('unaccompanied')
						);

						if (value === 'yes') {
							// TODO: Looking for the word 'health' in the name is far from the most robust way of finding this specific general fee
							if (
								!prices.find(
									priceItem =>
										priceItem.type === 'enhancements' &&
										priceItem.label
											.toLowerCase()
											.includes('unaccompanied')
								)
							) {
								prices.push({
									type: 'enhancements',
									label: unaccompaniedMinorServiceData.name,
									priceDetails: {
										price:
											unaccompaniedMinorServiceData
												.priceDetails.price,
										duration: 1,
										payPeriod:
											unaccompaniedMinorServiceData
												.priceDetails.payPeriod,
									},
								});

								setPrices(prices);
							}
						} else if (value === 'no') {
							setPrices(
								removePrices(
									prices,
									['enhancements'],
									priceItem =>
										!priceItem.label
											.toLowerCase()
											.includes('unaccompanied')
								)
							);
						}

						handleDataChange(
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
		</Fragment>
	);
}
