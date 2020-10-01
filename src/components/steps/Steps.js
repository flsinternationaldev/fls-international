import React from 'react';

export default function Steps({ stepsNum, currentStep, goToStep }) {
	const renderSteps = () => {
		let steps = [];

		for (let i = 0; i < stepsNum; i++) {
			steps.push(
				<li
					key={i}
					onClick={goToStep.bind(this, i + 1)}
					className={`steps-segment ${
						i + 1 === currentStep ? 'is-active' : ''
					}`}
				>
					<a href="#" className="steps-marker"></a>
				</li>
			);
		}

		return steps;
	};

	return <ul className="steps">{renderSteps()}</ul>;
}
