import React, { useRef, useState } from 'react';
import { Link } from 'gatsby';

import navbarStyles from 'src/components/navbar/Navbar.module.scss';

// import NavbarDropdownItem from 'src/components/navbar/NavbarDropdown';

import NavbarDropdownItem from 'src/components/navbar/NavbarDropdownItem';

export default function NavbarDropdown({
	isHovering,
	dropdownPos,
	dropdownWidth,
	items,
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
				// <div key={dropdownItem.name}>{dropdownItem.name}</div>
				// <NavbarDropdownItem></NavbarDropdownItem>
				<NavbarDropdownItem dropdownItem={dropdownItem} />
			))}
		</div>
	);
}
