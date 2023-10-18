import { AppThunk } from '../store'
import { InputType, RetrieveType } from "../types";
import { sendTransaction } from "../../api/transact.api";
import { AssetsApi } from "../../api/assets.api";
import { setArsenal, setFighters, setPacks, setPackTemplateList } from "./userSlice";
import { TemplateApi } from "../../api/template.api";
import data from "../../data.json";
import { retrieveAssetsThunk } from "./assetsThunk";
import arsenal from "../../pages/Arsenal/Arsenal";

export const addBackTokenThunk =
 (backTokenAmount: number, assetID: string): AppThunk => {
	 return async (dispatch, getState) => {
		 const userData = getState().user.userData

		 let amountResult = String(backTokenAmount);

		 if (amountResult.length < 15) {
			 if (amountResult.includes(".")) {
				 for (let i = 0; i < 16 - amountResult.length; i++) {
					 amountResult += "0";
				 }
			 }
			 else {
				 amountResult += ".";
				 for (let i = 0; i < 8; i++) {
					 amountResult += "0";
				 }
			 }
		 }
		 amountResult += " WAX";

		 const actions = [{
			 account: 'atomicassets',
			 name: 'announcedepo',
			 authorization: [{
				 actor: userData.accountName,
				 permission: 'active',
			 }],
			 data: {
				 owner: userData.accountName,
				 symbol_to_announce: '8,WAX',
			 },
		 },
			 {
				 account: 'eosio.token',
				 name: 'transfer',
				 authorization: [{
					 actor: userData.accountName,
					 permission: 'active',
				 }],
				 data: {
					 from: userData.accountName,
					 to: 'atomicassets',
					 quantity: amountResult,
					 memo: 'deposit',
				 },
			 },
			 {
				 account: 'atomicassets',
				 name: 'backasset',
				 authorization: [{
					 actor: userData.accountName,
					 permission: 'active',
				 }],
				 data: {
					 payer: userData.accountName,
					 asset_owner: userData.accountName,
					 asset_id: assetID,
					 token_to_back: amountResult,
				 },
			 }];

		 sendTransaction({
			 userData,
			 action: actions,
			 inputType: InputType.array
		 }).then(() => {
			 setTimeout(() => {
				 dispatch(retrieveAssetsThunk(RetrieveType.packs))
				 dispatch(retrieveAssetsThunk(RetrieveType.arsenal))
				 dispatch(retrieveAssetsThunk(RetrieveType.fighters))
			 }, 10000)
		 })
	 };
 }

export const burnNftThunk =
 (assetID: string): AppThunk => {
	 return async (dispatch, getState) => {
		 const userData = getState().user.userData
		 const packs = getState().user.packs
		 const arsenal = getState().user.arsenal
		 const fighters = getState().user.fighters

		 const oldUnStakedList = [...packs, ...arsenal, ...fighters]

		 const actions = [{
			 account: 'atomicassets',
			 name: 'burnasset',
			 authorization: [{
				 actor: userData.accountName,
				 permission: 'active',
			 }],
			 data: {
				 asset_owner: userData.accountName,
				 asset_id: assetID,
			 }
		 }];

		 const transactionHandler = setInterval(async () => {
			 const capComAssets = await AssetsApi.getAssets(userData.accountName, data.capComCollectionName)
			 const testAssets = await AssetsApi.getAssets(userData.accountName, data.testCollectionName)

			 const newUnStakedList = [...capComAssets, ...testAssets]
			 if (newUnStakedList.length < oldUnStakedList.length) {
				 const arsenalNameFilter = ['actions']
				 const fightersNameFilter = ['series1', 'promo']
				 const packsNameFilter = ['packs', 'pasks']

				 const arsenal = newUnStakedList
					.filter((item: any) => arsenalNameFilter.includes(item.schema.schema_name || 'aaaaaa'))
				 const fighters = newUnStakedList
					.filter((item: any) =>  fightersNameFilter.includes(item.schema.schema_name || 'aaaaaa'))
				 const packs = newUnStakedList
					.filter((item: any) => packsNameFilter.includes(item.schema.schema_name || 'aaaaaa'))

				 dispatch(setArsenal(arsenal));
				 dispatch(setFighters(fighters));
				 dispatch(setPacks(packs));
				 clearInterval(transactionHandler);
			 }
		 }, 2000)

		 sendTransaction({ userData, action: actions, inputType: InputType.array })
	 };
 }

export const getTemplatesThunk =
 (): AppThunk => {
	 return async (dispatch, getState) => {
		 const capComPackTemplateIdList = ["55356", "55359"]
		 const testPackTemplateIdList = ["557627", "557060"]

		 const resp1 = await TemplateApi.getTemplates(capComPackTemplateIdList, data.capComCollectionName);
		 const resp2 = await TemplateApi.getTemplates(testPackTemplateIdList, data.testCollectionName);

		 const resp = [...resp1, ...resp2];

		 dispatch(setPackTemplateList(resp))
	 };
 }

export const openPackThunk =
 (assetId: string, collection_name: string, templateId: string | null): AppThunk => {
	 return async (dispatch, getState) => {
		 const userData = getState().user.userData
		 const packs = getState().user.packs
		 const arsenal = getState().user.arsenal
		 const fighters = getState().user.fighters

		 const oldUnStakedList = [...packs, ...arsenal, ...fighters]

		 let assetToUse = null as any;

		 if (templateId == null) {
			 assetToUse = oldUnStakedList.find((item: any) => item.asset_id === assetId)
		 }
		 let actions = [] as any;

		 const transactionHandler = setInterval(async () => {
			 const capComAssets = await AssetsApi.getAssets(userData.accountName, data.capComCollectionName)
			 const testAssets = await AssetsApi.getAssets(userData.accountName, data.testCollectionName)

			 const newUnStakedList = [...capComAssets, ...testAssets]
			 if (newUnStakedList.filter((item) => (item.asset_id == assetId)).length === 0) {
				 const arsenalNameFilter = ['actions']
				 const fightersNameFilter = ['series1', 'promo']
				 const packsNameFilter = ['packs', 'pasks']

				 const arsenal = newUnStakedList
					.filter((item: any) => arsenalNameFilter.includes(item.schema.schema_name || 'aaaaaa'))


				 const fighters = newUnStakedList
					.filter((item: any) =>  fightersNameFilter.includes(item.schema.schema_name || 'aaaaaa'))
				 const packs = newUnStakedList
					.filter((item: any) => packsNameFilter.includes(item.schema.schema_name || 'aaaaaa'))

				 dispatch(setArsenal(arsenal));
				 dispatch(setFighters(fighters));
				 dispatch(setPacks(packs));
				 clearInterval(transactionHandler);
			 }
		 }, 2000)
		 if (collection_name === data.capComCollectionName) {
			 actions = [{
				 "account": "atomicassets",
				 "name": "transfer",
				 authorization: [{
					 actor: userData.accountName,
					 permission: 'active',
				 }],
				 "data": {
					 "from": userData.accountName,
					 "to": "unbox.nft",
					 "asset_ids": [assetId ?? (assetToUse as any).asset_id],
					 "memo": "open pack"
				 }
			 },
				 {
					 account: "unbox.nft",
					 name: "unbox",
					 authorization: [{
						 actor: userData.accountName,
						 permission: 'active',
					 }],
					 data: {
						 "collection_name": collection_name,
						 "from": userData.accountName,
						 "box_id": (assetToUse as any).template.template_id
					 }
				 }];

			 sendTransaction({ userData, action: actions, inputType: InputType.array })
		 }
		 else {
			 console.log(collection_name,2)

			 actions = [{
				 "account": "atomicassets",
				 "name": "transfer",
				 authorization: [{
					 actor: userData.accountName,
					 permission: 'active',
				 }],
				 "data": {
					 "from": userData.accountName,
					 "to": "atomicpacksx",
					 "asset_ids": [assetId ?? (assetToUse as any).asset_id],
					 "memo": "unbox"
				 }
			 }];

			 sendTransaction({ userData, action: actions, inputType: InputType.array }).then((data: any) => {

				 const finalAction = [{
					 "account": "atomicpacksx",
					 "name": "claimunboxed",
					 authorization: [{
						 actor: userData.accountName,
						 permission: 'active',
					 }],
					 "data": {
						 "origin_roll_ids": ["1", "2", "3", "6", "7", "8", "9"],
						 "pack_asset_id": [assetId ?? (assetToUse as any).asset_id]
					 }
				 }]

				 setTimeout(() => {sendTransaction({ userData, action: finalAction, inputType: InputType.array })}, 6000)
			 })
		 }

		 console.log(arsenal)
		 console.log(fighters)
	 };
 }

export const buyDropThunk =
 (drop: any, itemsCount: number): AppThunk => {
	 return async (dispatch, getState) => {
		 const userData = getState().user.userData
		 const packs = getState().user.packs
		 const arsenal = getState().user.arsenal
		 const fighters = getState().user.fighters

		 const oldUnStakedList = [...packs, ...arsenal, ...fighters]

		 const actions = [{
			 "account": "atomicdropsx",
			 "name": "assertdrop",
			 authorization: [{
				 actor: userData.accountName,
				 permission: 'active',
			 }],
			 data: {
				 drop_id: drop.drop_id,
				 assets_to_mint_to_assert: drop.assets_to_mint,
				 listing_price_to_assert: drop.listing_price,
				 settlement_symbol_to_assert: drop.settlement_symbol
			 }},
			 {
				 account: "eosio.token",
				 name: "transfer",
				 authorization: [{
					 actor: userData.accountName,
					 permission: 'active',
				 }],
				 data: {
					 from: userData.accountName,
					 to: "atomicdropsx",
					 quantity: drop.listing_price,
					 memo: "deposit"
				 }
			 },
			 {
				 account: "atomicdropsx",
				 name: "claimdrop",
				 authorization: [{
					 actor: userData.accountName,
					 permission: 'active',
				 }],
				 data: {
					 claimer: userData.accountName,
					 drop_id: drop.drop_id,
					 claim_amount: itemsCount,
					 intended_delphi_median: 0,
					 referrer: "atomichub",
					 country: ""
				 }
			 }
		 ];

		 // debugger;
		 // const transactionHandler = setInterval(async () => {
			//  const newUnStakedList = await AssetsApi.getAssets(userData.accountName);
			//  if (newUnStakedList.length > oldUnStakedList.length) {
			// 	 dispatch(setUnStakedList(newUnStakedList));
			// 	 clearInterval(transactionHandler);
			//  }
		 // }, 2000)

		 sendTransaction({ userData, action: actions, inputType: InputType.array })
	 };
 }
