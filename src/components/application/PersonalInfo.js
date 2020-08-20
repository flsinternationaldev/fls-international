import React, { Fragment } from 'react';

import Section from 'src/components/section/Section';

// TODO: Figure out how best to handle validation
export default function PersonalInfo({ nextStep }) {
	return (
		<Fragment>
			<div className="columns is-multiline">
				<div className="column is-full">
					<h3 className="fls__post-title">Personal Information</h3>
				</div>
				<div className="column is-one-third">
					<div className="field">
						{/* TODO: Add the required asterisk */}
						<label className="label">First Name</label>
						<div className="control">
							<input
								className="input fls__base-input"
								type="text"
								placeholder="Text input"
							/>
						</div>
					</div>
				</div>

				<div className="column is-one-third">
					<div className="field">
						<label className="label">Last Name</label>
						<div className="control">
							<input
								className="input fls__base-input"
								type="text"
								placeholder="Text input"
							/>
						</div>
					</div>
				</div>

				<div className="column is-one-third">
					<div className="field">
						<label className="label">Email</label>
						<div className="control">
							<input
								className="input fls__base-input"
								type="text"
								placeholder="Text input"
							/>
						</div>
					</div>
				</div>

				<div className="column is-one-third">
					<div className="field">
						<label className="label">Phone Number</label>
						<div className="control">
							<input
								className="input fls__base-input"
								type="text"
								placeholder="Text input"
							/>
						</div>
					</div>
				</div>

				<div className="column is-one-third">
					<div className="field">
						<label className="label">FGender</label>
						<div className="control">
							<input
								className="input fls__base-input"
								type="text"
								placeholder="Text input"
							/>
						</div>
					</div>
				</div>

				<div className="column is-one-third">
					<div className="field">
						<label className="label">Date of Birth</label>
						<div className="control">
							<input
								className="input fls__base-input"
								type="text"
								placeholder="Text input"
							/>
						</div>
					</div>
				</div>

				<div className="column is-one-third">
					<div className="field">
						<label className="label">Country of Citizenship</label>
						<div className="control">
							<input
								className="input fls__base-input"
								type="text"
								placeholder="Text input"
							/>
						</div>
					</div>
				</div>

				<div className="column is-one-third">
					<div className="field">
						<label className="label">Country of Birth</label>
						<div className="control">
							<input
								className="input fls__base-input"
								type="text"
								placeholder="Text input"
							/>
						</div>
					</div>
				</div>

				<div className="column is-offset-8 is-4">
					<button onClick={nextStep} className="fls__button">
						Save & Continue
					</button>
				</div>
			</div>
		</Fragment>
	);
}
