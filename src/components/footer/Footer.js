import React, { Fragment } from 'react';

import footerStyles from './Footer.module.scss';

// TODO: These will likely come in from the CMS
import ceaLogo from '../../img/cea-logo.png';
import bppeLogo from '../../img/bppe-logo.png';
import englishUsLogo from '../../img/english-us-icon.png';

const footer = () => {
	return (
		<Fragment>
			<footer className="footer">
				<div className={footerStyles.footer__established}>
					Established in 1986
				</div>

				<div className="container">
					<div className="columns is-centered">
						<div className="column">
							<h3 className={footerStyles.footer__title}>
								FLS International
							</h3>

							<p
								className={`${footerStyles.footer__copy} ${footerStyles.footer__item}`}
							>
								680 E Colorado Blvd Suite 180 Second Floor
								Pasadena, CA 91101
							</p>
							<p
								className={`${footerStyles.footer__copy} ${footerStyles.footer__item}`}
							>
								(626) 795-2912
							</p>
							<p
								className={`${footerStyles.footer__copy} ${footerStyles.footer__item}`}
							>
								info@fls.net
							</p>
						</div>

						<div className={`column ${footerStyles.footer__info}`}>
							<h3 className={footerStyles.footer__title}>
								Information
							</h3>

							<ul
								className={`columns is-multiline ${footerStyles.footer__copy}`}
							>
								<li
									className={`column is-half ${footerStyles.footer__listItem}`}
								>
									{/* TODO: Replace these chevrons with icons */}
									<a
										href="#"
										className="fls__link fls__link--alt"
									>
										&gt; Home
									</a>
								</li>
								<li
									className={`column is-half ${footerStyles.footer__listItem}`}
								>
									<a
										href="#"
										className="fls__link fls__link--alt"
									>
										&gt; Programs
									</a>
								</li>
								<li
									className={`column is-half ${footerStyles.footer__listItem}`}
								>
									<a
										href="#"
										className="fls__link fls__link--alt"
									>
										&gt; Locations
									</a>
								</li>
								<li
									className={`column is-half ${footerStyles.footer__listItem}`}
								>
									<a
										href="#"
										className="fls__link fls__link--alt"
									>
										&gt; BPPE Resources
									</a>
								</li>
								<li
									className={`column is-half ${footerStyles.footer__listItem}`}
								>
									<a
										href="#"
										className="fls__link fls__link--alt"
									>
										&gt; FLS Level Correlations
									</a>
								</li>
								<li
									className={`column is-half ${footerStyles.footer__listItem}`}
								>
									<a
										href="#"
										className="fls__link fls__link--alt"
									>
										&gt; Academic Calendar
									</a>
								</li>
							</ul>
						</div>

						<div className="column">
							<div className={footerStyles.footer__affiliations}>
								<a href="#">
									{/* TODO: Need grey scale images with backgrounds here */}
									<img src={ceaLogo} alt="CEA logo" />
								</a>

								<a href="#">
									<img src={bppeLogo} alt="BPPE logo" />
								</a>

								<a href="#">
									<img
										src={englishUsLogo}
										alt="English US logo"
									/>
								</a>
							</div>

							<div className={footerStyles.footer__social}>
								{/* TODO: Figure this out once the icon service has been determined */}
							</div>
						</div>
					</div>
				</div>
			</footer>

			<div className={`footer ${footerStyles.footer__legal}`}>
				<div className="container">
					<div className="columns is-centered">
						<div className="column">
							<p>
								Copyright © 2020 FLS International | Site Design
								& Development by{' '}
								<a
									href="https://akingdebased.github.io/"
									target="_blank"
								>
									Gabriel Gonzalvez
								</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default footer;
