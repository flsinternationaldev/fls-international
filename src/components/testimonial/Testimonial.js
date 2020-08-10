import React from 'react';

import testimonialStyles from './Testimonial.module.scss';
import testimonialImg from '../../img/testimonial-avatar.jpeg';

export default function Section(props) {
	// TODO: All this testimonial data should come from the CMS
	return (
		<div className="column is-full-desktop is-half-tablet">
			<div
				className={`${testimonialStyles.fls__testimonial} ${testimonialStyles.fls__testimonialPrograms}`}
			>
				<img
					src={testimonialImg}
					alt="testimonial avatar"
					className={testimonialStyles.fls__testimonialAvatar}
				/>
				<p className={testimonialStyles.fls__testimonialCopy}>
					I like everything about this program. When I get home it
					will help me to get a job!
				</p>
				<div className={testimonialStyles.fls__testimonialSubcopy}>
					<span>AHMED</span> -{' '}
					<span className="fls--red">Saudi Arabia</span>
					<a
						href=""
						className="fls__link fls__link--alt fls--red fls__testimonial-read-more"
					>
						Read more
					</a>
				</div>
			</div>
		</div>
	);
}
