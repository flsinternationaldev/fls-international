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

export function removePrices(prices, removalTypes, optionalCallback) {
	let filteredPrices = prices.filter(
		priceItem => !removalTypes.includes(priceItem.type)
	);

	// TODO: This is ugly, but it's meant to help out general fees, specifically
	if (optionalCallback) {
		filteredPrices = filteredPrices.filter(optionalCallback);
	}

	return filteredPrices;
}
