import React from 'react';
import quickFactsStyles from './QuickFacts.module.scss';

export default function Navbar(props) {
	// TODO: This needs to come from the CMS
	const facilities = [
			'Cafeteria',
			'McKinney Theater',
			'Library',
			'Free WiFi',
			'Smartboards',
			'Tennis courts',
		],
		popularMajors = [
			'Liberal Arts',
			'Health Sciences',
			'Business',
			'Psychology',
			'Environmental Sciences',
		],
		airportPickupItems = ['Los Angeles Int. Airport (LAX)', '91 KM'],
		averageTemps = [
			'Spring 23°C',
			'Summer 26°C',
			'Fall 22°C',
			'Winter 20°C',
		],
		enrollmentItems = [
			'Approximately 27,000 student, including 14,000 degree-seeking undergraduates',
		],
		programsOfferedItems = [
			'Vacation English',
			'General English',
			'Intensive English',
			'Academic English',
			'TOEFL Preparation',
			'High School Completion',
			'Concurrent Enrollment',
		],
		localTransportationItems = [
			'Bus: OCTA stop on campus',
			'Light rail: Metrolink line, 1 mile from campus',
		],
		nearbyAttractions = [
			'Laguna Beach - 11 Miles',
			'Disneyland - 26 Miles',
			'Downtown Los Angeles - 52 Miles',
		];

	return (
		<div className={`${quickFactsStyles.fls__quickFacts} column is-full`}>
			<h6 className="fls__post-title">Quick Facts</h6>

			<div className={quickFactsStyles.fls__quickFactContainer}>
				{/* TODO: Think about implementing an icon system */}
				<img
					src="../../img/campus-facilities-icon.png"
					alt=""
					className={quickFactsStyles.fls__quickFactIcon}
				/>
				<div className={quickFactsStyles.quickFactCopy}>
					<div className={quickFactsStyles.fls__quickFactTitle}>
						Campus Facilities
					</div>
					<ul className={quickFactsStyles.fls__quickFactItems}>
						{facilities.map(facility => (
							<li className={quickFactsStyles.fls__quickFactItem}>
								{facility}
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className={quickFactsStyles.fls__quickFactContainer}>
				{/* <TODO: Think about implementing an icon system */}
				<img
					src="../../img/popular-majors-icon.png"
					alt=""
					className={quickFactsStyles.fls__quickFactIcon}
				/>
				<div className={quickFactsStyles.quickFactCopy}>
					<div className={quickFactsStyles.fls__quickFactTitle}>
						Popular Majors
					</div>
					<ul className={quickFactsStyles.fls__quickFactItems}>
						{popularMajors.map(facility => (
							<li className={quickFactsStyles.fls__quickFactItem}>
								{facility}
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className={quickFactsStyles.fls__quickFactContainer}>
				{/* TODO: Think about implementing an icon system */}
				<img
					src="../../img/airport-pickup-icon.png"
					alt=""
					className={quickFactsStyles.fls__quickFactIcon}
				/>
				<div className={quickFactsStyles.quickFactCopy}>
					<div className={quickFactsStyles.fls__quickFactTitle}>
						Airport Pickup
					</div>
					<ul className={quickFactsStyles.fls__quickFactItems}>
						<ul className={quickFactsStyles.fls__quickFactItems}>
							{airportPickupItems.map(airtportPickupItem => (
								<li
									className={
										quickFactsStyles.fls__quickFactItem
									}
								>
									{airtportPickupItem}
								</li>
							))}
						</ul>
					</ul>
				</div>
			</div>

			<div className={quickFactsStyles.fls__quickFactContainer}>
				{/* TODO: Think about implementing an icon system */}
				<img
					src="../../img/average-temp-icon.png"
					alt=""
					className={quickFactsStyles.fls__quickFactIcon}
				/>
				<div className={quickFactsStyles.quickFactCopy}>
					<div className={quickFactsStyles.fls__quickFactTitle}>
						Average Temp
					</div>
					<ul className={quickFactsStyles.fls__quickFactItems}>
						{averageTemps.map(averageTemp => (
							<li className={quickFactsStyles.fls__quickFactItem}>
								{averageTemp}
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className={quickFactsStyles.fls__quickFactContainer}>
				{/* TODO: Think about implementing an icon system */}
				<img
					src="../../img/enrollment-icon.png"
					alt=""
					className={quickFactsStyles.fls__quickFactIcon}
				/>
				<div className={quickFactsStyles.quickFactCopy}>
					<div className={quickFactsStyles.fls__quickFactTitle}>
						Enrollment
					</div>
					<ul className={quickFactsStyles.fls__quickFactItems}>
						{enrollmentItems.map(enrollmentItem => (
							<li className={quickFactsStyles.fls__quickFactItem}>
								{enrollmentItem}
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className={quickFactsStyles.fls__quickFactContainer}>
				{/* TODO: Think about implementing an icon system */}
				<img
					src="../../img/programs-offered-icon.png"
					alt=""
					className={quickFactsStyles.fls__quickFactIcon}
				/>
				<div className={quickFactsStyles.quickFactCopy}>
					<div className={quickFactsStyles.fls__quickFactTitle}>
						Programs Offered
					</div>
					<ul className={quickFactsStyles.fls__quickFactItems}>
						{programsOfferedItems.map(programsOfferedItem => (
							<li className={quickFactsStyles.fls__quickFactItem}>
								{programsOfferedItem}
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className={quickFactsStyles.fls__quickFactContainer}>
				{/* TODO: Think about implementing an icon system */}
				<img
					src="../../img/local-transportation-icon.png"
					alt=""
					className={quickFactsStyles.fls__quickFactIcon}
				/>
				<div className={quickFactsStyles.quickFactCopy}>
					<div className={quickFactsStyles.fls__quickFactTitle}>
						Local Transportation
					</div>
					<ul className={quickFactsStyles.fls__quickFactItems}>
						{localTransportationItems.map(
							localTransportationItem => (
								<li
									className={
										quickFactsStyles.fls__quickFactItem
									}
								>
									{localTransportationItem}
								</li>
							)
						)}
					</ul>
				</div>
			</div>

			<div className={quickFactsStyles.fls__quickFactContainer}>
				{/* TODO: Think about implementing an icon system */}
				<img
					src="../../img/major-attractions-icon.png"
					alt=""
					className={quickFactsStyles.fls__quickFactIcon}
				/>
				<div className={quickFactsStyles.quickFactCopy}>
					<div className={quickFactsStyles.fls__quickFactTitle}>
						Distance to Major Attractions
					</div>
					<ul className={quickFactsStyles.fls__quickFactItems}>
						{nearbyAttractions.map(nearbyAttraction => (
							<li className={quickFactsStyles.fls__quickFactItem}>
								{nearbyAttraction}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
