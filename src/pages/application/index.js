import React, { useState, Fragment } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import StepWizard from 'react-step-wizard';
import useLocalStorageState from 'use-local-storage-state';
import { addValidationRule } from 'formsy-react';
import _reduce from 'lodash.reduce';

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
	(values, value) => !!value.value && !!value.label
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

	const applicationDefaults = {
		user: {
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
		},
		application: {
			center: '',
			duration: '',
			programStartDate: '',
			programEndDate: '',
			housing: '',
			program: '',
			extraNightsOfHousing: '',
			housingCheckInDate: '',
			housingCheckOutDate: '',
			airport: '',
			airportPickUp: false,
			airportDropOff: false,
			requiresI20: false,
			transferStudent: false,
			flsHealthInsurance: false,
			expressMail: false,
			processSEVISAppFee: false,
			unaccompaniedMinorService: false,
			howDidYouHearAboutFls: '',
			specifyHowHeardAboutFls: '',
			additionalComments: '',
			termsAndConditions: false,
			programType: '',
			// TODO: Figure out passport photo & financial document image upload
		},
		billing: {
			billingAddressCountry: '',
		},
	};

	const [price, setPrice] = useState(0);
	// TODO: Going to want to create a warning that states that if localStorage is disabled, the app will not work properly
	const [prices, setPrices] = useLocalStorageState('prices', []);
	const [userData, setUserData] = useLocalStorageState(
		'userData',
		applicationDefaults.user
	);
	const [applicationData, setApplicationData] = useLocalStorageState(
		'applicationData',
		applicationDefaults.application
	);

	const [billingData, setBillingData] = useLocalStorageState(
		'billingData',
		applicationDefaults.billing
	);

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
		console.log('incoming values', currentValues);
		let applicationDataType;

		for (const property in currentValues) {
			// Using a lodash methods to make object iteration easier
			if (!applicationDataType) {
				applicationDataType = _reduce(
					applicationDefaults,
					(accum, appDefault, appDefaultKey) => {
						if (!accum) {
							// This has to be, without a doubt, the worst variable name I've ever come up with, and on that principle alone I am honorbound to use it
							const isIncomingPropertyInCurrentAppDefault = Object.keys(
								appDefault
							).some(key => key === property);

							accum = isIncomingPropertyInCurrentAppDefault
								? appDefaultKey
								: null;
						}

						return accum;
					},
					null
				);
			}

			/* This checks if an incoming state change came from a mutli select, and parses that into something that is more human readable for the final
			submission, as well as for local storage. */
			if (
				currentValues[property] &&
				currentValues[property].hasOwnProperty('value')
			) {
				console.log('got in');
				currentValues[property] = currentValues[property].value;
			}
		}

		console.log('formatted current values', currentValues);
		console.log('applicationDataType', applicationDataType);

		handleBatchInputChange(currentValues, applicationDataType);
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
						handleApplicationState={handleApplicationState}
					/>
					{/* TODO: Might want to consider unifying these two components, if
				the step wizard allows duplicates */}
					<AdditionalInfo
						hashKey={'additional-info'}
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
						handleApplicationState={handleApplicationState}
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
