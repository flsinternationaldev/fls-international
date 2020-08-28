import React from 'react';

// TODO: Note that Netlify forms, apparently, have monthly limits. Look into that m
export default function Form() {
	return (
		<form
			style={{ position: 'absolute', visibility: 'hidden' }}
			name="user-application"
			method="post"
			data-netlify="true"
			data-netlify-honeypot="bot-field"
		>
			{/* You still need to add the hidden input with the form name to your JSX form */}
			<input type="hidden" name="form-name" value="user-application" />

			<label>
				First Name: <input type="text" name="firstName" />
			</label>
		</form>
	);
}
