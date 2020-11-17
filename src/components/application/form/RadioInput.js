import React from 'react';
import { withFormsy } from 'formsy-react';
import { RadioGroup, Radio } from 'react-radio-group';
import ReactTooltip from 'react-tooltip';

function RadioInput({
	errorMessage,
	setValue,
	name,
	selectedValue,
	label,
	tooltip,
}) {
	return (
		<div className="field">
			{/* TODO: Add the required asterisk */}
			<label className="label label--application">
				{label}
				{tooltip ? (
					<ReactTooltip
						type="info"
						effect="solid"
						html={true}
						multiline={true}
						className="fls__tooltip"
						clickable={true}
					/>
				) : null}
				{tooltip}
			</label>
			<RadioGroup
				name={name}
				selectedValue={selectedValue}
				onChange={value => {
					setValue({ value });
				}}
			>
				<Radio value="yes" />
				<span className="fls__radio-label">Yes</span>
				<Radio value="yes" />
				<span className="fls__radio-label">No</span>
			</RadioGroup>
		</div>
	);
}

export default withFormsy(RadioInput);
