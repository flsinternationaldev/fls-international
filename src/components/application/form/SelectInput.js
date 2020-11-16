import React from 'react';
import { withFormsy } from 'formsy-react';
import Select from 'react-select';

function SelectInput({ errorMessage, setValue, name, value, label, options }) {
	return (
		<div className="field">
			<label className="label">{label}</label>

			<div className="control">
				<Select
					className="fls__select-container"
					classNamePrefix={'fls'}
					value={value}
					onChange={selection => {
						setValue(selection);
					}}
					options={options}
					name={name}
				/>
			</div>

			<div className="fls__form-error">
				{errorMessage ? errorMessage : null}
			</div>
		</div>
	);
}

export default withFormsy(SelectInput);
