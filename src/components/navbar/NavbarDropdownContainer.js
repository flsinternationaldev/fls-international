import React, { useState, useRef, Fragment } from 'react';
import { Link } from 'gatsby';

import navbarStyles from 'src/components/navbar/Navbar.module.scss';

import NavbarDropdown from 'src/components/navbar/NavbarDropdown';

export default function NavbarDropdownContainer({
	title,
	items,
	parentEl,
	rootNavPath,
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
			<Link to={`/${rootNavPath}`}>{title}</Link>

			<NavbarDropdown
				isHovering={isHoveringDropdown}
				dropdownPos={dropdownPos}
				dropdownWidth={dropdownWidth}
				items={items}
				rootNavPath={rootNavPath}
				key={rootNavPath}
			/>
		</div>
	);
}
