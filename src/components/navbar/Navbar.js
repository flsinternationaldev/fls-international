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
							name
							collectionName
							order
							links {
								collectionName
								name
								path
							}
						}
						fileAbsolutePath
					}
				}
			}
		}
	`);

	const mainNavItems = data.allMarkdownRemark.edges.map(edge => {
		return {
			...edge.node.frontmatter,
			fileAbsolutePath: edge.node.fileAbsolutePath,
		};
	});

	mainNavItems.sort((a, b) => a.order - b.order);

	/* TODO: This is a less way to get the program category links (speciality tours, online, in-person) to
	 link to the /programs page using a "#" instead of "/". This is because I'm using hash routing on the 
	 programs page so that the programs can be filtered in a "single page app" style. */
	mainNavItems.forEach(mainNavItem => {
		if (
			mainNavItem.links &&
			mainNavItem.fileAbsolutePath.includes('programs')
		)
			mainNavItem.links.forEach(link => (link.isProgramCategory = true));
	});

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
							className={`hamburger hamburger--spin ${
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
							<span className="hamburger-box">
								<span
									className={`hamburger-inner ${navbarStyles.hamburgerInnerFls}`}
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
											title={mainNavItem.name}
											items={mainNavItem.links}
											rootNavPath={`/${mainNavItem.path}`}
											parentEl={navParentEl}
											key={`/${mainNavItem.path}`}
										></NavbarDropdownContainer>
									);
								} else {
									return (
										<Link
											to={`/${mainNavItem.path}`}
											className={
												navbarStyles.navbar__navItem
											}
											key={`/${mainNavItem.path}`}
										>
											{mainNavItem.name}
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
