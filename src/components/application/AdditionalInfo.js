import React, { Fragment } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { RadioGroup, Radio } from 'react-radio-group';

// TODO: Figure out how best to handle validation
export default function AdditionalInfo({ nextStep, previousStep }) {
	const centerOptions = [
			{ value: 'Center Option 1', label: 'Center Option 1' },
			{ value: 'Center Option 2', label: 'Center Option 2' },
			{ value: 'Center Option 3', label: 'Center Option 3' },
		],
		durationOptions = [
			{ value: 'Duration Option 1', label: 'Duration Option 1' },
			{ value: 'Duration Option 2', label: 'Duration Option 2' },
			{ value: 'Duration Option 3', label: 'Duration Option 3' },
		],
		housingOptions = [
			{ value: 'Housing Option 1', label: 'Housing Option 1' },
			{ value: 'Housing Option 2', label: 'Housing Option 2' },
			{ value: 'Housing Option 3', label: 'Housing Option 3' },
		],
		programOptions = [
			{ value: 'Program Option 1', label: 'Program Option 1' },
			{ value: 'Program Option 2', label: 'Program Option 2' },
			{ value: 'Program Option 3', label: 'Program Option 3' },
		],
		airportOptions = [
			{ value: 'Airport Option 1', label: 'Airport Option 1' },
			{ value: 'Airport Option 2', label: 'Airport Option 2' },
			{ value: 'Airport Option 3', label: 'Airport Option 3' },
		];

	return (
		<Fragment>
			<div className="columns is-multiline">
				<div className="column is-full">
					<h3 className="fls__post-title">Additional Info</h3>
				</div>

				<div className="column is-half">
					<label className="label">FLS Center*</label>

					<Select
						className="fls__select-container"
						classNamePrefix={'fls'}
						value={{ label: 'true' }}
						onChange={() => {}}
						options={centerOptions}
					/>
				</div>

				<div className="column is-half">
					<label className="label">Duration *</label>
					<Select
						className="fls__select-container"
						classNamePrefix={'fls'}
						value={{ label: 'lol' }}
						onChange={() => {}}
						options={durationOptions}
					/>
				</div>

				<div className="column is-half">
					<label className="label">Program Start Date *</label>
					<DatePicker
						// selected = {}
						onChange={() => {}}
						wrapperClassName={'fls__date-wrapper'}
						className={'input fls__base-input'}
						placeholderText={'Choose Your Start Date'}
					/>
				</div>

				<div className="column is-half">
					<label className="label">Program End Date *</label>
					<DatePicker
						// selected = {}
						onChange={() => {}}
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
						value={{ label: 'wtf' }}
						onChange={() => {}}
						options={housingOptions}
					/>
				</div>

				<div className="column is-half">
					<label className="label">Program *</label>
					<Select
						className="fls__select-container"
						classNamePrefix={'fls'}
						value={{ label: 'wut' }}
						onChange={() => {}}
						options={programOptions}
					/>
				</div>

				<div className="column is-full">
					<label className="label">
						Extra Nights of Housing Required? *
					</label>
					<RadioGroup
						name="extra-housing"
						// selectedValue={}
						onChange={() => {}}
					>
						<Radio value="needs-extra-housing" />
						Yes
						<Radio value="no-extra-housing" />
						No
					</RadioGroup>
				</div>

				<div className="column is-half">
					<label className="label">Housing Check In Date *</label>
					<DatePicker
						// selected = {}
						onChange={() => {}}
						wrapperClassName={'fls__date-wrapper'}
						className={'input fls__base-input'}
						placeholderText={'Housing Check-in Date'}
					/>
				</div>

				<div className="column is-half">
					<label className="label">Housing Check Out Date *</label>
					<DatePicker
						// selected = {}
						onChange={() => {}}
						wrapperClassName={'fls__date-wrapper'}
						className={'input fls__base-input'}
						placeholderText={'Housing Check Out Date'}
					/>
				</div>

				<div className="column is-half">
					<label className="label">Airport *</label>

					<Select
						className="fls__select-container"
						classNamePrefix={'fls'}
						value={{ label: 'yeet' }}
						onChange={() => {}}
						options={airportOptions}
					/>
				</div>

				<div className="column is-half">
					<label className="checkbox">
						<input type="checkbox" />
						Airport Pick Up - $150
					</label>

					<label className="checkbox">
						<input type="checkbox" />
						Airport Drop Off - $150
					</label>
				</div>

				<div className="column is-full">
					{/* TODO: Should have a helpful tooltip */}
					<label className="label">
						Do you require an I-20 Form?
					</label>

					<RadioGroup
						name="program-type"
						// selectedvalue={programtype}
						// onchange={setprogramtype}
					>
						<Radio value="on-location" />
						Yes
						<Radio value="online" />
						No
					</RadioGroup>
				</div>

				<div className="column is-full">
					{/* TODO: Should have a helpful tooltip */}
					<label className="label">Are you a transfer student?</label>

					<RadioGroup
						name="program-type"
						// selectedvalue={programtype}
						// onchange={setprogramtype}
					>
						<Radio value="on-location" />
						Yes
						<Radio value="online" />
						No
					</RadioGroup>
				</div>

				<div className="column is-full">
					{/* TODO: Should have a helpful tooltip */}
					<label className="label">
						Would you like to purchase health insurance through FLS?
					</label>

					<RadioGroup
						name="program-type"
						// selectedvalue={programtype}
						// onchange={setprogramtype}
					>
						<Radio value="on-location" />
						Yes
						<Radio value="online" />
						No
					</RadioGroup>
				</div>

				<div className="column is-full">
					{/* TODO: Should have a helpful tooltip */}
					<label className="label">
						Would you like your I-20 Form and acceptance documents
						to be sent by Express Mail?
					</label>

					<RadioGroup
						name="program-type"
						// selectedvalue={programtype}
						// onchange={setprogramtype}
					>
						<Radio value="on-location" />
						Yes
						<Radio value="online" />
						No
					</RadioGroup>
				</div>

				<div className="column is-full">
					{/* TODO: Should have a helpful tooltip */}
					<label className="label">
						Would you like FLS to process the $350 SEVIS Application
						Fee for you?
					</label>

					<RadioGroup
						name="program-type"
						// selectedvalue={programtype}
						// onchange={setprogramtype}
					>
						<Radio value="on-location" />
						Yes
						<Radio value="online" />
						No
					</RadioGroup>
				</div>

				<div className="column is-full">
					{/* TODO: Should have a helpful tooltip */}
					<label className="label">
						Would you like FLS to provide Unaccompanied Minor
						Service?
					</label>

					<RadioGroup
						name="program-type"
						// selectedvalue={programtype}
						// onchange={setprogramtype}
					>
						<Radio value="on-location" />
						Yes
						<Radio value="online" />
						No
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
					<button onClick={nextStep} className="fls__button">
						Save & Continue
					</button>
				</div>
			</div>
		</Fragment>
	);
}
