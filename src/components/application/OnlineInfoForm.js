import React, { useState, Fragment } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { RadioGroup, Radio } from 'react-radio-group';
import ReactTooltip from 'react-tooltip';
import { useStaticQuery, graphql } from 'gatsby';
import Checkbox from 'rc-checkbox';

import EstimatedPrices from 'src/components/application/EstimatedPrices';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import {
	kebabToCamel,
	formatEdges,
	updatePrices,
	removePrices,
} from 'src/utils/helpers';

// TODO: Figure out a better way to implement this data
let airportData;

export default function OnlineInfoForm() {
	const data = useStaticQuery(graphql`
		{
			locations: allMarkdownRemark(
				limit: 1000
				filter: { fileAbsolutePath: { regex: "/data/locations/" } }
			) {
				edges {
					node {
						frontmatter {
							name
							centerName
						}
					}
				}
			}
			housing: allMarkdownRemark(
				limit: 1000
				filter: { fileAbsolutePath: { regex: "/data/housing/" } }
			) {
				edges {
					node {
						frontmatter {
							name
							centerNameRelation
							priceDetails {
								payPeriod
								price
							}
						}
					}
				}
			}
			inPerson: allMarkdownRemark(
				limit: 1000
				filter: {
					fileAbsolutePath: { regex: "/data/programs/in-person//" }
				}
			) {
				edges {
					node {
						frontmatter {
							name
							centerNameRelation
							durationOptions {
								maxWeeks
								exceedMaxWeeks
								weekThresholds {
									pricePerWeek
									thresholdMax
								}
							}
							hoursPerWeek
							lessonsPerWeek
							minutesPerLesson
						}
					}
				}
			}
			online: allMarkdownRemark(
				limit: 1000
				filter: {
					fileAbsolutePath: { regex: "/data/programs/online//" }
				}
			) {
				edges {
					node {
						frontmatter {
							name
							programDetails {
								lessonsPerWeek
								hoursPerWeek
							}
							hero_image
							durationOptions {
								maxWeeks
								weekThresholds {
									pricePerWeek
									thresholdMax
								}
							}
							hoursPerWeek
							lessonsPerWeek
							minutesPerLesson
						}
					}
				}
			}
			specialtyTours: allMarkdownRemark(
				limit: 1000
				filter: {
					fileAbsolutePath: {
						regex: "/data/programs/specialty-tours//"
					}
				}
			) {
				edges {
					node {
						frontmatter {
							name
							programDetails {
								lessonsPerWeek
								hoursPerWeek
							}
							hero_image
							durationOptions {
								maxWeeks
								weekThresholds {
									pricePerWeek
									thresholdMax
								}
							}
							hoursPerWeek
							lessonsPerWeek
							minutesPerLesson
						}
					}
				}
			}
			enhancements: allMarkdownRemark(
				limit: 1000
				filter: { fileAbsolutePath: { regex: "/data/enhancements//" } }
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
							notes
						}
					}
				}
			}
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
	return <div>online</div>;
}
