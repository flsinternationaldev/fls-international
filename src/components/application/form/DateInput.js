import React from 'react';
import { withFormsy } from 'formsy-react';
import DatePicker from 'react-datepicker';

function DateInput({
	setValue,
	label,
	name,
	selected,
	minDate,
	placeholderText,
	errorMessage,
}) {
	return (
		<div className="field">
			<label className="label label--required">{label}</label>

			<div className="control">
				<DatePicker
					selected={selected ? new Date(selected) : selected}
					onChange={date => setValue(date)}
					minDate={minDate}
					wrapperClassName="fls__date-wrapper"
					className={'input fls__base-input'}
					placeholderText={placeholderText}
					name={name}
				/>
			</div>

			<div className="fls__form-error">
				{errorMessage ? errorMessage : null}
			</div>
		</div>
	);
}

export default withFormsy(DateInput);
