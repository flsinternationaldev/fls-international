import React, { useState, useRef, Fragment } from 'react';
import { Link } from 'gatsby';

import navbarStyles from 'src/components/navbar/Navbar.module.scss';

import NavbarDropdown from 'src/components/navbar/NavbarDropdown';

export default function NavbarDropdownContainer({
	title,
	items,
	parentEl,
	isSubMenu,
}) {
	const [isHoveringDropdown, setIsHoveringDropdown] = useState(false);
	const [dropdownPos, setDropdownPos] = useState(0);
	const [dropdownWidth, setDropdownWidth] = useState(0);

	const dropdownContainerEl = useRef(null);

	return (
		<div
			className={navbarStyles.navbar__navItem}
			onMouseEnter={() => {
				let newDropdownPos = {};

				if (isSubMenu) {
					newDropdownPos.left =
						parentEl.current.getBoundingClientRect().left +
						parentEl.current.offsetWidth;
				}

				newDropdownPos.top =
					parentEl.current.getBoundingClientRect().top +
					parentEl.current.offsetHeight;

				setDropdownWidth(dropdownContainerEl.current.offsetWidth);
				setDropdownPos(newDropdownPos);
				setIsHoveringDropdown(true);
			}}
			onMouseLeave={() => {
				setIsHoveringDropdown(false);
			}}
			ref={dropdownContainerEl}
		>
			{/* TODO: Needs to be a dynamic link */}
			<Link to="/programs-speciality-tours">{title}</Link>

			<NavbarDropdown
				isHovering={isHoveringDropdown}
				dropdownPos={dropdownPos}
				dropdownWidth={dropdownWidth}
				items={items}
			/>
		</div>
	);
}
