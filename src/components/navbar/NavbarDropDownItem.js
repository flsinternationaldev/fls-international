import React, { useRef, useState } from 'react';
import { Link } from 'gatsby';

import NavbarDropdown from 'src/components/navbar/NavbarDropdown';

import navbarStyles from 'src/components/navbar/Navbar.module.scss';

export default function NavbarDropdownItem({ dropdownItem }) {
	const dropdownItemEl = useRef(null);
	const [isHoveringSubItem, setIsHoveringSubItem] = useState(false);

	let renderedDropdownItem;

	if (dropdownItem.items) {
		renderedDropdownItem = (
			<div
				className={`${navbarStyles.flsNav__dropdownItem}`}
				key={dropdownItem.name}
			>
				{/* TODO: Should, obviously, be links */}
				{/* <Link to="/programs-speciality-tours"> */}
				{dropdownItem.name}
				{/* </Link> */}

				<NavbarDropdown
					title={dropdownItem.title}
					parentEl={dropdownItemEl}
					items={dropdownItem.items}
					isSubMenu={true}
					isHovering={isHoveringSubItem}
				/>
			</div>
		);
	} else {
		renderedDropdownItem = (
			<div
				className={`${navbarStyles.flsNav__dropdownItem}`}
				key={dropdownItem.name}
			>
				{/* TODO: Should, obviously, be links */}
				{/* <Link to="/programs-speciality-tours"> */}
				{dropdownItem.name}
			</div>
		);
	}

	return renderedDropdownItem;
}
