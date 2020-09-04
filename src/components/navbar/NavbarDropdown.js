import React, { useState } from 'react';
import { Link } from 'gatsby';

import navbarStyles from './Navbar.module.scss';

export default function NavbarDropdown({ title, items }) {
	const [isHoveringDropdown, setIsHoveringDropdown] = useState(false);

	return (
		<li
			onMouseEnter={() => setIsHoveringDropdown(true)}
			onMouseLeave={() => setIsHoveringDropdown(false)}
			className={navbarStyles.flsNav__dropdownContainer}
		>
			<Link to="/programs-speciality-tours">{title}</Link>

			<div
				className={`${navbarStyles.flsNav__dropdown} ${
					isHoveringDropdown ? 'fls__show' : 'fls__hide'
				}`}
			>
				{items.map(dropdownItem => (
					<div className={`${navbarStyles.flsNav__dropdownItem}`}>
						{/* TODO: Should, obviously, be links */}
						{/* <Link to="/programs-speciality-tours"> */}
						{dropdownItem.name}
						{/* </Link> */}
					</div>
				))}
			</div>
		</li>
	);
}
