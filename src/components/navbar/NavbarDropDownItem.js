import React, { useRef, useState } from 'react';
import { Link } from 'gatsby';

import NavbarDropdown from 'src/components/navbar/NavbarDropdown';

import navbarStyles from 'src/components/navbar/Navbar.module.scss';

export default function NavbarDropdownItem({ dropdownItem }) {
	const dropdownItemEl = useRef(null);

	const [isHovering, setIsHovering] = useState(false);
	const [dropdownWidth, setDropdownWidth] = useState(0);
	const [dropdownPos, setDropdownPos] = useState(0);

	let renderedDropdownItem;

	if (dropdownItem.items) {
		renderedDropdownItem = (
			<div
				className={`${navbarStyles.flsNav__dropdownItem}`}
				ref={dropdownItemEl}
				key={dropdownItem.name}
				onMouseEnter={() => {
					let newDropdownPos = {};

					newDropdownPos.left =
						dropdownItemEl.current.getBoundingClientRect().left +
						dropdownItemEl.current.offsetWidth;

					newDropdownPos.top = dropdownItemEl.current.getBoundingClientRect().top;

					setDropdownWidth(dropdownItemEl.current.offsetWidth);
					setDropdownPos(newDropdownPos);
					setIsHovering(true);
				}}
				onMouseLeave={() => {
					setIsHovering(false);
				}}
			>
				{/* TODO: Should, obviously, be links */}
				{/* <Link to="/programs-speciality-tours"> */}
				{dropdownItem.name}
				{/* </Link> */}

				<NavbarDropdown
					items={dropdownItem.items}
					dropdownPos={dropdownPos}
					dropdownWidth={dropdownWidth}
					isHovering={isHovering}
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
