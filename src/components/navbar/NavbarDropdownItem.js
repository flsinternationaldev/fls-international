import React, { useRef, useState } from 'react';
import { Link, useStaticQuery } from 'gatsby';

import NavbarDropdown from 'src/components/navbar/NavbarDropdown';

import navbarStyles from 'src/components/navbar/Navbar.module.scss';

export default function NavbarDropdownItem({ dropdownItem, rootNavPath }) {
	const data = useStaticQuery(graphql`
		{
			allMarkdownRemark(
				limit: 1000
				filter: { fileAbsolutePath: { regex: "/pages//" } }
			) {
				edges {
					node {
						frontmatter {
							path
							pageName
						}
						fileAbsolutePath
					}
				}
			}
		}
	`);

	const sublinks = data.allMarkdownRemark.edges
		.filter(edge => {
			return edge.node.fileAbsolutePath.includes(
				dropdownItem.collectionName
			);
		})
		.map(sublink => sublink.node.frontmatter);

	const dropdownItemEl = useRef(null);

	const [isHovering, setIsHovering] = useState(false);
	const [dropdownWidth, setDropdownWidth] = useState(0);
	const [dropdownPos, setDropdownPos] = useState(0);

	let renderedDropdownItem;

	if (dropdownItem.collectionName && sublinks.length) {
		renderedDropdownItem = (
			<Link
				to={`/${rootNavPath}/${dropdownItem.path}`}
				className={`${navbarStyles.flsNav__dropdownItem}`}
				ref={dropdownItemEl}
				key={dropdownItem.pageName}
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
				<span>{dropdownItem.pageName}</span>

				<NavbarDropdown
					items={sublinks}
					dropdownPos={dropdownPos}
					dropdownWidth={dropdownWidth}
					isHovering={isHovering}
					rootNavPath={`${rootNavPath}/${dropdownItem.path}`}
				/>
			</Link>
		);
	} else {
		renderedDropdownItem = (
			<Link
				className={`${navbarStyles.flsNav__dropdownItem}`}
				key={dropdownItem.pageName}
				to={`/${rootNavPath}/${dropdownItem.path}`}
			>
				<span>{dropdownItem.pageName}</span>
			</Link>
		);
	}

	return renderedDropdownItem;
}
