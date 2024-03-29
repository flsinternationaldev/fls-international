import React, { useState, Fragment } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { RadioGroup, Radio } from 'react-radio-group';
import ReactTooltip from 'react-tooltip';
import { useStaticQuery, graphql } from 'gatsby';
import Checkbox from 'rc-checkbox';
import _isNil from 'lodash.isnil';

import SelectInput from 'src/components/application/form/SelectInput';
import DateInput from 'src/components/application/form/DateInput';
import RadioInput from 'src/components/application/form/RadioInput';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import { formatEdges, updatePrices, removePrices } from 'src/utils/helpers';

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
					fileAbsolutePath: { regex: "/data/general-fees/in-person/" }
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

	const housingData = formatEdges(data.housing);

	const enhancementsData = formatEdges(data.enhancements);

	const [durationOptions, setDurationOptions] = useState([]);
	const [programOptions, setProgramOptions] = useState([]);
	const [housingOptions, setHousingOptions] = useState([]);
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
				value: center,
				label: `${center.centerName} @ ${center.name}`,
			};
		})
		.filter(center =>
			programsData.some(program =>
				program.centerNameRelation.includes(center.value.centerName)
			)
		);

	// TODO: DRY up these functions
	const handleCenterChange = centerChange => {
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
			if (applicationData.housing) blankedApplicationData.housing = null;

			handleBatchInputChange(blankedApplicationData, 'application');

			setPrices(removePrices(prices, ['program', 'housing']));
		}

		// Set program options to be the programs associated with the selected center
		setProgramOptions(
			programsData
				.filter(program => {
					return program.centerNameRelation.includes(
						centerChange.value.centerName
					);
				})
				.map(program => {
					return {
						value: program,
						label: program.name,
					};
				})
		);

		setHousingOptions(
			housingData
				.filter(housing => {
					return housing.centerNameRelation.includes(
						centerChange.value.centerName
					);
				})
				.map(housing => {
					return {
						value: housing,
						label: housing.name,
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
		const currentProgram = programChange.value;

		// TODO: State changes are async, so we keep using 'currentProgram' inside this function scope
		// With some refactoring, we could probably change 'handleDataChange' to take a callback that can be passed to the state change
		// handleDataChange('program', currentProgram, 'application');

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
					value: { label: `${i}+ weeks`, value: `${weekNum}+` },
				});
			} else if (i < currentProgram.durationOptions.maxWeeks) {
				durationOptions.push({
					label: weekNum === 1 ? `${i + 1} week` : `${i + 1} weeks`,
					value: {
						label:
							weekNum === 1 ? `${i + 1} week` : `${i + 1} weeks`,
						value: weekNum,
					},
				});
			}
		}

		setDurationOptions(durationOptions);
	};

	const handleDurationChange = durationChange => {
		const currentDuration = durationChange.value;

		// If programStartDate exists, we can be confident there's also a program end date & housing check in/check out dates
		if (applicationData.programStartDate) {
			handleBatchInputChange(
				{
					programEndDate: (() => {
						const clonedDate = new Date(
							applicationData.programStartDate
						);

						// Each 'week' needs to end on a friday, hence this weird math
						return clonedDate.setDate(
							clonedDate.getDate() +
								(currentDuration.value * 7 - 3)
						);
					})(),
					housingCheckOutDate: (() => {
						const clonedDate = new Date(
							applicationData.housingCheckInDate
						);

						return clonedDate.setDate(
							clonedDate.getDate() +
								(currentDuration.value * 7 - 1)
						);
					})(),
				},
				'application'
			);
		}

		let pricePerWeek = applicationData.program.durationOptions.weekThresholds.reduce(
			(pricePerWeek, currentWeek, index, arr) => {
				// If there are no previous thresholds, previous max defaults to 0. Otherwise, the minimum threshold value is last week's max threshold, plus one.
				let thresholdMin =
					index === 0 ? 1 : arr[index - 1].thresholdMax + 1;

				if (
					currentDuration.value >= thresholdMin &&
					currentDuration.value <= currentWeek.thresholdMax
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
					duration: currentDuration.value,
					price: pricePerWeek,
					// TODO: Is there a way to capture the payPeriod for programs in the CMS?
					payPeriod: 'Per Week',
				},
			});
		} else {
			// TODO: This function might be clearer if it supports chaining, or a way to pass in multiple changes as arguments
			updatedPrices = updatePrices(updatedPrices, 'program', {
				priceDetails: {
					duration: currentDuration.value,
					price: pricePerWeek,
				},
			});
		}

		// Housing price is tied to duration, so we make sure to update it when the duraton changes;
		updatedPrices = updatePrices(updatedPrices, 'housing', {
			priceDetails: {
				duration: currentDuration.value,
			},
		});

		setPrices(updatedPrices);
	};

	const handleHousingChange = housingChange => {
		const currentHousing = housingChange.value;

		// TODO: This 'new price' logic is begging to be refactored & DRYed up
		if (prices.find(priceItem => priceItem.type === 'housing')) {
			prices = prices.map(priceItem => {
				if (priceItem.type === 'housing') {
					return {
						...priceItem,
						priceDetails: {
							duration: applicationData.duration.value,
							price: currentHousing.priceDetails.price,
						},
					};
				}
			});
		} else {
			prices.push({
				type: 'housing',
				label: `${currentHousing.name}`,
				priceDetails: {
					duration: applicationData.duration
						? applicationData.duration.value
						: 0,
					price: currentHousing.priceDetails.price,
					payPeriod: currentHousing.priceDetails.payPeriod,
				},
			});
		}

		setPrices(prices);
	};

	const handleAirportChange = airportChange => {
		// setIsValidForm(validateForm());

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
				<SelectInput
					name="center"
					label={'FLS Center'}
					value={{
						label: applicationData.center
							? `${applicationData.center.centerName} @ ${applicationData.center.name}`
							: 'Select a center.',
						value: applicationData.center,
					}}
					options={centerOptions}
					onChangeCallback={handleCenterChange}
					validations="isSelected"
					required
				/>
			</div>

			<div className="column is-full-tablet is-half-desktop">
				<SelectInput
					name="program"
					label={'Program'}
					value={{
						label: applicationData.program
							? applicationData.program.name
							: 'Select a program',
						value: applicationData.program,
					}}
					onChangeCallback={handleProgramChange}
					requirement={{
						value: applicationData.center,
						label: 'Select a center first',
					}}
					className={`fls__select-container ${
						!applicationData.center
							? 'fls__select-container--disabled'
							: ''
					}`}
					options={programOptions}
					isDisabled={!applicationData.center}
					validations="isSelected"
					required
				/>
			</div>

			<div className="column is-full-tablet is-half-desktop">
				<SelectInput
					name="duration"
					label={'Duration'}
					value={{
						label: applicationData.duration
							? applicationData.duration.label
							: 'Select a duration.',
						value: applicationData.duration,
					}}
					onChangeCallback={handleDurationChange}
					requirement={{
						value: applicationData.program,
						label: 'Select a program first',
					}}
					className={`fls__select-container ${
						!applicationData.program
							? 'fls__select-container--disabled'
							: ''
					}`}
					options={durationOptions}
					isDisabled={!applicationData.program}
					validations="isSelected"
					required
				/>
			</div>

			<div className="column is-full-tablet is-half-desktop">
				<SelectInput
					name="housing"
					label={'Housing'}
					value={{
						label: applicationData.housing
							? applicationData.housing.name
							: 'Select your housing.',
						value: applicationData.housing,
					}}
					onChangeCallback={handleHousingChange}
					requirement={{
						value: applicationData.center,
						label: 'Select a center first',
					}}
					className={`fls__select-container ${
						!applicationData.center
							? 'fls__select-container--disabled'
							: ''
					}`}
					options={housingOptions}
					isDisabled={!applicationData.center}
					validations="isSelected"
					required
				/>
			</div>

			<div className="column is-full-tablet is-half-desktop">
				<DateInput
					validations="isExisty"
					validationError="Please select a date."
					label={'Program Start Date'}
					selected={
						!_isNil(applicationData.programStartDate)
							? applicationData.programStartDate
							: applicationData.programStartDate
					}
					name={'programStartDate'}
					placeholderText={'Choose Your Start Date'}
					requirement={{
						value: applicationData.program,
						label: 'Select a program first',
					}}
					className={'input fls__base-input'}
					tooltip={
						<FontAwesomeIcon
							className="application__info-icon"
							icon={faInfoCircle}
							data-tip="In-person programs begin on Mondays."
						/>
					}
					filterDate={isMonday}
					readOnly={!applicationData.duration}
					minDate={new Date()}
					wrapperClassName={`fls__date-wrapper ${
						!applicationData.duration
							? 'fls__select-container--disabled'
							: ''
					}`}
					filterDate={isMonday}
					onChangeCallback={date => {
						handleBatchInputChange(
							{
								programStartDate: date,
								programEndDate: (() => {
									const clonedDate = new Date(date);

									// Each 'week' needs to end on a friday, hence this weird math
									return clonedDate.setDate(
										clonedDate.getDate() +
											(applicationData.duration.value *
												7 -
												3)
									);
								})(),
								// Default check in date to suinday before start of program
								housingCheckInDate: (() => {
									const clonedDate = new Date(date);

									return clonedDate.setDate(
										clonedDate.getDate() - 1
									);
								})(),
								// Default checkout date to saturday after end of program
								housingCheckOutDate: (() => {
									const clonedDate = new Date(date);

									return clonedDate.setDate(
										clonedDate.getDate() +
											(applicationData.duration.value *
												7 -
												2)
									);
								})(),
							},
							'application'
						);
					}}
					required
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

					{applicationData.housing ? null : (
						<span className="label label--application label--select-first fls--red">
							Select housing first
						</span>
					)}
				</div>

				<DatePicker
					selected={applicationData.housingCheckInDate}
					wrapperClassName={`fls__date-wrapper fls__date-wrapper--read-only ${
						!applicationData.housing
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
						!applicationData.housing
							? 'fls__select-container--disabled'
							: ''
					}`}
					placeholderText={'Housing Check Out Date'}
					readOnly={true}
				/>
			</div>

			<div className="column is-full">
				<RadioInput
					label={'Extra Nights of Housing Required?'}
					name={'extraNightsOfHousing'}
					selectedValue={applicationData.extraNightsOfHousing}
					required
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
							onChange={e => {
								// setIsValidForm(validateForm());

								handleDataChange(
									'airportPickUp',
									e.target.checked,
									'application'
								);
							}}
						/>
						<span className="fls__radio-label">
							Airport Pick Up
						</span>
					</label>

					<label className="checkbox">
						<Checkbox
							className="checkbox"
							defaultChecked={applicationData.airportDropOff}
							onChange={e => {
								// setIsValidForm(validateForm());

								handleDataChange(
									'airportDropOff',
									e.target.checked,
									'application'
								);
							}}
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
				<RadioInput
					label={'Do you require an I-20 Form?'}
					name={'requiresI20'}
					selectedValue={applicationData.requiresI20}
					tooltip={
						<FontAwesomeIcon
							className="application__info-icon"
							icon={faInfoCircle}
							data-tip="As of July 1, 2016, the redesigned Form I-20 is required for all F and M nonimmigrant visa applications, entry into the United States, travel and applications for nonimmigrant benefits. The previous version of the Form I-20 (with a barcode) is now invalid."
						/>
					}
					required
				/>
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
						{/* TODO: Should have a helpful tooltip */}
						<label className="label label--application">
							Would you like your I-20 Form and acceptance
							documents to be sent by Express Mail?
						</label>

						<RadioGroup
							selectedValue={applicationData.expressMail}
							onChange={value => {
								// setIsValidForm(validateForm());

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
								// setIsValidForm(validateForm());

								handleDataChange(
									'processSEVISAppFee',
									value,
									'application'
								);
							}}
							onChange={value => {
								// setIsValidForm(validateForm());

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
				<label className="label label--application">
					Are you a transfer student?
				</label>

				<RadioGroup
					selectedValue={applicationData.transferStudent}
					onChange={value => {
						// setIsValidForm(validateForm());

						handleDataChange(
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
					selectedValue={applicationData.flsHealthInsurance}
					onChange={value => {
						// setIsValidForm(validateForm());

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
							'flsHealthInsurance',
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
						// setIsValidForm(validateForm());

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
