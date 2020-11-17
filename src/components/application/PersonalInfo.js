import React, { useState } from 'react';
import Formsy from 'formsy-react';
import _isNil from 'lodash.isnil';
import { getCode } from 'country-list';

import TextInput from 'src/components/application/form/TextInput';
import SelectInput from 'src/components/application/form/SelectInput';
import DateInput from 'src/components/application/form/DateInput';
import CountryInput from 'src/components/application/form/CountryInput';

// TODO: Figure out how best to handle validation
export default function PersonalInfo({
	nextStep,
	userData,
	handleApplicationState,
}) {
	const genderOptions = [
		{ label: 'Male', value: 'Male' },
		{ label: 'Female', value: 'Female' },
		{ label: 'Non-binary', value: 'Non-binary' },
	];

	const [isValidForm, setIsValidForm] = useState();

	return (
		<Formsy
			onChange={handleApplicationState}
			onValid={() => setIsValidForm(true)}
			onInvalid={() => setIsValidForm(false)}
		>
			<div className="columns is-multiline">
				<div className="column is-full">
					<div className="application__header-container">
						<h3 className="fls-post__title">
							Personal Information
						</h3>
					</div>
				</div>
				<div className="column is-one-third">
					<TextInput
						validations="isExisty"
						validationError="Field cannot be blank"
						name="firstName"
						placeholder="First Name"
						value={userData.firstName}
						label={'First Name'}
						required
					/>
				</div>

				<div className="column is-one-third">
					<TextInput
						validations="isExisty"
						validationError="Field cannot be blank"
						name="lastName"
						placeholder="Last Name"
						value={userData.lastName}
						label={'Last Name'}
						required
					/>
				</div>

				<div className="column is-one-third">
					<TextInput
						validations="isEmail"
						validationError="Cannot be blank and must be a valid email."
						name="email"
						placeholder="Email"
						value={userData.email}
						label={'Email'}
						required
					/>
				</div>

				<div className="column is-one-third">
					<TextInput
						validations="isNumeric"
						validationError="Cannot be blank and must only contain numbers."
						name="phoneNumber"
						placeholder="Phone Number"
						value={userData.phoneNumber}
						label={'Phone Number'}
						required
					/>
				</div>

				<div className="column is-one-third">
					<SelectInput
						name="gender"
						label={'Gender'}
						value={{
							label: userData.gender,
							value: userData.gender,
						}}
						options={genderOptions}
					/>
				</div>

				<div className="column is-one-third">
					<DateInput
						validations="isExisty"
						validationError="Please select a date."
						label={'Date of Birth'}
						selected={
							!_isNil(userData.birthDate)
								? userData.birthDate
								: userData.birthDate
						}
						name={'birthDate'}
						placeholderText={'Birthday (MM/DD/YY)'}
						required
					/>
				</div>

				<div className="column is-one-third">
					<CountryInput
						validations="isExisty"
						validationError="Please select a country."
						label={'Country of Citizenship'}
						defaultCountry={
							userData.citizenshipCountry
								? getCode(userData.citizenshipCountry)
								: null
						}
						name={'citizenshipCountry'}
						searchable={true}
						required
					/>
				</div>

				<div className="column is-one-third">
					<CountryInput
						validations="isExisty"
						validationError="Please select a country."
						label={'Country of Birth'}
						defaultCountry={
							userData.birthCountry
								? getCode(userData.birthCountry)
								: null
						}
						searchable={true}
						name={'birthCountry'}
						required
					/>
				</div>

				{/* TODO: Arrow icon */}
				<div className="column is-offset-8 is-4">
					<button
						onClick={() => {
							nextStep();
						}}
						disabled={!isValidForm}
						className={
							isValidForm
								? 'fls__button'
								: 'fls__button fls__button--disabled'
						}
					>
						Save & Continue
					</button>
				</div>
			</div>
		</Formsy>
	);
}
