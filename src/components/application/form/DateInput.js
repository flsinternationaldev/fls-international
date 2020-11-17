import React from 'react';
import { withFormsy } from 'formsy-react';
import DatePicker from 'react-datepicker';
import ReactTooltip from 'react-tooltip';

import { renderRequirement } from 'src/utils/helpers';

function DateInput({
	setValue,
	label,
	name,
	selected,
	minDate,
	placeholderText,
	errorMessage,
	onChangeCallback,
	tooltip,
	requirement,
	readOnly,
	wrapperClassName,
	filterDate,
}) {
	return (
		<div className="field">
			<div className="application__label-container">
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

				{renderRequirement(requirement)}
			</div>

			<div className="control">
				<DatePicker
					selected={selected ? new Date(selected) : selected}
					onChange={date => {
						if (onChangeCallback) onChangeCallback(date);

						setValue({ value: date });
					}}
					minDate={minDate}
					wrapperClassName={
						wrapperClassName
							? wrapperClassName
							: 'fls__date-wrapper'
					}
					className={'input fls__base-input'}
					placeholderText={placeholderText}
					name={name}
					filterDate={filterDate}
					readOnly={readOnly}
				/>
			</div>

			<div className="fls__form-error">
				{errorMessage ? errorMessage : null}
			</div>
		</div>
	);
}

export default withFormsy(DateInput);
