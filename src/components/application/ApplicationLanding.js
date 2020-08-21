import React, { useState } from 'react';
import { graphql } from 'gatsby';

import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { RadioGroup, Radio } from 'react-radio-group';

import sectionStyles from 'src/components/section/Section.module.scss';
import applicationStyles from './ApplicationLanding.module.scss';

import 'react-datepicker/dist/react-datepicker.css';

// TODO: Figure out how best to handle validation
export default function Application({
	data,
	isHome,
	on_location_program_information,
}) {
	console.log('come home to me!', data);

	const [startDate, setStartDate] = useState(null);

	const [durationLabel, setDurationLabel] = useState('Choose Your Duration');
	const [durationValue, setDurationValue] = useState(null);

	const [centerLabel, setCenterLabel] = useState(
		'Choose Your Center Location'
	);
	const [centerValue, setCenterValue] = useState(null);

	const [housingLabel, setHousingLabel] = useState('Choose Your Housing');
	const [housingValue, setHousingValue] = useState(null);

	const [programLabel, setProgramLabel] = useState('Choose Your Program');
	const [programValue, setProgramValue] = useState(null);

	const [programType, setProgramType] = useState('on-location');

	const [price, setPrice] = useState('--');

	// TODO: These options need to come from the CMS
	// const durationOptions = on_location_program_information.locations[0].programs[0].program_details[0].map(
	// 		program => {
	// 			return {
	// 				label: program.program_details.duration,
	// 				value: '',
	// 			};
	// 		}
	// 	),
	const durationOptions = [],
		// TODO: Finesse the value
		centerOptions = [
			{ value: 'Housing Option 1', label: 'Housing Option 1' },
			{ value: 'Housing Option 2', label: 'Housing Option 2' },
			{ value: 'Housing Option 3', label: 'Housing Option 3' },
		],
		housingOptions = [
			{ value: 'Housing Option 1', label: 'Housing Option 1' },
			{ value: 'Housing Option 2', label: 'Housing Option 2' },
			{ value: 'Housing Option 3', label: 'Housing Option 3' },
		],
		// TODO: These options need to change based off the selected location
		programOptions = [
			{ value: 'Housing Option 1', label: 'Housing Option 1' },
			{ value: 'Housing Option 2', label: 'Housing Option 2' },
			{ value: 'Housing Option 3', label: 'Housing Option 3' },
		];

	// TODO: DRY up these functions
	const handleDurationChange = durationChange => {
		setDurationLabel(durationChange.label);
		setDurationValue(durationChange.value);
	};

	const handleCenterChange = centerChange => {
		setCenterLabel(centerChange.label);
		setCenterValue(centerChange.value);
	};

	const handleHousingChange = housingChange => {
		setHousingLabel(housingChange.label);
		setHousingValue(housingChange.value);
	};

	const handleProgramChange = programChange => {
		setProgramLabel(programChange.label);
		setProgramValue(programChange.value);
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

			{/* TODO: 'Duration' should come from the CMS */}
			<div className="column is-half">
				{/* TODO: These styles need finessing */}
				<Select
					className="fls__select-container"
					classNamePrefix={'fls'}
					value={{ label: durationLabel }}
					onChange={handleDurationChange.bind(this)}
					options={durationOptions}
				/>
			</div>

			<div className="column is-half">
				<Select
					className="fls__select-container"
					classNamePrefix={'fls'}
					value={{ label: centerLabel }}
					onChange={handleCenterChange.bind(this)}
					options={centerOptions}
				/>
			</div>

			<div className="column is-full">
				<Select
					className="fls__select-container"
					classNamePrefix={'fls'}
					value={{ label: housingLabel }}
					onChange={handleHousingChange.bind(this)}
					options={housingOptions}
				/>
			</div>

			<div className="column is-full">
				<Select
					className="fls__select-container"
					classNamePrefix={'fls'}
					value={{ label: programLabel }}
					onChange={handleProgramChange.bind(this)}
					options={programOptions}
				/>
			</div>

			<div className="column is-half">
				<p className={sectionStyles.startYourJourney__price}>
					$ {price}USD
				</p>
			</div>

			<div className="column is-half">
				<button className="fls__button">Apply Now</button>
			</div>
		</div>
	);
}

export const pageQuery = graphql`
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
							program {
								modalities {
									hours_per_week
									lessons_per_week
									price_per_week
									weeks
								}
								name
							}
						}
					}
				}
			}
		}
	}
`;
