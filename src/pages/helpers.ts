export const filterFighters = (unStakedList: any, newFilters: any) => {
	return unStakedList.map((item: any) => {
		if (newFilters[0] !== item.schema.schema_name) return null;
		if (newFilters[1] !== "Name" && !item.data.name.includes(newFilters[1])) return null;
		if (newFilters[2] !== "Rarity" && newFilters[2] !== item.data.rarity) return null;
		if (newFilters[3] !== "Powerscore" && newFilters[3] !== item.data.powerscore) return null;
		if (newFilters[4] !== "Class Card" && !item.data.name.includes(newFilters[4])) return null;

		return item;
	}).filter((item: any) => item);
}

export const filterArsenal = (unStakedList: any, newFilters: any) => {
	// debugger
	return unStakedList.map((item: any) => {
		if (newFilters[0] !== item.schema.schema_name) return null;
		if (newFilters[1] !== "Name" && !item.data.name.includes(newFilters[1])) return null;
		if (newFilters[2] !== "Rarity" && newFilters[2] !== item.data.rarity) return null;
		if (newFilters[3] !== "Powerscore" && Number(newFilters[3]) !== item.data.powerscore) return null;

		return item;
	}).filter((item: any) => item);
}