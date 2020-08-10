import React from 'react';

import Layout from '../../components/Layout';
import PostNavbar from '../../components/post-navbar/PostNavbar';

export const ProgramsPostTemplate = () => {
	return (
		<section className="section programs">
			<div className="container">
				<div className="columns is-multiline">
					<div className="column is-3-desktop is-full-tablet">
						<div className="columns is-multiline">
							<PostNavbar />
							<div className="column is-full-desktop is-half-tablet">
								<div className="fls__testimonial fls__testimonial--programs">
									<img
										src="../../img/testimonial-avatar.jpeg"
										alt="testimonial avatar"
										className="fls__testimonial-avatar"
									/>
									<p className="fls__testimonial-copy">
										I like everything about this program.
										When I get home it will help me to get a
										job!
									</p>
									<div className="fls__testimonial-subcopy">
										<span>AHMED</span> -{' '}
										<span className="fls--red">
											Saudi Arabia
										</span>
										<a
											href=""
											className="fls__link fls__link--alt fls--red fls__testimonial-read-more"
										>
											Read more
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="column is-9-desktop is-full-tablet">
						<div className="columns is-multiline">
							<div className="column is-full">
								<h2 className="programs__post-title">
									High School & University Placement
								</h2>
							</div>
							<div className="column is-full">
								<div className="programs__post-carousel">
									<img
										src="../../img/sample-post-image.jpeg"
										alt="sample post image"
									/>
								</div>
							</div>
							{/* TODO: Derive all this from CMS */}
							<div className="column is-half">
								<p>
									The key to a successful future starts with
									acceptance into the right school. Through
									the programs offered at FLS International,
									students who might have difficulty gaining
									acceptance from their preferred schools can
									benefit from college placement into top
									universities so that they have the greatest
									educational tools to help them advance.
								</p>
							</div>
							<div className="column is-half">
								<img
									src="../../img/upp-post-image.jpg"
									alt="universal placement program image"
								/>
							</div>
							<div className="column is-full">
								<a href="http://www.uppcolleges.com/">
									Click here to learn more about Universal
									Placement Program
								</a>
							</div>
							<div className="column is-full">
								<p>
									The Universal Placement Program (UPP), in
									partnership with FLS, has helped thousands
									of students with college placement. As a
									result, they gained acceptance into some of
									the best private high schools, colleges, and
									universities in the USA through a simple and
									fast application service. UPP placement
									advisors work closely with students to help
									them find the right schools and reach their
									educational goals in the fastest, most
									effective way possible.
								</p>
							</div>
							<div className="column is-full">
								<img
									src="../../img/upp-post-image-2.png"
									alt="universal placement program image 2"
								/>
							</div>
							<div className="column is-full">
								<p>
									With a vast selection of partner schools,
									UPP can find the right fit for any student
									looking for university placement.
								</p>
							</div>
							<div className="column is-full">
								<div className="programs__post-copy-container programs__post-copy-container--alt">
									<h3 className="fls__post-title">
										Free Placement Services
									</h3>
									<p>
										Students who enroll in an FLS Intensive
										English Program for 8 weeks or more
										receive UPP Regular or ASY Placement
										Service for one U.S. school for FREE!
									</p>

									<h3 className="fls__post-title">
										Simple Application Process
									</h3>
									<p>
										The UPP Application Form is used to
										apply to hundreds of great schools
										throughout the United States for fast
										and easy university placement. In fact,
										school acceptance through the UPP
										program is faster and easier than
										through any other method. Advisors work
										closely with school admissions staff
										throughout the application and placement
										process to get students quickly accepted
										to the school of their choice.
									</p>

									<h3 className="fls__post-title">
										CONDITIONAL ADMISSION TO COLLEGE AND
										UNIVERSITY
									</h3>
									<p>
										Many UPP colleges, universities and
										graduate programs offer conditional
										admission to students before they reach
										the required English proficiency level
										allowing students to enter their ESL
										program confident in their future
										educational path. Conditional admission
										is the best way for many students to get
										their foot in the door of the right
										college.
									</p>
								</div>
								<div className="programs__post-copy-container">
									<h3 className="fls__post-title">
										NO TOEFL EXAM REQUIRED FOR COLLEGE
										ADMISSION
									</h3>
									<p>
										FLS International students are able to
										get accepted to many UPP colleges and
										universities without taking the TOEFL
										exam. College and university placement
										has never been easier!
									</p>

									<h3 className="fls__post-title">
										GUARANTEED SCHOOL ACCEPTANCE
									</h3>
									<p>
										UPP guarantees acceptance to at least
										one of their partner schools for any
										student.
									</p>

									<h3 className="fls__post-title">
										HIGH SCHOOL PLACEMENT
									</h3>
									<p>
										The US is world-renowned for its
										secondary educational system. UPP
										proudly offers a robust high school
										placement program with great schools on
										both coasts and select cities
										in-between. Our network of private high
										schools offer comprehensive programs for
										all types of students with a focus on
										college placement. Options include both
										International Baccalaureate (IB) schools
										as well as traditional high schools
										offering a full cohort of AP classwork.
										Our high schools can accept students for
										anything from one year programs all the
										way up to the full 4-year high school
										experience.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

const HighSchoolUniversityPlacementPage = ({ data }) => {
	// const { frontmatter } = data.markdownRemark;

	console.log('data from query', data);
	return (
		<Layout isScrolled={true} hasNavHero={true} pageTitle={'Programs'}>
			<ProgramsPostTemplate />
		</Layout>
	);
};

export default HighSchoolUniversityPlacementPage;

// TODO: Here, all the individual fields are specified.
// Is there a way to just say 'get all fields'?
// export const pageQuery = graphql`
// 	query {
// 		markdownRemark {
// 			frontmatter {
// 				program_cards {
// 					card_description
// 					card_image
// 					card_title
// 				}
// 			}
// 		}
// 	}
// `;
