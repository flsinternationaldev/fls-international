import React, { useState, useRef, Fragment } from 'react';
import { Link, useStaticQuery } from 'gatsby';

import navbarStyles from './Navbar.module.scss';
import 'hamburgers/dist/hamburgers.css';

export default function Navbar({ isMobileMenuOpen, mobileDropdownPos }) {
	console.log('mobileDropdownPos', mobileDropdownPos);
	return (
		<nav
			className={`${navbarStyles.flsNav__mobile} ${
				isMobileMenuOpen ? 'fls__show' : 'fls__hide'
			}`}
			style={mobileDropdownPos}
		>
			<div className="fls-nav__mobile-container">
				<h2
					className={`${navbarStyles.flsNav__mobileHeader} fls--light-blue`}
				>
					Programs
				</h2>

				<h3
					className={`${navbarStyles.flsNav__mobileItemHeader} fls--light-blue`}
				>
					In Person
				</h3>

				<div className="columns is-multiline is-mobile">
					<div className="column is-half">
						<span className={navbarStyles.flsNav__mobileItem}>
							Vacation English
						</span>
					</div>

					<div className="column is-half">
						<span className={navbarStyles.flsNav__mobileItem}>
							Intensive English
						</span>
					</div>

					<div className="column is-half">
						<span className={navbarStyles.flsNav__mobileItem}>
							Express Business English
						</span>
					</div>
				</div>
			</div>
		</nav>
	);
}
