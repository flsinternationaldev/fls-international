import React, { useRef, useState } from 'react';
import { Link, useStaticQuery } from 'gatsby';

import NavbarDropdown from 'src/components/navbar/NavbarDropdown';

import navbarStyles from 'src/components/navbar/Navbar.module.scss';

export default function NavbarDropdownItem({ dropdownItem, rootNavPath }) {
	// TODO: The dropdown items don't like overy long titles
	// Either find a way to expand each item, or implement a 'short name' field on the CMS

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
							name
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
		const url = dropdownItem.isProgramCategory
			? `${rootNavPath}#${dropdownItem.path}`
			: `${rootNavPath}/${dropdownItem.path}`;

		renderedDropdownItem = (
			<Link
				to={url}
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
				<span>{dropdownItem.name}</span>

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
		renderedDropdownItem = dropdownItem.isExternalLink ? (
			<a
				className={`${navbarStyles.flsNav__dropdownItem}`}
				key={dropdownItem.name}
				href={dropdownItem.path}
				target="_blank"
				onClick={() => {
					// TODO: This onClick is necessary because there are nested A tags here, and that is Very Dumb
					window.open(dropdownItem.path, '_blank');
				}}
			>
				<span>{dropdownItem.name}</span>
			</a>
		) : (
			<Link
				className={`${navbarStyles.flsNav__dropdownItem}`}
				key={dropdownItem.name}
				to={`${rootNavPath}/${dropdownItem.path}`}
			>
				<span>{dropdownItem.name}</span>
			</Link>
		);
	}

	return renderedDropdownItem;
}
