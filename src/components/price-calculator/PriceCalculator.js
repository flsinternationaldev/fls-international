import React from 'react';

export default function Navbar(props) {
	// TODO: This needs to come from the CMS

	return (
		<div className="fls__location-price-calculator">
			<h6 className="fls__post-title">Price Calculator</h6>
			<div className="field">
				<div className="control">
					<input
						className="input"
						type="date"
						placeholder="Choose Your Date"
					/>
				</div>
			</div>
			<div className="field has-addons">
				<div className="control is-expanded">
					<div className="select is-fullwidth">
						<select>
							<option>Choose Your Duration</option>
							<option>1 Week</option>
						</select>
					</div>
				</div>
			</div>
			<div className="field has-addons">
				<div className="control is-expanded">
					<div className="select is-fullwidth">
						<select>
							<option>Saddleback College</option>
							<option>Other Colleges</option>
						</select>
					</div>
				</div>
			</div>
			<div className="field has-addons">
				<div className="control is-expanded">
					<div className="select is-fullwidth">
						<select>
							<option>Choose Your Housing</option>
							<option>Other Housing Options</option>
						</select>
					</div>
				</div>
			</div>
			<div className="field has-addons">
				<div className="control is-expanded">
					<div className="select is-fullwidth">
						<select>
							<option>Choose Your Program</option>
							<option>Other Programs</option>
						</select>
					</div>
				</div>
			</div>
			<button className="fls__button">Apply Now</button>
		</div>
	);
}
