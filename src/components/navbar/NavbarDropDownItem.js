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
							page_name
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
				dropdownItem.collection_name
			);
		})
		.map(sublink => sublink.node.frontmatter);

	const dropdownItemEl = useRef(null);

	const [isHovering, setIsHovering] = useState(false);
	const [dropdownWidth, setDropdownWidth] = useState(0);
	const [dropdownPos, setDropdownPos] = useState(0);

	let renderedDropdownItem;

	if (dropdownItem.collection_name && sublinks.length) {
		renderedDropdownItem = (
			<div
				className={`${navbarStyles.flsNav__dropdownItem}`}
				ref={dropdownItemEl}
				key={dropdownItem.page_name}
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
				<Link to={`/${rootNavPath}/${dropdownItem.path}`}>
					{dropdownItem.page_name}
				</Link>

				<NavbarDropdown
					items={sublinks}
					dropdownPos={dropdownPos}
					dropdownWidth={dropdownWidth}
					isHovering={isHovering}
					rootNavPath={`${rootNavPath}/${dropdownItem.path}`}
				/>
			</div>
		);
	} else {
		renderedDropdownItem = (
			<div
				className={`${navbarStyles.flsNav__dropdownItem}`}
				key={dropdownItem.page_name}
			>
				<Link to={`/${rootNavPath}/${dropdownItem.path}`}>
					{dropdownItem.page_name}
				</Link>
			</div>
		);
	}

	return renderedDropdownItem;
}
