import React, { Fragment } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { RadioGroup, Radio } from 'react-radio-group';

// TODO: Figure out how best to handle validation
export default function AdditionalInfo({
	nextStep,
	previousStep,
	handleInputChange,
	userData,
}) {
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
						value={{
							label: userData.flsCenter,
							value: userData.flsCenter,
						}}
						onChange={centerOption => {
							handleInputChange(
								'flsCenter',
								centerOption.value,
								'user'
							);
						}}
						options={centerOptions}
					/>
				</div>

				<div className="column is-half">
					<label className="label">Duration *</label>
					<Select
						className="fls__select-container"
						classNamePrefix={'fls'}
						value={{
							label: userData.duration,
							value: userData.duration,
						}}
						onChange={durationOption => {
							handleInputChange(
								'duration',
								durationOption.value,
								'user'
							);
						}}
						options={durationOptions}
					/>
				</div>

				<div className="column is-half">
					<label className="label">Program Start Date *</label>
					<DatePicker
						selected={userData.startDate}
						onChange={date =>
							handleInputChange('startDate', date, 'user')
						}
						value={userData.startDate}
						wrapperClassName={'fls__date-wrapper'}
						className={'input fls__base-input'}
						placeholderText={'Choose Your Start Date'}
					/>
				</div>

				<div className="column is-half">
					<label className="label">Program End Date *</label>
					<DatePicker
						// TODO: Should be disabled, calculates based off start date
						selected={userData.endDate}
						value={userData.endDate}
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
							label: userData.housingType,
							value: userData.housingType,
						}}
						onChange={housingTypeOption => {
							handleInputChange(
								'housingType',
								housingTypeOption.value,
								'user'
							);
						}}
						options={housingOptions}
					/>
				</div>

				<div className="column is-half">
					<label className="label">Program *</label>
					<Select
						className="fls__select-container"
						classNamePrefix={'fls'}
						value={{
							label: userData.program,
							value: userData.program,
						}}
						onChange={programOption => {
							handleInputChange(
								'program',
								programOption.value,
								'user'
							);
						}}
						options={programOptions}
					/>
				</div>

				<div className="column is-full">
					<label className="label">
						Extra Nights of Housing Required? *
					</label>
					<RadioGroup
						name="extra-housing"
						selectedValue={userData.extraNights}
						onChange={value => {
							handleInputChange('extraNights', value, 'user');
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
						selected={userData.checkInDate}
						onChange={date =>
							handleInputChange('checkInDate', date, 'user')
						}
						value={userData.checkInDate}
						wrapperClassName={'fls__date-wrapper'}
						className={'input fls__base-input'}
						placeholderText={'Housing Check-in Date'}
					/>
				</div>

				<div className="column is-half">
					<label className="label">Housing Check Out Date *</label>
					<DatePicker
						selected={userData.checkOutDate}
						onChange={date =>
							handleInputChange('checkOutDate', date, 'user')
						}
						value={userData.checkOutDate}
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
							label: userData.airport,
							value: userData.airport,
						}}
						onChange={airportOption => {
							handleInputChange(
								'airport',
								airportOption.value,
								'user'
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
						selectedValue={userData.requiresI20}
						onChange={value => {
							handleInputChange('requiresI20', value, 'user');
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
						selectedValue={userData.transferStudent}
						onChange={value => {
							handleInputChange('transferStudent', value, 'user');
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
						selectedValue={userData.buyingHealthInsurance}
						onChange={value => {
							handleInputChange(
								'buyingHealthInsurance',
								value,
								'user'
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
						selectedValue={userData.expressMail}
						onChange={value => {
							handleInputChange('expressMail', value, 'user');
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
						selectedValue={userData.processSEVISAppFee}
						onChange={value => {
							handleInputChange(
								'processSEVISAppFee',
								value,
								'user'
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
						selectedValue={userData.unaccompaniedMinorService}
						onChange={value => {
							handleInputChange(
								'unaccompaniedMinorService',
								value,
								'user'
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
								'user data - additional info',
								userData
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
