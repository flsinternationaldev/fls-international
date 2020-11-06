import React from 'react';
import useLocalStorageState from 'use-local-storage-state';

import Layout from 'src/components/Layout';
import Section from 'src/components/section/Section';

export const ApplicationSuccessTemplate = () => {
	const [applicationData, setApplicationData] = useLocalStorageState(
		'applicationData',
		{
			center: '',
			duration: '',
			programStartDate: '',
			programEndDate: '',
			housing: '',
			program: '',
			extraNights: '',
			housingCheckInDate: '',
			housingCheckOutDate: '',
			airport: '',
			airportPickUp: false,
			airportDropOff: false,
			requiresI20: false,
			transferStudent: false,
			buyingHealthInsurance: false,
			expressMail: false,
			processSEVISAppFee: false,
			unaccompaniedMinorService: false,
			howDidYouHearAboutFls: '',
			specifyHowHeardAboutFls: '',
			additionalComments: '',
			termsAndConditions: false,
			programType: '',
			// TODO: Figure out passport photo & financial document image upload
		}
	);

	const [userData, setUserData] = useLocalStorageState('userData', {
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: '',
		gender: '',
		birthDate: '',
		citizenshipCountry: '',
		birthCountry: '',
		address: '',
		city: '',
		stateProvince: '',
		postalCode: '',
		addressCountry: '',
	});

	const renderSuccessCopy = () => {
		let copy = `You have successfully applied to <strong>${applicationData.program.name}</strong>! `;

		// TODO: The program and location name should be links
		if (applicationData.programType === 'in-person') {
			copy += `This <strong>in person program</strong> is on location at <strong>${applicationData.center.centerName}</strong> in <strong>${applicationData.center.name}</strong>.`;
		} else if (applicationData.programType === 'online') {
			copy += `This <strong>${applicationData.program.onlineProgramType}</strong> will take place entirely online, with no need to travel to a physical location.`;
		} else if (applicationData.programType === 'specialty-tours') {
			copy += `This is a <strong>specialty tour</strong> on location at <strong>${applicationData.center.centerName}</strong> in <strong>${applicationData.center.name}</strong>.`;
		}

		copy += ` We have also sent a confirmation email to <strong>${userData.email}</strong> containing the details of your purchase.`;
		copy += `<p>For any questions about your application, or the request any changes, please feel free to email us at <a href="mailto:info@fls.net">info@fls.net</a>;</p>`;

		return copy;
	};

	return (
		<Section sectionClasses={['section']} containerClasses={['container']}>
			<div className="columns is-multiline">
				<div className="column is-full">
					<div className="fls-success__container">
						<h1 className="title title--fls un">Success!</h1>

						<p
							dangerouslySetInnerHTML={{
								__html: renderSuccessCopy(),
							}}
						></p>
					</div>
				</div>
			</div>
		</Section>
	);
};

const ApplicationSuccessPage = ({ data }) => {
	return (
		<Layout
			isScrolled={true}
			hasNavHero={true}
			pageTitle={'Application Success'}
		>
			<ApplicationSuccessTemplate />
		</Layout>
	);
};

export default ApplicationSuccessPage;
