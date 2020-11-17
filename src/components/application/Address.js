import React, { useState } from 'react';
import Formsy from 'formsy-react';
import { GoogleApiWrapper } from 'google-maps-react';
import PlacesAutocomplete, {
	geocodeByAddress,
} from 'react-places-autocomplete';

import TextInput from 'src/components/application/form/TextInput';

const formatAddressComponents = addressComponents => {
	const desiredComponentTypes = [
			'locality',
			'administrative_area_level_1',
			'postal_code',
			'country',
		],
		componentTypeMapping = {
			locality: 'city',
			administrative_area_level_1: 'stateProvince',
			postal_code: 'postalCode',
			country: 'addressCountry',
		};

	return addressComponents.reduce((accum, addressComponent) => {
		// TODO: Probably not a good idea to directly access the array like this
		if (desiredComponentTypes.includes(addressComponent.types[0]))
			accum[componentTypeMapping[addressComponent.types[0]]] =
				addressComponent.long_name;

		return accum;
	}, {});
};

export default GoogleApiWrapper({
	apiKey: process.env.GATSBY_GOOGLE_PLACE_API_KEY,
})(
	({
		previousStep,
		nextStep,
		userData,
		handleDataChange,
		handleBatchInputChange,
		handleApplicationState,
	}) => {
		const handleSelect = address => {
			geocodeByAddress(address)
				.then(results => {
					const formattedAddressComponents = formatAddressComponents(
						results[0].address_components
					);

					// handleBatchInputChange(
					// 	{
					// 		...formattedAddressComponents,
					// 		address,
					// 	},
					// 	'user'
					// );

					handleApplicationState({
						...formattedAddressComponents,
						address,
					});
				})
				.catch(error => console.error('Error', error));
		};

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
							<h3 className="fls-post__title">Your Address</h3>
						</div>
					</div>
					<div className="column is-full">
						<div className="field">
							{/* TODO: Add the required asterisk */}
							<label className="label">Address</label>
							<div className="control">
								<PlacesAutocomplete
									value={userData.address}
									name="address"
									onChange={address => {
										handleDataChange(
											'address',
											address,
											'user'
										);
									}}
									onSelect={handleSelect}
								>
									{({
										getInputProps,
										suggestions,
										getSuggestionItemProps,
										loading,
									}) => (
										<div>
											<input
												{...getInputProps({
													placeholder:
														'Search Places ...',
													className:
														'input fls__base-input',
												})}
											/>
											<div className="autocomplete-dropdown-container">
												{loading && (
													<div>Loading...</div>
												)}
												{suggestions.map(suggestion => {
													const className = suggestion.active
														? 'suggestion-item--active'
														: 'suggestion-item';
													// inline style for demonstration purpose
													const style = suggestion.active
														? {
																backgroundColor:
																	'#fafafa',
																cursor:
																	'pointer',
														  }
														: {
																backgroundColor:
																	'#ffffff',
																cursor:
																	'pointer',
														  };
													return (
														<div
															{...getSuggestionItemProps(
																suggestion,
																{
																	className,
																	style,
																}
															)}
														>
															<span>
																{
																	suggestion.description
																}
															</span>
														</div>
													);
												})}
											</div>
										</div>
									)}
								</PlacesAutocomplete>
							</div>
						</div>
					</div>

					<div className="column is-full">
						<div className="columns is-multiline">
							<div className="column is-half">
								<TextInput
									validations="isExisty"
									validationError="Field cannot be blank"
									name="city"
									placeholder="City"
									value={userData.city}
									label={'City'}
									required
								/>
							</div>

							<div className="column is-half">
								<TextInput
									validations="isExisty"
									validationError="Field cannot be blank"
									name="stateProvince"
									placeholder="State/Province/Department"
									value={userData.stateProvince}
									label={'State/Province/Department'}
									required
								/>
							</div>

							<div className="column is-half">
								<TextInput
									validations="isExisty"
									validationError="Field cannot be blank"
									name="stateProvince"
									placeholder="Zip/Postal Code"
									value={userData.postalCode}
									label={'Zip/Postal Code'}
									required
								/>
							</div>

							<div className="column is-half">
								{/* TODO: This should probably eventually be a CountryInput. It's more annoying than it should be to programatically set the country input based on local storage. */}
								<TextInput
									validations="isExisty"
									validationError="Field cannot be blank"
									name="addressCountry"
									placeholder="Country"
									value={userData.addressCountry}
									label={'Country'}
									required
								/>
							</div>
						</div>
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
);
