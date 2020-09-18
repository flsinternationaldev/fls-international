import React, { useState, Fragment } from 'react';
import { Link } from 'gatsby';

import navbarStyles from './Navbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

import NavMobileDropdown from 'src/components/navbar/NavMobileDropdown';

export default function NavbarMobileCollapsibleSection({ mainNavItem }) {
	const [isCollapsed, setIsCollapsed] = useState(true);

	return (
		<Fragment>
			<div
				className="column is-full"
				style={{
					'padding-bottom': 0,
				}}
			>
				<div className={navbarStyles.flsNav__mobileHeaderContainer}>
					<Link
						to={`/${mainNavItem.path}`}
						className={`${navbarStyles.flsNav__mobileHeader} fls--white`}
					>
						{mainNavItem.name}
					</Link>

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
				</div>
			</div>

			<NavMobileDropdown
				mainNavItem={mainNavItem}
				rootNavPath={`/${mainNavItem.path}`}
				isCollapsed={isCollapsed}
			/>
		</Fragment>
	);
}
