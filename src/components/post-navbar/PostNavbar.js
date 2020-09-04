import React from 'react';
import { Link } from 'gatsby';

import postNavbarStyles from './PostNavbar.module.scss';

export default function PostNavbar({ data }) {
	return (
		<div className="column is-full-desktop is-half-tablet">
			{data.map(mappedData => {
				return (
					<Link
						className={postNavbarStyles.fls__postNavbarItem}
						to={mappedData.path}
					>
						<span>{mappedData.name}</span>
					</Link>
				);
			})}
		</div>
	);
}
