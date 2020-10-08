import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import StepWizard from 'react-step-wizard';

import Layout from 'src/components/Layout';
import Section from 'src/components/section/Section';
import Steps from 'src/components/steps/Steps';
import PersonalInfo from 'src/components/application/PersonalInfo';
import Address from 'src/components/application/Address';
import AdditionalInfo from 'src/components/application/AdditionalInfo';
import MoreInfo from 'src/components/application/MoreInfo';
import Billing from 'src/components/application/Billing';
import Checkout from 'src/components/application/Checkout';
import NetlifyStaticForm from 'src/components/application/NetlifyStaticForm';

import { formatEdges, calculatePrice } from 'src/utils/helpers';

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
	const [prices, setPrices] = useState([]);
	const [userData, setUserData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: '',
		gender: '',
		birthDate: '',
		citizenshipCountry: 'France',
		birthCountry: 'France',
		address: '',
		city: '',
		stateProvince: '',
		postalCode: '',
		addressCountry: '',
	});
	const [applicationData, setApplicationData] = useState({
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
	});

	const generalFeesData = formatEdges(data.generalFees);

	if (
		!prices.find(
			priceItem =>
				priceItem.type === 'general fees' &&
				priceItem.label.toLowerCase().includes('application fee')
		)
	) {
		const applicationFeeData = generalFeesData.find(generalFee =>
			generalFee.name.toLowerCase().includes('application fee')
		);

		prices.push({
			type: 'general fees',
			label: applicationFeeData.name,
			priceDetails: {
				price: applicationFeeData.priceDetails[0].price,
				duration: 1,
				payPeriod: applicationFeeData.priceDetails[0].payPeriod,
			},
		});

		setPrices(prices);
	}

	const [billingData, setBillingData] = useState({
		billingAddressCountry: 'France',
	});

	const [generalFeesTitle, setGeneralFeesTitle] = useState(null);

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
			console.log('handling an application change', {
				...applicationData,
				[name]: value,
			});
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
			console.log('application data', {
				...applicationData,
				...values,
			});
		}
	};

	return (
		// NOTE: There's a bug with stepwizard wherein it fails if you provide only one child
		<Section sectionClasses={['section']} containerClasses={['container']}>
			<NetlifyStaticForm
				formFields={[
					...Object.keys(userData),
					...Object.keys(applicationData),
					...Object.keys(billingData),
				]}
			/>

			{/* TODO: For some reason, the hash has stepped rendering in the URL bar? */}
			<StepWizard isHashEnabled={true} nav={<Steps stepsNum={6} />}>
				<PersonalInfo
					hashKey={'personal-info'}
					handleDataChange={handleDataChange}
					userData={userData}
					prices={prices}
					setPrices={setPrices}
					price={price}
					setPrice={setPrice}
					calculatePrice={calculatePrice}
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
					generalFeesData={data}
					userData={userData}
					handleDataChange={handleDataChange}
					handleBatchInputChange={handleBatchInputChange}
					prices={prices}
					setPrices={setPrices}
					price={price}
					setPrice={setPrice}
					calculatePrice={calculatePrice}
					applicationData={applicationData}
					setGeneralFeesTitle={setGeneralFeesTitle}
					currentCenter={currentCenter}
					setCurrentCenter={setCurrentCenter}
					currentProgram={currentProgram}
					setCurrentProgram={setCurrentProgram}
				/>
				<MoreInfo
					hashKey={'more-info'}
					userData={userData}
					handleDataChange={handleDataChange}
					prices={prices}
					setPrices={setPrices}
					price={price}
					setPrice={setPrice}
					calculatePrice={calculatePrice}
				/>
				<Billing
					hashKey={'billing'}
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
					generalFeesTitle={generalFeesTitle}
				/>
				<Checkout
					hashKey={'checkout'}
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
					generalFeesTitle={generalFeesTitle}
					currentCenter={currentCenter}
					currentProgram={currentProgram}
				></Checkout>
			</StepWizard>
		</Section>
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
