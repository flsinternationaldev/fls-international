import React from 'react';
import { Link } from 'gatsby';

import navbarStyles from 'src/components/navbar/Navbar.module.scss';

import NavbarDropdownItem from 'src/components/navbar/NavbarDropdownItem';

export default function NavbarDropdown({
	isHovering,
	dropdownPos,
	dropdownWidth,
	items = [],
}) {
	return (
		<div
			className={`${navbarStyles.flsNav__dropdown} ${
				isHovering ? 'fls__show' : 'fls__hide'
			}`}
			style={{
				...dropdownPos,
				width: dropdownWidth,
			}}
		>
			{items.map(dropdownItem => (
				<NavbarDropdownItem dropdownItem={dropdownItem} />
			))}
		</div>
	);
}
