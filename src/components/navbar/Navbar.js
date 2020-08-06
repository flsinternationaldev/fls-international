import React, { useState, useEffect } from 'react';
import navbarStyles from './Navbar.module.scss';
import flsLogo from '../../img/fls-international-logo.png';

export default function Navbar(props) {
	const [isScrolled, setIsScrolled] = useState(false);

	// This React Hook allows us to set an event handler when the component mounts,
	// then remove it when the component is unmounted
	useEffect(() => {
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
	});

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
									<a href="offline-pages/programs.html">
										Programs
									</a>
								</li>
								<li>
									<a href="">Locations</a>
								</li>
								<li>
									<a href="">About Us</a>
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
									<a href="">Contact</a>
								</li>
								<li>
									<a href="">Downloads</a>
								</li>
								<li>
									<a href="">Login</a>
								</li>
								<li>
									<a href="">Translate</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
