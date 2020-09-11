// TODO: This collapsible component architecture can absolutely be better architected ... but god dammit if it doesn't work
import React, { useState } from 'react';
import { Link } from 'gatsby';

import navbarStyles from './Navbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

import NavMobileDropdown from 'src/components/navbar/NavMobileDropdown';

export default function Navbar({ item, rootNavPath, isSubItem }) {
	const [isCollapsed, setIsCollapsed] = useState(true);

	const handleExpandButton = item => {
		if (item.links || item.collectionName)
			return (
				<div
					className={'fls--flex-align-center'}
					onClick={() => setIsCollapsed(prevState => !prevState)}
				>
					<span>Expand</span>

					<FontAwesomeIcon
						icon={faCaretRight}
						className={`${navbarStyles.flsNav__expand} ${
							!isCollapsed
								? navbarStyles.flsNav__expandExpanded
								: ''
						}`}
					/>
				</div>
			);
	};
	const renderItems = isSubItem => {
		if (isSubItem) {
			return (
				<div className="column is-one-third">
					<Link
						to={
							item.collectionName === 'program-pages'
								? `${rootNavPath}#${item.path}`
								: `${rootNavPath}/${item.path}`
						}
						className={`${navbarStyles.flsNav__mobileItem} fls--light-blue`}
					>
						{item.pageName}
					</Link>

					{item.collectionName || item.links ? (
						<NavMobileDropdown
							rootNavPath={`${rootNavPath}/${item.path}`}
							mainNavItem={item}
							isSubItem={true}
						/>
					) : null}
				</div>
			);
		} else {
			return (
				<div className={`column is-full uh`}>
					<div className={navbarStyles.flsNav__mobileHeaderContainer}>
						<Link
							to={
								item.collectionName === 'program-pages'
									? `${rootNavPath}#${item.path}`
									: `${rootNavPath}/${item.path}`
							}
							className={`${navbarStyles.flsNav__mobileItemHeader} fls--light-blue`}
						>
							{item.pageName}
						</Link>

						{handleExpandButton(item)}
					</div>

					{item.collectionName || item.links ? (
						<NavMobileDropdown
							rootNavPath={`${rootNavPath}/${item.path}`}
							mainNavItem={item}
							isSubItem={true}
							isCollapsed={isCollapsed}
						/>
					) : null}
				</div>
			);
		}
	};

	return renderItems(isSubItem);
}
