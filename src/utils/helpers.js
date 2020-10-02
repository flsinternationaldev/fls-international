export function snakeToCamel(str) {
	return str.replace(/-([a-z])/g, g => g[1].toUpperCase());
}

// Takes the 'edges' array from a graphql, and returns a friendlier, flattened object
export function formatEdges(queriedData) {
	return queriedData.edges.map(edge => edge.node.frontmatter);
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
				priceItem.priceDetails.price * priceItem.priceDetails.duration;
			return total;
		}, 0);
	} else {
		return 0;
	}
}
