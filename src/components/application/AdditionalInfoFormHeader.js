import React, { Fragment } from 'react';
import ReactTooltip from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

export default function AdditionalInfoFormHeader({
	programType,
	calculatePrice,
	prices,
	handleDataChange,
	setApplicationData,
	setPrices,
}) {
	return (
		<Fragment>
			<ReactTooltip
				type="info"
				effect="solid"
				html={true}
				multiline={true}
				className="fls__tooltip"
				clickable={true}
			/>

			<div className="column is-full">
				<div className="application__header-container">
					<h3 className="fls-post__title">
						{/* TODO: This section, before the program specific info form component, needs to be DRYed */}
						{`Additional Info - ${programType.replace(/-/g, ' ')}`}
					</h3>

					<h3 className="application__total-price">
						Total Price: ${calculatePrice(prices)}
					</h3>
				</div>
			</div>

			<div className="column is-full">
				<button
					className="fls__button fls__button--half"
					onClick={() => {
						handleDataChange('programType', '', 'application');

						setApplicationData({});

						setPrices([]);
					}}
				>
					<FontAwesomeIcon
						className="fls-post__subhero-icon"
						icon={faChevronLeft}
					/>{' '}
					Return to Program Type Selection
				</button>
			</div>
		</Fragment>
	);
}
