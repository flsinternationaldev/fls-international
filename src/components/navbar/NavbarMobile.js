import React, { Fragment } from 'react';
import { Link } from 'gatsby';

import navbarStyles from './Navbar.module.scss';
import 'hamburgers/dist/hamburgers.css';

import NavbarMobileCollapsibleSection from 'src/components/navbar/NavbarMobileCollapsibleSection';

export default function Navbar({
	isMobileMenuOpen,
	mobileDropdownPadding,
	mainNavItems,
}) {
	return (
		<nav
			className={`${navbarStyles.flsNav__mobile} ${
				isMobileMenuOpen ? 'fls__show' : 'fls__hide'
			}`}
			style={mobileDropdownPadding}
		>
			<div className="fls-nav__mobile-container">
				<div className="columns is-multiline ">
					{mainNavItems.map(mainNavItem => {
						if (mainNavItem.links || mainNavItem.collectionName) {
							return (
								<NavbarMobileCollapsibleSection
									mainNavItem={mainNavItem}
								/>
							);
						} else {
							return (
								<div
									className="column is-full"
									style={{
										paddingBottom: 0,
									}}
								>
									<Link
										to={`/${mainNavItem.path}`}
										className={`${navbarStyles.flsNav__mobileHeader} fls--white`}
									>
										{mainNavItem.name}
									</Link>
								</div>
							);
						}
					})}
				</div>
			</div>
		</nav>
	);
}
