import React from 'react';

export default function Home(props) {
	return (
		<section className="hero is-link is-fullheight">
			{/* TODO: _.template these carousel slides */}
			<div className="hero-body__carousel">
				<div className="hero-body__carousel-item">
					<div className="hero__copy-container">
						<h2 className="subtitle hero__copy-title">
							FLS International
						</h2>
						<h1 className="hero__copy">
							ENGLISH LANGUAGE PROGRAMS, PATHWAYS & SPECIALTY
							TOURS
						</h1>
					</div>
				</div>

				<div className="hero-body__carousel-item">
					<div className="hero__copy-container">
						<h2 className="subtitle hero__copy-title">
							FLS International
						</h2>
						<h1 className="hero__copy">
							ENGLISH LANGUAGE PROGRAMS, PATHWAYS & SPECIALTY
							TOURS
						</h1>
					</div>
				</div>

				<div className="hero-body__carousel-item">
					<div className="hero__copy-container">
						<h2 className="subtitle hero__copy-title">
							FLS International
						</h2>
						<h1 className="hero__copy">
							ENGLISH LANGUAGE PROGRAMS, PATHWAYS & SPECIALTY
							TOURS
						</h1>
					</div>
				</div>
			</div>
		</section>
	);
}
