import React, { useState } from 'react';

import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { RadioGroup, Radio } from 'react-radio-group';

import sectionStyles from '../section/Section.module.scss';
import applicationStyles from './ApplicationLanding.module.scss';

import 'react-datepicker/dist/react-datepicker.css';

// TODO: Figure out how best to handle validation
export default function Application(props) {
	// const { frontmatter } = data.markdownRemark;

	console.log('props?', props);
	const { isHome } = props;

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
	const durationOptions = [
			{ value: '1', label: '1 week' },
			{ value: '2', label: '2 weeks' },
			{ value: '3', label: '3 weeks' },
		],
		centerOptions = [
			{ value: 'Citrus College', label: 'Citrus College' },
			{ value: 'Saddleback College', label: 'Saddleback College ' },
			{ value: 'Chestnut Hill College', label: 'Chestnut Hill College' },
		],
		housingOptions = [
			{ value: 'Housing Option 1', label: 'Housing Option 1' },
			{ value: 'Housing Option 2', label: 'Housing Option 2' },
			{ value: 'Housing Option 3', label: 'Housing Option 3' },
		],
		programOptions = [
			{ value: 'Program 1', label: 'Program 1' },
			{ value: 'Program 2', label: 'Program 2' },
			{ value: 'Program 3', label: 'Program 3' },
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

	if (isHome) {
		if (programType === 'on-location') {
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
							wrapperClassName={
								applicationStyles.fls__dateWrapper
							}
							className={'input fls__base-input'}
							placeholderText={'Choose Your Start Date'}
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
		} else if (programType === 'online') {
			return <div></div>;
		} else {
			return <div>{programType}</div>;
		}
	}
}

export const applicationQuery = graphql`
	query {
		markdownRemark {
			frontmatter {
				on_location_program_information {
					general_fees {
						application_fee
						books_and_materials
						express_mail_fee
						extra_night_homestay
						extra_night_resources
						health_insurance_fee
						housing_placement_fee
						tutoring
					}
					locations {
						location_name
						programs {
							program_name
							program_details {
								duration
								hours
								lessons
								price
							}
						}
					}
				}
			}
		}
	}
`;
