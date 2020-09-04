import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { RadioGroup, Radio } from 'react-radio-group';

import sectionStyles from 'src/components/section/Section.module.scss';
import applicationStyles from './ApplicationLanding.module.scss';

import 'react-datepicker/dist/react-datepicker.css';

// TODO: Audit whether all these are necessary
let currentCenter, currentProgram, currentHousing, currentDuration;

// TODO: Figure out how best to handle validation
export default function Application() {
	const data = useStaticQuery(graphql`
		{
			allMarkdownRemark(
				filter: { fileAbsolutePath: { regex: "/location//" } }
			) {
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

	// TODO: Probably want to make some kind of mix in to pass this function around
	const formattedData = data.allMarkdownRemark.edges.map(edge => {
		return { ...edge.node.frontmatter };
	});

	const [startDate, setStartDate] = useState(null);

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

	const [prices, setPrices] = useState([]);

	const calculatePrice = prices => {
		if (prices.length) {
			return prices.reduce((total, price) => {
				total += price.cost;
				return total;
			}, 0);
		} else {
			return 0;
		}
	};

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

	return (
		<div className="columns is-multiline">
			<div className="column is-full control">
				{/* TODO: Ensure you can click the label to select the radio */}
				<RadioGroup
					name="program-type"
					selectedValue={programType}
					onChange={setProgramType}
				>
					<label htmlFor="" className="radio">
						<Radio
							value="on-location"
							className="fls-input__radio"
						/>
						On Location
					</label>
					<label htmlFor="" className="radio">
						<Radio value="online" className="fls-input__radio" />
						Online
					</label>
				</RadioGroup>
			</div>
			<div className="column is-full">
				<DatePicker
					selected={startDate}
					onChange={setStartDate}
					minDate={new Date()}
					wrapperClassName={applicationStyles.fls__dateWrapper}
					className={'input fls__base-input'}
					// TODO: This should auto format when typing the date
					placeholderText={'Choose Your Start Date (MM/DD/YY)'}
					filterDate={isMonday}
				/>
			</div>

			<div className="column is-full">
				<Select
					className="fls__select-container"
					classNamePrefix={'fls'}
					value={{ label: centerLabel }}
					onChange={handleCenterChange}
					options={centerOptions}
				/>
			</div>

			<div className="column is-full">
				<Select
					className="fls__select-container"
					classNamePrefix={'fls'}
					value={{ label: programLabel }}
					onChange={handleProgramChange}
					options={programOptions}
				/>
			</div>

			<div className="column is-full">
				<Select
					className="fls__select-container"
					classNamePrefix={'fls'}
					value={{ label: housingLabel }}
					onChange={handleHousingChange}
					options={housingOptions}
				/>
			</div>

			{/* TODO: All fields besides dates and center should be disabled until you choose a center */}
			<div className="column is-full">
				{/* TODO: These styles need finessing */}
				<Select
					className="fls__select-container"
					classNamePrefix={'fls'}
					value={{ label: durationLabel }}
					onChange={handleDurationChange}
					options={durationOptions}
				/>
			</div>

			<div className="column is-half">
				<p className={sectionStyles.startYourJourney__price}>
					$ {calculatePrice(prices)} USD
				</p>
			</div>

			<div className="column is-half">
				<button className="fls__button">Apply Now</button>
			</div>
		</div>
	);
}
