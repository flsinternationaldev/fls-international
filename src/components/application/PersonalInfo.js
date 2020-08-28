import React, { Fragment } from 'react';
import Select from 'react-select';
import { getName, getCode } from 'country-list';
import DatePicker from 'react-datepicker';
import ReactFlagsSelect from 'react-flags-select';

import applicationStyles from './ApplicationLanding.module.scss';
import 'react-flags-select/scss/react-flags-select.scss';

// TODO: Figure out how best to handle validation
export default function PersonalInfo({
	nextStep,
	userData,
	handleInputChange,
	calculatePrice,
	prices,
}) {
	const genderOptions = [
		{ label: 'Male', value: 'Male' },
		{ label: 'Female', value: 'Female' },
		{ label: 'Non-binary', value: 'Non-binary' },
	];

	return (
		<Fragment>
			<div className="columns is-multiline">
				<div className="column is-full">
					<div className="application__header-container">
						<h3 className="fls__post-title">
							Personal Information
						</h3>
						<h3 className="application__total-price">
							Total Price: ${calculatePrice(prices)}
						</h3>
					</div>
				</div>
				<div className="column is-one-third">
					<div className="field">
						{/* TODO: Add the required asterisk */}
						<label className="label label--required">
							First Name
						</label>
						<div className="control">
							<input
								className="input fls__base-input"
								type="text"
								placeholder="First Name"
								name="firstName"
								onChange={e =>
									handleInputChange(
										e.target.name,
										e.target.value,
										'user'
									)
								}
								value={userData.firstName}
							/>
						</div>
					</div>
				</div>

				<div className="column is-one-third">
					<div className="field">
						<label className="label label--required">
							Last Name
						</label>
						<div className="control">
							<input
								className="input fls__base-input"
								type="text"
								placeholder="Last Number"
								name="lastName"
								onChange={e =>
									handleInputChange(
										e.target.name,
										e.target.value,
										'user'
									)
								}
								value={userData.lastName}
							/>
						</div>
					</div>
				</div>

				<div className="column is-one-third">
					<div className="field">
						<label className="label label--required">Email</label>
						<div className="control">
							<input
								className="input fls__base-input"
								type="text"
								placeholder="Text input"
								name="email"
								onChange={e =>
									handleInputChange(
										e.target.name,
										e.target.value,
										'user'
									)
								}
								value={userData.email}
							/>
						</div>
					</div>
				</div>

				<div className="column is-one-third">
					<div className="field">
						<label className="label label--required">
							Phone Number
						</label>
						{/* TODO: Country code? */}
						<div className="control">
							<input
								className="input fls__base-input"
								type="text"
								placeholder="Phone Number"
								name="phoneNumber"
								onChange={e =>
									handleInputChange(
										e.target.name,
										e.target.value,
										'user'
									)
								}
								value={userData.phoneNumber}
							/>
						</div>
					</div>
				</div>

				<div className="column is-one-third">
					<div className="field">
						<label className="label">Gender</label>
						<div className="control">
							<Select
								className="fls__select-container"
								classNamePrefix={'fls'}
								value={{
									label: userData.gender,
									value: userData.gender,
								}}
								onChange={genderOption => {
									handleInputChange(
										'gender',
										genderOption.value,
										'user'
									);
								}}
								options={genderOptions}
							/>
						</div>
					</div>
				</div>

				<div className="column is-one-third">
					<div className="field">
						<label className="label label--required">
							Date of Birth
						</label>
						<div className="control">
							{/* <input
								className="input fls__base-input"
								type="text"
								placeholder="Text input"
								name="birthDate"
								onChange={e =>
									handleInputChange(
										e.target.name,
										e.target.value,
										'user'
									)
								}
								value={userData.birthDate}
							/> */}
							<DatePicker
								selected={userData.birthDate}
								onChange={date =>
									handleInputChange('birthDate', date, 'user')
								}
								value={userData.birthDate}
								minDate={new Date()}
								wrapperClassName={
									applicationStyles.fls__dateWrapper
								}
								className={'input fls__base-input'}
								// TODO: This should auto format when typing the date
								placeholderText={'Birthday (MM/DD/YY)'}
							/>
						</div>
					</div>
				</div>

				<div className="column is-one-third">
					<div className="field">
						<label className="label label--required">
							Country of Citizenship
						</label>

						<div className="control">
							<ReactFlagsSelect
								defaultCountry={getCode(
									userData.citizenshipCountry || 'France'
								)}
								searchable={true}
								onSelect={countryCode => {
									handleInputChange(
										'citizenshipCountry',
										getName(countryCode),
										'user'
									);
								}}
							/>
						</div>
					</div>
				</div>

				<div className="column is-one-third">
					<div className="field">
						<label className="label label--required">
							Country of Birth
						</label>
						<div className="control">
							<div className="control">
								<ReactFlagsSelect
									defaultCountry={getCode(
										userData.birthCountry || 'France'
									)}
									searchable={true}
									onSelect={countryCode => {
										handleInputChange(
											'birthCountry',
											getName(countryCode),
											'user'
										);
									}}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* TODO: Arrow icon */}
				<div className="column is-offset-8 is-4">
					<button
						onClick={() => {
							console.log('userData - personal info', userData);
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
