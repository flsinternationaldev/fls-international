import React, { Fragment, useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { RadioGroup, Radio } from 'react-radio-group';
import { useStaticQuery, graphql } from 'gatsby';
import moment from 'moment';

// TODO: Audit whether all these are necessary
let currentCenter, currentProgram, currentHousing, currentDuration;

// TODO: Figure out how best to handle validation
export default function AdditionalInfo({
	nextStep,
	previousStep,
	handleInputChange,
	prices,
	setPrices,
	calculatePrice,
	applicationData,
}) {
	const data = useStaticQuery(graphql`
		{
			allMarkdownRemark {
				edges {
					node {
						fileAbsolutePath
						frontmatter {
							name
							supplements {
								airport_transfers {
									airport_name
									cost
								}
								auditing {
									_4_week_cost
									additional_week_cost
								}
								concurrent_enrollment {
									per_3_unit_class
								}
								hs_completion_course {
									_4_week_cost
									additional_week_cost
								}
								hs_immersion {
									per_week_cost
								}
							}
							housing_fees {
								additional_notes
								cost_per_week
								housing_name
								meals_per_week
								non_refundable_deposit
							}
							programs {
								name
								exceed_max_weeks
								max_weeks
								week_thresholds {
									threshold_max
									lessons_per_week
									hours_per_week
									price_per_week
								}
							}
						}
					}
				}
			}
		}
	`);

	// TODO: This is a straight copy/paste from Application Landing, and is in need of DRYing
	const formattedData = data.allMarkdownRemark.edges
		.filter(edge => edge.node.fileAbsolutePath.includes('/location/'))
		// TODO: There's maybe a cleverer way to do this, but this works for now
		.map(edge => {
			return { ...edge.node.frontmatter };
		});

	const [durationOptions, setDurationOptions] = useState([]);
	const [programOptions, setProgramOptions] = useState([]);
	const [housingOptions, setHousingOptions] = useState([]);

	const [durationLabel, setDurationLabel] = useState('Choose Your Duration');
	const [durationValue, setDurationValue] = useState(null);

	const [centerLabel, setCenterLabel] = useState('Choose Your Center');
	const [centerValue, setCenterValue] = useState(null);

	const [housingLabel, setHousingLabel] = useState('Choose Your Housing');
	const [housingValue, setHousingValue] = useState(null);

	const [programLabel, setProgramLabel] = useState('Choose Your Program');
	const [programValue, setProgramValue] = useState(null);

	const [programType, setProgramType] = useState('on-location');

	const centerOptions = formattedData.map(center => {
		return {
			// TODO: Probably want to include this string helper in a mixin
			value: center.name.toLowerCase().split(' ').join('-'),
			label: center.name,
		};
	});

	// TODO: DRY up these functions	const handleCenterChange = centerChange => {
	const handleCenterChange = centerChange => {
		setCenterLabel(centerChange.label);
		setCenterValue(centerChange.value);

		currentCenter = formattedData.find(
			center => center.name === centerChange.label
		);

		handleInputChange('flsCenter', centerChange.label, 'application');

		// Set program options to be the programs associated with the selected center
		setProgramOptions(
			currentCenter.programs.map(program => {
				return {
					value: program.name.toLowerCase().split(' ').join('-'),
					label: program.name,
				};
			})
		);

		setHousingOptions(
			currentCenter.housing_fees.map(housingFee => {
				return {
					label: housingFee.housing_name,
					value: housingFee.housing_name
						.toLowerCase()
						.split(' ')
						.join('-'),
				};
			})
		);
	};

	// TODO: These changes need to also recalculate off of each other, e.g. if you have a type of housing selected, then change the duration, the housing price needs to be recalculated ... might be time for the old redux
	const handleDurationChange = durationChange => {
		setDurationLabel(durationChange.label);
		setDurationValue(durationChange.value);

		handleInputChange('duration', durationChange.label, 'application');

		let pricePerWeek = currentProgram.week_thresholds.reduce(
			(pricePerWeek, currentWeek, index, arr) => {
				// If there are no previous thresholds, previous max defaults to 0. Otherwise, the minimum threshold value is last week's max threshold, plus one.
				let thresholdMin =
					index === 0 ? 1 : arr[index - 1].threshold_max + 1;

				if (
					durationChange.value >= thresholdMin &&
					durationChange.value <= currentWeek.threshold_max
				) {
					return currentWeek.price_per_week;
				} else {
					return pricePerWeek;
				}
			},
			0
		);

		currentDuration = durationChange.value;

		let updatedPrices = prices;

		if (prices.find(priceItem => priceItem.type === 'duration')) {
			updatedPrices = prices.map(priceItem => {
				if (priceItem.type === 'duration') {
					return {
						type: priceItem.type,
						cost: durationChange.value * pricePerWeek,
					};
				} else {
					return priceItem;
				}
			});
		} else {
			updatedPrices.push({
				type: 'duration',
				cost: durationChange.value * pricePerWeek,
			});
		}

		setPrices(updatedPrices);
	};

	const handleHousingChange = housingChange => {
		setHousingLabel(housingChange.label);
		setHousingValue(housingChange.value);

		handleInputChange('housingType', housingChange.label, 'application');

		const housingCostPerWeek = currentCenter.housing_fees.find(
			housingFee =>
				housingChange.value ===
				housingFee.housing_name.toLowerCase().split(' ').join('-')
		).cost_per_week;

		let updatedPrices = prices;

		if (prices.find(priceItem => priceItem.type === 'housing')) {
			updatedPrices = prices.map(priceItem => {
				if (priceItem.type === 'housing') {
					return {
						type: priceItem.type,
						cost: currentDuration * housingCostPerWeek,
					};
				} else {
					return priceItem;
				}
			});
		} else {
			updatedPrices.push({
				type: 'housing',
				cost: currentDuration * housingCostPerWeek,
			});
		}

		setPrices(updatedPrices);
	};

	const handleProgramChange = programChange => {
		setProgramLabel(programChange.label);
		setProgramValue(programChange.value);

		handleInputChange('program', programChange.label, 'application');

		currentProgram = currentCenter.programs.find(
			program => program.name === programChange.label
		);

		let durationOptions = [];

		for (let i = 0; i <= currentProgram.max_weeks; i++) {
			const weekNum = i + 1;

			// TODO: Likely need to make a special note during submission if they select more than the max weeks
			if (
				currentProgram.exceed_max_weeks &&
				i == currentProgram.max_weeks
			) {
				durationOptions.push({
					label: `${i}+ weeks`,
					value: `${weekNum}+`,
				});
			} else if (i < currentProgram.max_weeks) {
				durationOptions.push({
					label: weekNum === 1 ? `${i + 1} week` : `${i + 1} weeks`,
					value: weekNum,
				});
			}
		}

		setDurationOptions(durationOptions);
	};

	const isMonday = date => date.getDay() === 1;

	const airportOptions = [
		{ value: 'Airport Option 1', label: 'Airport Option 1' },
		{ value: 'Airport Option 2', label: 'Airport Option 2' },
		{ value: 'Airport Option 3', label: 'Airport Option 3' },
	];

	return (
		<Fragment>
			<div className="columns is-multiline">
				<div className="column is-full">
					<div className="application__header-container">
						<h3 className="fls__post-title">Additional Info</h3>
						<h3 className="application__total-price">
							Total Price: ${calculatePrice(prices)}
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
					<label className="label">Program *</label>
					<Select
						className="fls__select-container"
						classNamePrefix={'fls'}
						value={{
							label: applicationData.program,
							value: applicationData.program,
						}}
						onChange={handleProgramChange}
						options={programOptions}
					/>
				</div>
				<div className="column is-half">
					<label className="label">Duration *</label>
					<Select
						className="fls__select-container"
						classNamePrefix={'fls'}
						value={{
							label: applicationData.duration,
							value: applicationData.duration,
						}}
						onChange={handleDurationChange}
						options={durationOptions}
					/>
				</div>

				<div className="column is-half">
					<label className="label">Program Start Date *</label>
					<DatePicker
						selected={applicationData.startDate}
						onChange={date =>
							handleInputChange('startDate', date, 'application')
						}
						minDate={new Date()}
						value={applicationData.startDate}
						wrapperClassName={'fls__date-wrapper'}
						className={'input fls__base-input'}
						placeholderText={'Choose Your Start Date'}
						filterDate={isMonday}
					/>
				</div>
				<div className="column is-half">
					<label className="label">Program End Date *</label>
					<DatePicker
						// TODO: Should be disabled, calculates based off start date
						selected={applicationData.endDate}
						value={applicationData.endDate}
						wrapperClassName={'fls__date-wrapper'}
						className={'input fls__base-input'}
						placeholderText={'Program End Date'}
					/>
				</div>
				<div className="column is-half">
					<label className="label">Housing Type *</label>
					<Select
						className="fls__select-container"
						classNamePrefix={'fls'}
						value={{
							label: applicationData.housingType,
							value: applicationData.housingType,
						}}
						onChange={handleHousingChange}
						options={housingOptions}
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
					<label className="label">Housing Check Out Date *</label>
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
				<div className="column is-half">
					<label className="label">Airport *</label>

					<Select
						className="fls__select-container"
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
					<label className="label">Are you a transfer student?</label>

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
						Would you like to purchase health insurance through FLS?
					</label>

					<RadioGroup
						selectedValue={applicationData.buyingHealthInsurance}
						onChange={value => {
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
						Would you like your I-20 Form and acceptance documents
						to be sent by Express Mail?
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
						Would you like FLS to process the $350 SEVIS Application
						Fee for you?
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
		</Fragment>
	);
}
