import React from 'react';
import { navigate } from 'gatsby';

const encode = data => {
	return Object.keys(data)
		.map(
			key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
		)
		.join('&');
};

export const handleSubmission = data => {
	fetch('/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: encode({ 'form-name': 'user-application', ...data }),
	})
		.then(() => {
			navigate('/application/success');
		})
		.catch(error => alert(error));
};

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
					<label key={formField}>
						<input name={formField}></input>
					</label>
				);
			})}
		</form>
	);
}
