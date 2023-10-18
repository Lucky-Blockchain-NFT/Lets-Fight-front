export enum WalletEnum {
	wax = 'wax',
	anchor = 'anchor'
}

export type UserDataType = {
	loginType: WalletEnum,
	accountName: string,
	anchorSession: any,
	waxSession: any,
	nickname: string,
	balance: any,
	email: any
};

export type AssetType = {
	id: string,
	template_id: string,
	durability: number,
	name: string,
	img: string,
	asset_id: string,
	backed_tokens: number
};

export enum InputType {
	array = 'array',
	object = 'object',
}
export type PackTemplateType = {
	template_id: string,
	imgLink: string,
	template_name: string,
	template_series: string,
	collection_name: string
}

export enum LoginStatusType {
	new = 'new',
	notAuthorized = 'notAuthorized',
	authorized = 'authorized'
}

export enum RetrieveType {
	packs = 'packs',
	fighters = 'fighters',
	arsenal = 'arsenal'
}
