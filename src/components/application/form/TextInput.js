import React from 'react';
import { withFormsy } from 'formsy-react';

function TextInput({
	placeholder,
	errorMessage,
	setValue,
	name,
	value,
	label,
}) {
	return (
		<div className="field">
			{/* TODO: Add the required asterisk */}
			<label className="label label--required">{label}</label>

			<div className="control">
				<input
					className="input fls__base-input"
					type="text"
					placeholder={placeholder}
					onChange={e => {
						setValue(e.currentTarget.value);
					}}
					value={value}
					name={name}
				/>
			</div>

			<div className="fls__form-error">
				{errorMessage ? errorMessage : null}
			</div>
		</div>
	);
}

export default withFormsy(TextInput);
