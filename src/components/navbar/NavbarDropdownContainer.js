import React, { useState, useRef, Fragment } from 'react';
import { Link, useStaticQuery } from 'gatsby';

import navbarStyles from 'src/components/navbar/Navbar.module.scss';

import NavbarDropdown from 'src/components/navbar/NavbarDropdown';

export default function NavbarDropdownContainer({
	title,
	items,
	parentEl,
	rootNavPath,
	mainNavItem,
}) {
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

	if (mainNavItem.collectionName) {
		items = data.allMarkdownRemark.edges
			.filter(edge => {
				return edge.node.fileAbsolutePath.includes(
					mainNavItem.collectionName
				);
			})
			.map(sublink => {
				return {
					...sublink.node.frontmatter,
					fileAbsolutePath: sublink.node.fileAbsolutePath,
				};
			});
	}

	const [isHoveringDropdown, setIsHoveringDropdown] = useState(false);
	const [dropdownPos, setDropdownPos] = useState(0);
	const [dropdownWidth, setDropdownWidth] = useState(0);

	const dropdownContainerEl = useRef(null);

	// TODO: Figure out why the dropdown is slightly offset
	return (
		<Link
			to={`${rootNavPath}`}
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
			<span>{title}</span>

			<NavbarDropdown
				isHovering={isHoveringDropdown}
				dropdownPos={dropdownPos}
				dropdownWidth={dropdownWidth}
				items={items}
				rootNavPath={rootNavPath}
			/>
		</Link>
	);
}
