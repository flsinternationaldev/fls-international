import React, { useState } from 'react';
import AdditionalInfoForm from 'src/components/application/AdditionalInfoForm';

// TODO: Figure out how best to handle validation
export default function AdditionalInfo({
	nextStep,
	previousStep,
	handleDataChange,
	handleBatchInputChange,
	prices,
	setPrices,
	calculatePrice,
	applicationData,
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

					<div className="column is-full">
						<button
							className="fls__button fls__button--additional-info"
							onClick={() =>
								handleDataChange(
									'programType',
									'in-person',
									'application'
								)
							}
						>
							In-Person
						</button>
					</div>
					<div className="column is-full">
						<button
							className="fls__button fls__button--additional-info"
							onClick={() =>
								handleDataChange(
									'programType',
									'online',
									'application'
								)
							}
						>
							Online
						</button>
					</div>
					<div className="column is-full">
						<button
							className="fls__button fls__button--additional-info"
							onClick={() =>
								handleDataChange(
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
					currentCenter={currentCenter}
					setCurrentCenter={setCurrentCenter}
					currentProgram={currentProgram}
					setCurrentProgram={setCurrentProgram}
					handleDataChange={handleDataChange}
					handleBatchInputChange={handleBatchInputChange}
					prices={prices}
					setPrices={setPrices}
					applicationData={applicationData}
				/>
			);
		}
	};

	return handleRender(applicationData.programType);
}
