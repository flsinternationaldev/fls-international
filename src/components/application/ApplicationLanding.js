import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { RadioGroup, Radio } from 'react-radio-group';

import sectionStyles from 'src/components/section/Section.module.scss';
import applicationStyles from './ApplicationLanding.module.scss';

import 'react-datepicker/dist/react-datepicker.css';

let currentCenter, currentProgram, currentDuration;

// TODO: Figure out how best to handle validation
export default function Application({
	isHome,
	on_location_program_information,
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

	// TODO: Probably want to make some kind of mix in to pass this function around
	const formattedData = data.allMarkdownRemark.edges
		.filter(edge => edge.node.fileAbsolutePath.includes('/location/'))
		// TODO: There's maybe a cleverer way to do this, but this works for now
		.map(edge => {
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

	const [prices, setPrices] = useState({
		center: 'citrus-college',
		program: 'vacation-english',
		duration: '1-3',
		cost: 395,
	});

	const calculatePrice = prices => {
		if (prices.length) {
			return prices.reduce((total, price) => {
				console.log('PRICE!', price);
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
					// console.log('durationChange', durationChange.value);
					// console.log('thresholdMin', thresholdMin);
					// console.log('current max', currentWeek.threshold_max);
					return currentWeek.price_per_week;
				} else {
					return pricePerWeek;
				}
			},
			0
		);

		const priceObject = {
			center: centerValue,
			program: programValue,
			duration: durationChange.value,
			cost: durationChange.value * pricePerWeek,
		};

		setPrices([priceObject]);
	};

	const handleHousingChange = housingChange => {
		setHousingLabel(housingChange.label);
		setHousingValue(housingChange.value);
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
				<RadioGroup
					name="program-type"
					selectedValue={programType}
					onChange={setProgramType}
				>
					<Radio value="on-location" />
					On Location
					<Radio value="online" />
					Online
				</RadioGroup>
			</div>
			<div className="column is-full">
				<DatePicker
					selected={startDate}
					onChange={setStartDate}
					wrapperClassName={applicationStyles.fls__dateWrapper}
					className={'input fls__base-input'}
					placeholderText={'Choose Your Start Date'}
					filterDate={isMonday}
				/>
			</div>

			<div className="column is-half">
				<Select
					className="fls__select-container"
					classNamePrefix={'fls'}
					value={{ label: centerLabel }}
					onChange={handleCenterChange}
					options={centerOptions}
				/>
			</div>

			<div className="column is-half">
				<Select
					className="fls__select-container"
					classNamePrefix={'fls'}
					value={{ label: programLabel }}
					onChange={handleProgramChange}
					options={programOptions}
				/>
			</div>

			<div className="column is-half">
				<Select
					className="fls__select-container"
					classNamePrefix={'fls'}
					value={{ label: housingLabel }}
					onChange={handleHousingChange}
					options={housingOptions}
				/>
			</div>

			{/* TODO: All fields besides dates and center should be disabled until you choose a center */}
			<div className="column is-half">
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
