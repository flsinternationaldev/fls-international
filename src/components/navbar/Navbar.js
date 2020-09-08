import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'gatsby';

import navbarStyles from './Navbar.module.scss';
import flsLogo from 'src/img/fls-international-logo.png';

import NavbarDropdownContainer from 'src/components/navbar/NavbarDropdownContainer';

export default function Navbar(props) {
	const [isScrolled, setIsScrolled] = useState(false);
	const [programsNavItems, setProgramsNavItems] = useState([
		{
			name: 'On-Site',
			items: [{ name: 'General English' }, { name: 'Vaction English' }],
		},
		{ name: 'Online' },
		{ name: 'Speciality Tours' },
	]);

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
			className={`navbar is-fixed-top ${navbarStyles.navbarFls} ${
				navbarStyles.navbarHome
			} ${isScrolled ? navbarStyles.navbarScrolled : ''}`}
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
					<div className="navbar-start">
						<div
							className={`tabs is-left 
							${navbarStyles.tabsFls} 
							${props.isHome ? navbarStyles.tabsHome : ''} 
							${isScrolled ? navbarStyles.tabsScrolled : navbarStyles.tabsFls}`}
						>
							<Link to="/">Home</Link>

							<NavbarDropdownContainer
								title={'Programs'}
								items={programsNavItems}
								parentEl={navParentEl}
							></NavbarDropdownContainer>

							{/* <NavbarDropdownContainer
								title={'Locations'}
								items={[
									{ name: 'Orange County' },
									{ name: 'Los Angeles' },
									{ name: 'Philadelphia' },
									{ name: 'New York City' },
									{ name: 'Haven' },
									{ name: 'Val Royeaux' },
								]}
								parentEl={navParentEl}
							></NavbarDropdownContainer> */}

							<Link to="/application">Application</Link>

							<Link to="/application">Testimonials</Link>

							<Link to="/about-us">About Us</Link>
						</div>

						<div
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
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
