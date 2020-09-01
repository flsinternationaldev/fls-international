import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';

import navbarStyles from './Navbar.module.scss';
import flsLogo from 'src/img/fls-international-logo.png';

export default function Navbar(props) {
	const [isScrolled, setIsScrolled] = useState(false);

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
			className={`navbar is-fixed-top ${navbarStyles.navbarFls} ${
				navbarStyles.navbarHome
			} ${isScrolled ? navbarStyles.navbarScrolled : ''}`}
		>
			<div className="container">
				<div id="navbarMenu" className="navbar-menu">
					<div className="navbar-start">
						<div
							className={`tabs is-left 
							${navbarStyles.tabsFls} 
							${props.isHome ? navbarStyles.tabsHome : ''} 
							${isScrolled ? navbarStyles.tabsScrolled : navbarStyles.tabsFls}`}
						>
							<ul>
								<li>
									<a href="">Home</a>
								</li>
								<li>
									<Link to="/programs">Programs</Link>
								</li>
								<li>
									<Link to="/locations">Locations</Link>
								</li>
								<li>
									<Link to="/about-us">About Us</Link>
								</li>
							</ul>
						</div>
					</div>

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

					<div className="navbar-end">
						<div
							className={`tabs is-right 							
							${navbarStyles.tabsFls} 
							${props.isHome ? navbarStyles.tabsHome : ''} 
							${isScrolled ? navbarStyles.tabsScrolled : navbarStyles.tabsFls}`}
						>
							<ul>
								<li>
									<Link to="/contact">Contact</Link>
								</li>
								<li>
									<Link to="/downloads">Downloads</Link>
								</li>
								<li>
									<Link to="/login">Login</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
