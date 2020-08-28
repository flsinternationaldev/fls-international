import React, { useState } from 'react';
import StepWizard from 'react-step-wizard';
import { graphql } from 'gatsby';

import Layout from 'src/components/Layout';
import Section from 'src/components/section/Section';
import Steps from 'src/components/steps/Steps';
import PersonalInfo from 'src/components/application/PersonalInfo';
import Address from 'src/components/application/Address';
import AdditionalInfo from 'src/components/application/AdditionalInfo';
import MoreInfo from 'src/components/application/MoreInfo';
import Billing from 'src/components/application/Billing';
import NetlifyStaticForm from 'src/components/application/NetlifyStaticForm';

export const ApplicationTemplate = () => {
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
		flsCenter: '',
		duration: '',
		startDate: '',
		endDate: '',
		housingType: '',
		program: '',
		extraNights: '',
		checkInDate: '',
		checkOutDate: '',
		airport: '',
		airportPickUp: false,
		airPortDropOff: false,
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
		// TODO: Figure out passport photo & financial document image upload
	});
	const [billingData, setBillingData] = useState({
		billingAddressCountry: 'France',
	});

	// TODO: Because this is async, we should probably create a flag to prevent form submission until state has updated
	const handleInputChange = (name, value, type) => {
		if (type === 'user') {
			setUserData({
				...userData,
				[name]: value,
			});
		} else if (type === 'billing') {
			console.log('billingData!', billingData);
			setBillingData({
				...billingData,
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
		}
	};

	const calculatePrice = prices => {
		if (prices.length) {
			return prices.reduce((total, price) => {
				total += price.cost;
				return total;
			}, 0);
		} else {
			return 0;
		}
	};

	return (
		// TODO: There's a bug with stepwizard wherein it fails if you provide only one child
		<Section sectionClasses={['section']} containerClasses={['container']}>
			<NetlifyStaticForm
				formFields={[
					...Object.keys(userData),
					...Object.keys(applicationData),
					...Object.keys(billingData),
				]}
			/>
			<StepWizard isHashEnabled={true} nav={<Steps stepsNum={5} />}>
				<PersonalInfo
					hashKey={'personal-info'}
					handleInputChange={handleInputChange}
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
					handleInputChange={handleInputChange}
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
					handleInputChange={handleInputChange}
					prices={prices}
					setPrices={setPrices}
					price={price}
					setPrice={setPrice}
					calculatePrice={calculatePrice}
				/>
				<MoreInfo
					hashKey={'more-info'}
					userData={userData}
					handleInputChange={handleInputChange}
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
					handleInputChange={handleInputChange}
					handleBatchInputChange={handleBatchInputChange}
					prices={prices}
					setPrices={setPrices}
					price={price}
					setPrice={setPrice}
					calculatePrice={calculatePrice}
				/>
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

// TODO: It's likely this query can be better constructed, ideally to include filtering logic.
export const pageQuery = graphql`
	{
		allMarkdownRemark {
			edges {
				node {
					fileAbsolutePath
					frontmatter {
						name
						supplements {
							airport_transfers {
								airport_name
								cost
							}
							auditing {
								_4_week_cost
								additional_week_cost
							}
							concurrent_enrollment {
								per_3_unit_class
							}
							hs_completion_course {
								_4_week_cost
								additional_week_cost
							}
							hs_immersion {
								per_week_cost
							}
						}
						housing_fees {
							additional_notes
							cost_per_week
							housing_name
							meals_per_week
							non_refundable_deposit
						}
						programs {
							name
							exceed_max_weeks
							max_weeks
							week_thresholds {
								threshold_max
								lessons_per_week
								hours_per_week
								price_per_week
							}
						}
					}
				}
			}
		}
	}
`;
