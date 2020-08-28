import React from 'react';

// TODO: Note that Netlify forms, apparently, have monthly limits. Look into that
export default function NetlifyStaticForm({ formFields }) {
	// TODO: This form implementation is worthy of a blog post
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

			{/* These labels and associated inputs are not meant to be rendered. Rather, Netlify will map the values from a POST that hits '\' to the inputs here, based on the 'name' attribute */}
			{formFields.map(formField => {
				return (
					<label>
						<input name={formField}></input>
					</label>
				);
			})}
		</form>
	);
}
