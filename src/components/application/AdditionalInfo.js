import React, { useState } from 'react';
import AdditionalInfoForm from 'src/components/application/AdditionalInfoForm';

// TODO: Figure out how best to handle validation
export default function AdditionalInfo({
	nextStep,
	previousStep,
	handleInputChange,
	prices,
	setPrices,
	calculatePrice,
	applicationData,
	setGeneralFeesTitle,
	currentCenter,
	setCurrentCenter,
	currentProgram,
	setCurrentProgram,
}) {
	const handleRender = programType => {
		if (!applicationData.programType) {
			return (
				<div className="columns is-multiline">
					<div className="column is-full">
						<h2 className="title title--fls has-text-centered">
							Select Your Program Type
						</h2>
					</div>

					<div className="column is-one-third">
						<button
							className="fls__button"
							onClick={() =>
								handleInputChange(
									'programType',
									'in-person',
									'application'
								)
							}
						>
							In-Person
						</button>
					</div>
					<div className="column is-one-third">
						<button
							className="fls__button"
							onClick={() =>
								handleInputChange(
									'programType',
									'online',
									'application'
								)
							}
						>
							Online
						</button>
					</div>
					<div className="column is-one-third">
						<button
							className="fls__button"
							onClick={() =>
								handleInputChange(
									'programType',
									'specialty-tours',
									'application'
								)
							}
						>
							Specialty Tours
						</button>
					</div>
				</div>
			);
		} else {
			return (
				<AdditionalInfoForm
					calculatePrice={calculatePrice}
					nextStep={nextStep}
					previousStep={previousStep}
					setGeneralFeesTitle={setGeneralFeesTitle}
					currentCenter={currentCenter}
					setCurrentCenter={setCurrentCenter}
					currentProgram={currentProgram}
					setCurrentProgram={setCurrentProgram}
					handleInputChange={handleInputChange}
					prices={prices}
					setPrices={setPrices}
					applicationData={applicationData}
				/>
			);
		}
	};

	return handleRender(applicationData.programType);
}
