import { ExplorerApi } from 'atomicassets'
import data from '../data.json';

const api = new ExplorerApi(
 data.apiEndPointUrl,
 'atomicassets',
 { fetch } as any
)

export const AssetsApi = {
	getAssets: async (accountName: string, collection_name: string) => {
		const firstPage = await api.getAssets({
			  owner: accountName, // '.gvb.wam' - test user
			  collection_name: collection_name
			}, 1, 1000);
		const secondPage = await api.getAssets({
			owner: accountName, // '.gvb.wam' - test user
			collection_name: collection_name
		}, 2, 1000);
		return [...firstPage, ...secondPage];
	}
}