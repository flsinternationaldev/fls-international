import React from 'react';

export function kebabToCamel(str) {
	return str.replace(/-([a-z])/g, g => g[1].toUpperCase());
}

export function kebabToSnake(str) {
	return str.replace(/-/g, '_');
}

// Takes the 'edges' array from a graphql, and returns a friendlier, flattened object
export function formatEdges(queriedData) {
	if (queriedData.edges.length > 1) {
		return queriedData.edges.map(edge => edge.node.frontmatter);
	} else if (queriedData.edges.length === 1) {
		return queriedData.edges.reduce(
			(accum, edge) => Object.assign({}, edge.node.frontmatter),
			{}
		);
	}
}

export function updatePrices(prices, updateType, updates) {
	// '...prices' allows us to clone the original array, then return a new array with the results of the updates. This is my design.
	return [...prices].map(priceItem => {
		if (priceItem.type === updateType) {
			let updatedItem = {
					...priceItem,
				},
				nestedUpdateProperties = Object.keys(updates);

			if (nestedUpdateProperties.length) {
				nestedUpdateProperties.forEach(nestedUpdateProperty => {
					updatedItem[nestedUpdateProperty] = {
						...priceItem[nestedUpdateProperty],
						...updates[nestedUpdateProperty],
					};
				});
			} else {
				updatedItem = {
					...priceItem,
					...updates,
				};
			}

			return updatedItem;
		} else {
			return priceItem;
		}
	});
}

// TODO: This implementation is somewhat fragile. When there's an optional callback, we usually don't need a removal type,
// yet it is required to preserve arity.
export function removePrices(prices, removalTypes, optionalCallback) {
	return prices.filter(
		optionalCallback
			? optionalCallback
			: priceItem => !removalTypes.includes(priceItem.type)
	);
}

export function calculatePrice(prices) {
	if (prices.length) {
		return prices.reduce((total, priceItem) => {
			total +=
				// Default duration to 1 if not provided
				priceItem.priceDetails.price *
				(priceItem.priceDetails.duration || 1);
			return total;
		}, 0);
	} else {
		return 0;
	}
}

export function generatePriceThresholds(maxWeeks, exceedMaxWeeks) {
	let durationOptions = [];

	for (let i = 0; i <= maxWeeks; i++) {
		const weekNum = i + 1;

		// TODO: Likely need to make a special note during submission if they select more than the max weeks
		if (exceedMaxWeeks && i == maxWeeks) {
			durationOptions.push({
				label: `${i}+ weeks`,
				value: `${weekNum}+`,
			});
		} else if (i < maxWeeks) {
			durationOptions.push({
				label: weekNum === 1 ? `${i + 1} week` : `${i + 1} weeks`,
				value: weekNum,
			});
		}
	}

	return durationOptions;
}

export function calculateDateOffset(programStartDate, timeExpression) {
	const clonedDate = new Date(programStartDate);

	// Each 'week' needs to end on a friday, hence this weird math
	return clonedDate.setDate(clonedDate.getDate() + timeExpression);
}

export function renderRequirement(requirement) {
	if (requirement) {
		return requirement.value ? null : (
			<span className="label label--application label--select-first fls--red">
				{requirement.label}
			</span>
		);
	}

	return null;
}
