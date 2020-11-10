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
			onlineProgramTypes: allMarkdownRemark(
				limit: 1000
				filter: {
					fileAbsolutePath: { regex: "/data/online-program-types/" }
				}
			) {
				edges {
					node {
						frontmatter {
							name
						}
					}
				}
			}
		}
	`);

	programsData = formatEdges(programsData);
	const onlineProgramTypesData = formatEdges(data.onlineProgramTypes);

	const [programOptions, setProgramOptions] = useState([]);
	const [durationOptions, setDurationOptions] = useState([]);

	const onlineProgramTypesOptions = onlineProgramTypesData.map(program => {
		return {
			value: program.name,
			label: program.name,
		};
	});

	const handleProgramChange = programChange => {
		const currentProgram = programsData.find(
			program => program.name === programChange.label
		);

		// TODO: State changes are async, so we keep using 'currentProgram' inside this function scope
		// With some refactoring, we could probably change 'handleDataChange' to take a callback that can be passed to the state change
		handleSetApplicationData('program', currentProgram);

		let durationOptions = [];

		for (let i = 0; i <= currentProgram.priceDetails.range.maxWeeks; i++) {
			const weekNum = i + 1;

			// TODO: Likely need to make a special note during submission if they select more than the max weeks
			if (
				currentProgram.priceDetails.range.exceedMaxWeeks &&
				i == currentProgram.priceDetails.range.maxWeeks
			) {
				durationOptions.push({
					label: `${i}+ weeks`,
					value: `${weekNum}+`,
				});
			} else if (i < currentProgram.priceDetails.range.maxWeeks) {
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
				},
			});
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

		// Housing price is tied to duration, so we make sure to update it when the duraton changes;
		updatedPrices = updatePrices(updatedPrices, 'housing', {
			priceDetails: {
				duration: durationChange.value,
			},
		});

		setPrices(updatedPrices);
	};

	const handleOnlineProgramTypesChange = onlineProgramTypesChange => {
		// Set state operatons are async, so we'll use this non-async version for the below operations
		const currentOnlineProgramType = onlineProgramTypesData.find(
			onlineProgramType =>
				onlineProgramType.name === onlineProgramTypesChange.value
		);

		handleSetApplicationData(
			'onlineProgramType',
			currentOnlineProgramType.name
		);

		/*
        If the duration or program is already selected, and the user picks a new online program type, this can cause complications with already selected programs
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

			handleSetApplicationData({
				...applicationData,
				...blankedApplicationData,
			});

			setPrices(removePrices(prices, ['program', 'housing']));
		}

		// Set program options to be the programs associated with the selected online program type
		setProgramOptions(
			programsData
				.filter(program => {
					return program.onlineProgramType.includes(
						onlineProgramTypesChange.value
					);
				})
				.map(program => {
					return {
						value: program.name.toLowerCase().split(' ').join('-'),
						label: program.name,
					};
				})
		);
	};

	const isMonday = date => date.getDay() === 1;

	return (
		<Fragment>
			<div className="column is-full">
				<Select
					className="fls__select-container"
					classNamePrefix={'fls'}
					value={{
						label: applicationData.onlineProgramType
							? applicationData.onlineProgramType
							: 'Select an online program type.',
						value: applicationData.onlineProgramType
							? applicationData.onlineProgramType
							: null,
					}}
					onChange={onlineProgramTypesOption => {
						handleOnlineProgramTypesChange(
							onlineProgramTypesOption
						);
					}}
					options={onlineProgramTypesOptions}
				/>
			</div>

			<div className="column is-full">
				<Select
					className={`fls__select-container ${
						!applicationData.onlineProgramType
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
					isDisabled={!applicationData.onlineProgramType}
				/>
			</div>

			{/* TODO: All fields besides dates and center should be disabled until you choose a center */}
			<div className="column is-full">
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
					selected={
						applicationData.programStartDate
							? new Date(applicationData.programStartDate)
							: applicationData.programStartDate
					}
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
