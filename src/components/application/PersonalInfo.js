import React, { Fragment } from 'react';

// TODO: Figure out how best to handle validation
export default function PersonalInfo({
	nextStep,
	userData,
	handleInputChange,
}) {
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
								placeholder="First Name"
								name="firstName"
								onChange={e =>
									handleInputChange(
										e.target.name,
										e.target.value,
										'user'
									)
								}
								value={userData.firstName}
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
								name="lastName"
								onChange={e =>
									handleInputChange(
										e.target.name,
										e.target.value,
										'user'
									)
								}
								value={userData.lastName}
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
								name="email"
								onChange={e =>
									handleInputChange(
										e.target.name,
										e.target.value,
										'user'
									)
								}
								value={userData.email}
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
								name="phoneNumber"
								onChange={e =>
									handleInputChange(
										e.target.name,
										e.target.value,
										'user'
									)
								}
								value={userData.phoneNumber}
							/>
						</div>
					</div>
				</div>

				<div className="column is-one-third">
					<div className="field">
						<label className="label">Gender</label>
						<div className="control">
							<input
								className="input fls__base-input"
								type="text"
								placeholder="Text input"
								name="gender"
								onChange={e =>
									handleInputChange(
										e.target.name,
										e.target.value,
										'user'
									)
								}
								value={userData.gender}
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
								name="birthDate"
								onChange={e =>
									handleInputChange(
										e.target.name,
										e.target.value,
										'user'
									)
								}
								value={userData.birthDate}
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
								name="citizenshipCountry"
								onChange={e =>
									handleInputChange(
										e.target.name,
										e.target.value,
										'user'
									)
								}
								value={userData.citizenshipCountry}
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
								name="birthCountry"
								onChange={e =>
									handleInputChange(
										e.target.name,
										e.target.value,
										'user'
									)
								}
								value={userData.birthCountry}
							/>
						</div>
					</div>
				</div>

				{/* TODO: Arrow icon */}
				<div className="column is-offset-8 is-4">
					<button
						onClick={() => {
							console.log('userData - personal info', userData);
							nextStep();
						}}
						className="fls__button"
					>
						Save & Continue
					</button>
				</div>
			</div>
		</Fragment>
	);
}
