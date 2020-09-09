import React, { useState, useEffect, useRef } from 'react';
import { Link, useStaticQuery } from 'gatsby';

import navbarStyles from './Navbar.module.scss';
import flsLogo from 'src/img/fls-international-logo.png';

import NavbarDropdownContainer from 'src/components/navbar/NavbarDropdownContainer';

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

	const [isScrolled, setIsScrolled] = useState(false);

	const navParentEl = useRef(null);

	// This React Hook allows us to set an event handler when the component mounts,
	// then remove it when the component is unmounted
	useEffect(() => {
		if (props.isHome) {
			const navbarEl = document.querySelector('.navbar'),
				colorChangePoint = navbarEl.offsetTop,
				handleScroll = () => {
					window.pageYOffset > colorChangePoint
						? setIsScrolled(true)
						: setIsScrolled(false);
				};

			window.addEventListener('scroll', handleScroll);

			return () => {
				window.removeEventListener('scroll', handleScroll);
			};
		} else {
			setIsScrolled(true);
		}
	}, []);

	return (
		<nav
			className={`navbar is-fixed-top ${navbarStyles.navbarFls}`}
			ref={navParentEl}
		>
			<div className="container">
				<div className="navbar-brand">
					<a className="navbar-item" href="../">
						<img
							className={navbarStyles.navbar__logo}
							src={flsLogo}
							alt="Logo"
						/>
					</a>
					{/* TODO: Still need a mobile implementation for the navbar */}
					<span
						className="navbar-burger burger"
						data-target="navbarMenu"
					>
						<span></span>
						<span></span>
						<span></span>
					</span>
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
										rootNavPath={mainNavItem.path}
										parentEl={navParentEl}
									></NavbarDropdownContainer>
								);
							} else {
								return (
									<Link
										to={`/${mainNavItem.path}`}
										className={navbarStyles.navbar__navItem}
									>
										{mainNavItem.pageName}
									</Link>
								);
							}
						})}
						{/* 
							<Link to="/application">Application</Link>

							<Link to="/application">Testimonials</Link>

							<Link to="/about-us">About Us</Link> */}
					</div>

					{/* <div
							className={`tabs is-right 							
							${navbarStyles.tabsFls} 
							${props.isHome ? navbarStyles.tabsHome : ''} 
							${isScrolled ? navbarStyles.tabsScrolled : navbarStyles.tabsFls}`}
						>
							<div>
								<Link to="/contact">Contact</Link>

								<Link to="/downloads">Downloads</Link>

								<Link to="/login">Login</Link>
							</div>
						</div> */}
				</div>
			</div>
		</nav>
	);
}
