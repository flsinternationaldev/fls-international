import React, { useState, useRef, Fragment } from 'react';
import { Link, useStaticQuery } from 'gatsby';

import navbarStyles from './Navbar.module.scss';
import flsLogo from 'src/img/fls-international-logo.png';
import 'hamburgers/dist/hamburgers.css';

import NavbarDropdownContainer from 'src/components/navbar/NavbarDropdownContainer';
import NavbarMobile from 'src/components/navbar/NavbarMobile';

export default function Navbar(props) {
	const data = useStaticQuery(graphql`
		{
			allMarkdownRemark(
				limit: 1000
				filter: { fileAbsolutePath: { regex: "/navbar-items//" } }
			) {
				edges {
					node {
						frontmatter {
							path
							pageName
							collectionName
							order
							links {
								collectionName
								pageName
								path
							}
						}
					}
				}
			}
		}
	`);

	const mainNavItems = data.allMarkdownRemark.edges.map(
		edge => edge.node.frontmatter
	);

	mainNavItems.sort((a, b) => a.order - b.order);

	const navParentEl = useRef(null);

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	// TODO: This state, and its logic, is a near duplicate of the desktop nav's position logic. Could be consolidated?
	const [mobileDropdownPadding, setMobileDropdownPadding] = useState({
		top: 0,
	});

	return (
		<Fragment>
			<nav
				className={`navbar is-fixed-top ${navbarStyles.navbarFls}`}
				ref={navParentEl}
			>
				<div className="container">
					<div
						className={`navbar-brand ${navbarStyles.navbarBrandFls}`}
					>
						<a className="navbar-item" href="/">
							<img
								className={navbarStyles.navbar__logo}
								src={flsLogo}
								alt="Logo"
							/>
						</a>

						<button
							class={`hamburger hamburger--spin ${
								navbarStyles.hamburgerFls
							} ${isMobileMenuOpen ? 'is-active' : ''} `}
							onClick={() => {
								let newDropdownPadding = {};

								newDropdownPadding['padding-top'] =
									navParentEl.current.getBoundingClientRect()
										.top + navParentEl.current.offsetHeight;

								setMobileDropdownPadding(newDropdownPadding);
								setIsMobileMenuOpen(prevState => !prevState);
							}}
							type="button"
						>
							<span class="hamburger-box">
								<span
									class={`hamburger-inner ${navbarStyles.hamburgerInnerFls}`}
								></span>
							</span>
						</button>
					</div>

					<div id="navbarMenu" className="navbar-menu">
						<div className={navbarStyles.flsNav__content}>
							{mainNavItems.map(mainNavItem => {
								if (
									mainNavItem.links ||
									mainNavItem.collectionName
								) {
									return (
										<NavbarDropdownContainer
											mainNavItem={mainNavItem}
											title={mainNavItem.pageName}
											items={mainNavItem.links}
											rootNavPath={`/${mainNavItem.path}`}
											parentEl={navParentEl}
										></NavbarDropdownContainer>
									);
								} else {
									return (
										<Link
											to={`/${mainNavItem.path}`}
											className={
												navbarStyles.navbar__navItem
											}
										>
											{mainNavItem.pageName}
										</Link>
									);
								}
							})}
						</div>
					</div>
				</div>
			</nav>

			<NavbarMobile
				mobileDropdownPadding={mobileDropdownPadding}
				isMobileMenuOpen={isMobileMenuOpen}
				mainNavItems={mainNavItems}
			/>
		</Fragment>
	);
}
