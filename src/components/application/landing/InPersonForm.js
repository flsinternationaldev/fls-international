import React, { useState, Fragment } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { formatEdges } from 'src/utils/helpers';

import sectionStyles from 'src/components/section/Section.module.scss';
import 'react-datepicker/dist/react-datepicker.css';

import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { calculatePrice, removePrices, updatePrices } from 'src/utils/helpers';

export default function InPersonForm({
	applicationData,
	setApplicationData,
	handleSetApplicationData,
	programsData,
	setPrices,
	prices,
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
		}
	`);

	programsData = formatEdges(programsData);
	const centersData = formatEdges(data.locations);
	const housingData = formatEdges(data.housing);

	const [programOptions, setProgramOptions] = useState([]);
	const [housingOptions, setHousingOptions] = useState([]);
	const [durationOptions, setDurationOptions] = useState([]);

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

	const handleCenterChange = centerChange => {
		// Set state operatons are async, so we'll use this non-async version for the below operations
		const currentCenter = centersData.find(
			center => center.centerName === centerChange.value
		);

		handleSetApplicationData('center', currentCenter, 'application');

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

			setApplicationData({
				...applicationData,
				...blankedApplicationData,
			});

			setPrices(removePrices(prices, ['program', 'housing']));
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
	};

	const handleProgramChange = programChange => {
		const currentProgram = programsData.find(
			program => program.name === programChange.label
		);

		handleSetApplicationData('program', currentProgram);

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

		handleSetApplicationData('program', currentProgram);

		setDurationOptions(durationOptions);
	};

	const handleDurationChange = durationChange => {
		handleSetApplicationData('duration', {
			label: durationChange.label,
			value: durationChange.value,
		});

		// If programStartDate exists, we can be confident there's also a program end date & housing check in/check out dates
		if (applicationData.programStartDate) {
			setApplicationData({
				...applicationData,
				...{
					programEndDate: (() => {
						const clonedDate = new Date(
							applicationData.programStartDate
						);

						// Each 'week' needs to end on a friday, hence this weird math
						return clonedDate.setDate(
							clonedDate.getDate() +
								(durationChange.value * 7 - 3)
						);
					})(),
					housingCheckOutDate: (() => {
						const clonedDate = new Date(
							applicationData.housingCheckInDate
						);

						return clonedDate.setDate(
							clonedDate.getDate() +
								(durationChange.value * 7 - 1)
						);
					})(),
				},
			});
		}

		let pricePerWeek = applicationData.program.durationOptions.weekThresholds.reduce(
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

		// Housing price is tied to duration, so we make sure to update it when the duraton changes;
		updatedPrices = updatePrices(updatedPrices, 'housing', {
			priceDetails: {
				duration: durationChange.value,
			},
		});

		setPrices(updatedPrices);
	};

	const handleHousingChange = housingChange => {
		const currentHousing = housingData.find(
			housing => housing.name === housingChange.label
		);

		handleSetApplicationData('housing', currentHousing);

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

	const isMonday = date => date.getDay() === 1;

	return (
		<Fragment>
			<div className="column is-full">
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

			<div className="column is-full">
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

			<div className="column is-full">
				<Select
					className={`fls__select-container ${
						!applicationData.center
							? 'fls__select-container--disabled'
							: ''
					}`}
					classNamePrefix={'fls'}
					value={{
						label: applicationData.housing
							? applicationData.housing.name
							: 'Select your housing type.',
						value: applicationData.housing
							? applicationData.housing.name
							: null,
					}}
					onChange={handleHousingChange}
					options={housingOptions}
					isDisabled={!applicationData.center}
				/>
			</div>

			{/* TODO: All fields besides dates and center should be disabled until you choose a center */}
			<div className="column is-full">
				{/* TODO: These styles need finessing */}
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
					isDisabled={!applicationData.program}
				/>
			</div>

			<div className="column is-full">
				<DatePicker
					selected={applicationData.programStartDate}
					onChange={date => {
						setApplicationData({
							...applicationData,
							...{
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
						});
					}}
					minDate={new Date()}
					wrapperClassName={`fls__date-wrapper ${
						!applicationData.duration
							? 'fls__select-container--disabled'
							: ''
					}`}
					className={'input fls__base-input'}
					placeholderText={'Choose Your Start Date'}
					filterDate={isMonday}
					readOnly={!applicationData.duration}
				/>
			</div>

			<div className="column is-half">
				<p className={sectionStyles.startYourJourney__price}>
					$ {calculatePrice(prices)} USD
				</p>
			</div>
		</Fragment>
	);
}
