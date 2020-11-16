import React from 'react';
import { withFormsy } from 'formsy-react';
import { getName } from 'country-list';
import ReactFlagsSelect from 'react-flags-select';

import 'react-flags-select/scss/react-flags-select.scss';

function DateInput({
	setValue,
	label,
	name,
	defaultCountry,
	searchable,
	errorMessage,
}) {
	return (
		<div className="field">
			<label className="label label--required">{label}</label>

			<div className="control">
				<ReactFlagsSelect
					defaultCountry={defaultCountry}
					searchable={searchable}
					onSelect={countryCode => setValue(getName(countryCode))}
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
