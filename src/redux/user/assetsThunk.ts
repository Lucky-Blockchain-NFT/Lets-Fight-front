import { AppThunk } from '../store'
import { AssetsApi } from "../../api/assets.api";
import data from "../../data.json";
import { RetrieveType } from "../types";
import { setArsenal, setFighters, setPacks } from "./userSlice";

export const retrieveAssetsThunk =
 (retrieveType: RetrieveType): AppThunk => async (dispatch, getState) => {
	 try {
		 const owner = getState().user.userData.accountName

		 const capComAssets = await AssetsApi.getAssets(owner, data.capComCollectionName)
		 const testAssets = await AssetsApi.getAssets(owner, data.testCollectionName)
		 // console.log(capComAssets)
		 // console.log(testAssets)
		 // console.log(data)

		 const schemaNameFilter = retrieveType === RetrieveType.arsenal
			? ['actions']
			: retrieveType === RetrieveType.fighters
		 		? ['series1', 'promo']
			 	: ['packs', 'pasks']

		 const unStakedList = [...capComAssets, ...testAssets]
			.filter((item: any) => schemaNameFilter.includes(item.schema.schema_name || 'aaaaaa'))

		 if (retrieveType === RetrieveType.arsenal) {
			 dispatch(setArsenal(unStakedList))
		 }
		 else if (retrieveType === RetrieveType.fighters) {
			 dispatch(setFighters(unStakedList))
		 }
		 else {
			 dispatch(setPacks(unStakedList))
		 }

	 } catch (error) {

	 }
 }