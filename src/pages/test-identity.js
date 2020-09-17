import netlifyIdentity from 'netlify-identity-widget';

import React, { useEffect, useState } from 'react';

import Section from 'src/components/section/Section';

export default () => {
	useEffect(() => {
		netlifyIdentity.on('init', user => console.log('init', user));

		netlifyIdentity.init();

		netlifyIdentity.on('login', user => console.log('login', user));
	}, []);

	const reportUser = () => {
		console.log('retrieved user', netlifyIdentity.gotrue.currentUser());
	};

	const [userInput, setUserInput] = useState('');

	return (
		<Section>
			<div className="columns is-multiline">
				<div className="column is-full">
					<h1>Test Identity Flow</h1>
				</div>

				<div className="column is-full">
					<input
						value={userInput}
						onChange={e => setUserInput(e.target.value)}
						type="text"
					/>
				</div>

				<div className="column is-full">
					<button
						className="fls__button"
						onClick={() => {
							netlifyIdentity.gotrue.currentUser().update({
								data: {
									nestedValues: {
										iAm: 'an object',
										hereIsAnArray: [
											{
												yes: true,
											},
											{ no: false },
										],
									},
								},
							});
						}}
					>
						Persist Data
					</button>
				</div>

				<div className="column is-full">
					<button className="fls__button" onClick={reportUser}>
						Report User
					</button>
				</div>

				<div className="column is-full">
					<button
						className="fls__button"
						onClick={() => netlifyIdentity.open()}
					>
						Log In/Sign Up
					</button>
				</div>
			</div>
		</Section>
	);
};
