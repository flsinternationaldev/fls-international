import React, { useState, Fragment } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import StepWizard from 'react-step-wizard';
import useLocalStorageState from 'use-local-storage-state';
import { addValidationRule } from 'formsy-react';

import Layout from 'src/components/Layout';
import Section from 'src/components/section/Section';
import Steps from 'src/components/steps/Steps';
import PersonalInfo from 'src/components/application/PersonalInfo';
import Address from 'src/components/application/Address';
import AdditionalInfo from 'src/components/application/AdditionalInfo';
import MoreInfo from 'src/components/application/MoreInfo';
import BillingCheckout from 'src/components/application/BillingCheckout';
import NetlifyStaticForm from 'src/components/application/NetlifyStaticForm';

import { calculatePrice } from 'src/utils/helpers';

// Custom validator for React Select inputs
addValidationRule(
	'isSelected',
	(values, value) => value.value.length > 0 && value.label.length > 0
);

export const ApplicationTemplate = () => {
	const data = useStaticQuery(graphql`
		{
			generalFees: allMarkdownRemark(
				limit: 1000
				filter: { fileAbsolutePath: { regex: "/data/general-fees//" } }
			) {
				edges {
					node {
						frontmatter {
							name
							centerNameRelation
							priceDetails {
								price
								payPeriod
							}
						}
					}
				}
			}
		}
	`);

	const [price, setPrice] = useState(0);
	// TODO: Going to want to create a warning that states that if localStorage is disabled, the app will not work properly
	const [prices, setPrices] = useLocalStorageState('prices', []);
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

	const [billingData, setBillingData] = useLocalStorageState('billingData', {
		billingAddressCountry: '',
	});

	const [currentCenter, setCurrentCenter] = useState(null);

	const [currentProgram, setCurrentProgram] = useState(null);

	// TODO: Because this is async, we should probably create a flag to prevent form submission until state has updated
	const handleDataChange = (name, value, type) => {
		// console.table({ name, value, type });
		if (type === 'user') {
			setUserData({
				...userData,
				[name]: value,
			});
		} else if (type === 'billing') {
			setBillingData({
				...billingData,
				[name]: value,
			});
		} else if (type === 'application') {
			setApplicationData({
				...applicationData,
				[name]: value,
			});
		}
	};

	const handleBatchInputChange = (values, type) => {
		// TODO: This is a nonce function, to be replaced with a DRYer solution later

		if (type === 'user') {
			setUserData({
				...userData,
				...values,
			});
		} else if (type === 'billing') {
			setBillingData({
				...billingData,
				...values,
			});
		} else if (type === 'application') {
			setApplicationData({
				...applicationData,
				...values,
			});
		}
	};

	const handleApplicationState = currentValues => {
		for (const property in currentValues) {
			/* This checks if an incoming state change came from a mutli select, and parses that into something that is more human readable for the final
			submission, as well as for local storage */
			if (
				currentValues[property] &&
				currentValues[property].hasOwnProperty('value') &&
				currentValues[property].hasOwnProperty('label')
			)
				currentValues[property] = currentValues[property].value;
		}

		handleBatchInputChange(currentValues, 'user');
	};

	return (
		<Fragment>
			<NetlifyStaticForm
				formFields={[
					...Object.keys(userData),
					...Object.keys(applicationData),
					...Object.keys(billingData),
				]}
			/>

			{/* // NOTE: There's a bug with stepwizard wherein it fails if you
			provide only one child */}
			<Section
				sectionClasses={['section']}
				containerClasses={['container']}
			>
				{/* TODO: For some reason, the hash has stepped rendering in the URL bar? */}
				<StepWizard isHashEnabled={true} nav={<Steps stepsNum={5} />}>
					<PersonalInfo
						hashKey={'personal-info'}
						handleDataChange={handleDataChange}
						userData={userData}
						prices={prices}
						setPrices={setPrices}
						price={price}
						setPrice={setPrice}
						calculatePrice={calculatePrice}
						handleApplicationState={handleApplicationState}
					/>
					<Address
						hashKey={'address'}
						userData={userData}
						handleDataChange={handleDataChange}
						handleBatchInputChange={handleBatchInputChange}
						prices={prices}
						setPrices={setPrices}
						price={price}
						setPrice={setPrice}
						calculatePrice={calculatePrice}
					/>
					{/* TODO: Might want to consider unifying these two components, if
				the step wizard allows duplicates */}
					<AdditionalInfo
						hashKey={'additional-info'}
						userData={userData}
						handleDataChange={handleDataChange}
						handleBatchInputChange={handleBatchInputChange}
						prices={prices}
						setPrices={setPrices}
						price={price}
						setPrice={setPrice}
						calculatePrice={calculatePrice}
						applicationData={applicationData}
						currentCenter={currentCenter}
						setCurrentCenter={setCurrentCenter}
						currentProgram={currentProgram}
						setCurrentProgram={setCurrentProgram}
						setApplicationData={setApplicationData}
					/>
					<MoreInfo
						hashKey={'more-info'}
						userData={userData}
						applicationData={applicationData}
						handleDataChange={handleDataChange}
						prices={prices}
						setPrices={setPrices}
						price={price}
						setPrice={setPrice}
						calculatePrice={calculatePrice}
					/>
					<BillingCheckout
						hashKey={'billing-checkout'}
						userData={userData}
						billingData={billingData}
						handleDataChange={handleDataChange}
						handleBatchInputChange={handleBatchInputChange}
						prices={prices}
						setPrices={setPrices}
						price={price}
						setPrice={setPrice}
						calculatePrice={calculatePrice}
						applicationData={applicationData}
					/>
				</StepWizard>
			</Section>
		</Fragment>
	);
};

const ApplicationPage = ({ data }) => {
	// TODO: Page title needs to change as user progress through application
	return (
		<Layout
			isScrolled={true}
			hasNavHero={true}
			hasNavButtons={false}
			pageTitle={'Personal Information'}
		>
			<ApplicationTemplate />
		</Layout>
	);
};

export default ApplicationPage;
