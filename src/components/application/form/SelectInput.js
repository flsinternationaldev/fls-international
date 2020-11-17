import React from 'react';
import { withFormsy } from 'formsy-react';
import Select from 'react-select';

import { renderRequirement } from 'src/utils/helpers';

function SelectInput({
	errorMessage,
	setValue,
	name,
	value,
	label,
	options,
	onChangeCallback,
	requirement,
	className,
	isDisabled,
}) {
	return (
		<div className="field">
			<div className="application__label-container">
				<label className="label label--application">{label}</label>
				{renderRequirement(requirement)}
			</div>

			<div className="control">
				<Select
					className={className ? className : 'fls__select-container'}
					classNamePrefix={'fls'}
					value={value}
					onChange={selection => {
						if (onChangeCallback) onChangeCallback(selection);

						setValue(selection);
					}}
					options={options}
					name={name}
					isDisabled={isDisabled}
				/>
			</div>

			<div className="fls__form-error">
				{errorMessage ? errorMessage : null}
			</div>
		</div>
	);
}

export default withFormsy(SelectInput);
