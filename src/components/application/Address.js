import React, { Fragment, useState } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from 'react-places-autocomplete';

const formatAddressComponents = addressComponents => {
	const desiredComponentTypes = [
			'street_number',
			'locality',
			'administrative_area_level_1',
			'postal_code',
			'country',
		],
		componentTypeMapping = {
			locality: 'city',
			street_number: 'streetNumber',
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

// TODO: Figure out how best to handle validation
export default GoogleApiWrapper({
	apiKey: process.env.GATSBY_GOOGLE_PLACE_API_KEY,
})(
	({
		previousStep,
		nextStep,
		userData,
		handleInputChange,
		handleBatchInputChange,
		calculatePrice,
		prices,
		google,
	}) => {
		const mapStyles = {
				position: 'relative',
				width: '100%',
				height: '100%',
			},
			mapContainerStyles = {
				position: 'relative',
				height: '292px',
				width: '100%',
			};

		const [latLng, setLatLng] = useState({
			lat: 40.854885,
			lng: -88.081807,
		});

		const handleSelect = address => {
			geocodeByAddress(address)
				.then(results => {
					const formattedAddressComponents = formatAddressComponents(
						results[0].address_components
					);

					handleBatchInputChange(
						{
							...formattedAddressComponents,
							address,
						},
						'user'
					);

					return getLatLng(results[0]);
				})
				.then(latLng => {
					setLatLng(latLng);
				})
				.catch(error => console.error('Error', error));
		};

		return (
			<Fragment>
				<div className="columns is-multiline">
					<div className="column is-full">
						<div className="application__header-container">
							<h3 className="fls__post-title">Your Address</h3>
							<h3 className="application__total-price">
								Estimated Price: ${calculatePrice(prices)}
							</h3>
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
										handleInputChange(
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
					<div className="column is-half">
						{/* TODO: Dropdown needs styling */}
						<Map
							google={google}
							containerStyle={mapContainerStyles}
							style={mapStyles}
							center={latLng}
							zoom={14}
						>
							{/* TODO: Think about giving this a pop up stating the chosen address */}
							<Marker position={latLng} />
						</Map>
					</div>
					{/* TODO: Perfect world, these should populate after the user
				selects the autocompleted address */}
					<div className="column is-half">
						<div className="columns is-multiline">
							<div className="column is-full">
								<div className="field">
									<label className="label">
										Street Number
									</label>
									<div className="control">
										<input
											className="input fls__base-input"
											type="text"
											value={userData.streetNumber}
										/>
									</div>
								</div>
							</div>

							<div className="column is-half">
								<div className="field">
									<label className="label">City</label>
									<div className="control">
										<input
											className="input fls__base-input"
											type="text"
											value={userData.city}
										/>
									</div>
								</div>
							</div>

							<div className="column is-half">
								<div className="field">
									<label className="label">
										State/Province/Department
									</label>
									<div className="control">
										<input
											className="input fls__base-input"
											type="text"
											value={userData.stateProvince}
										/>
									</div>
								</div>
							</div>

							<div className="column is-half">
								<div className="field">
									<label className="label">
										Zip/Postal Code
									</label>
									<div className="control">
										<input
											className="input fls__base-input"
											type="text"
											value={userData.postalCode}
										/>
									</div>
								</div>
							</div>

							<div className="column is-half">
								<div className="field">
									<label className="label">Country</label>
									<div className="control">
										<input
											className="input fls__base-input"
											type="text"
											value={userData.addressCountry}
										/>
									</div>
								</div>
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
								console.log('userData - address', userData);
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
);
