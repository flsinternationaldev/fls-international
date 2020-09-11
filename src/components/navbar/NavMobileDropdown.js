import React from 'react';
import { useStaticQuery } from 'gatsby';

import navbarStyles from './Navbar.module.scss';

import NavbarMobileCollapsibleSubsection from './NavbarMobileCollapsibleSubsection';

export default function Navbar({
	mainNavItem,
	rootNavPath,
	isSubItem,
	isCollapsed,
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
							pageName
						}
						fileAbsolutePath
					}
				}
			}
		}
	`);

	let items = mainNavItem.links;

	if (mainNavItem.collectionName) {
		items = data.allMarkdownRemark.edges
			.filter(edge => {
				return edge.node.fileAbsolutePath.includes(
					mainNavItem.collectionName
				);
			})
			.map(sublink => sublink.node.frontmatter);
	}

	const handleRenderingItems = () => {
		let renderedItems;

		if (isSubItem) {
			renderedItems = (
				<div
					className={`columns is-multiline is-mobile ${
						navbarStyles.flsNav__collapsibleContainer
					} ${isCollapsed ? 'fls--collapsed' : ''}`}
				>
					{items.map(item => (
						<NavbarMobileCollapsibleSubsection
							item={item}
							isSubItem={isSubItem}
							rootNavPath={rootNavPath}
						/>
					))}
				</div>
			);
		} else {
			// TODO: This 'collapsible' logic is likely better implemented with a wrapper or higher order component pattern
			renderedItems = (
				<div
					className={`${navbarStyles.flsNav__collapsibleContainer} ${
						isCollapsed ? 'fls--collapsed' : ''
					}`}
				>
					{items.map(item => (
						<NavbarMobileCollapsibleSubsection
							item={item}
							rootNavPath={rootNavPath}
							isSubItem={false}
						/>
					))}
				</div>
			);
		}

		return renderedItems;
	};

	return handleRenderingItems();
}
