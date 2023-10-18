// import axios from 'axios'
import { ExplorerApi } from 'atomicassets'
import data from '../data.json'
import { PackTemplateType } from "../redux/types";
import { ITemplate } from "atomicassets/build/API/Explorer/Objects";

const api = new ExplorerApi(
 data.apiEndPointUrl,
 'atomicassets',
 { fetch } as any
)

export const TemplateApi = {
	getTemplates: async (templateIdList: any, collectionName: any) => {
		const uriPrefix = "https://dweb.link/ipfs/";
		const templateList: Array<PackTemplateType>  = []

		if (!collectionName) {
			collectionName = data.capComCollectionName
		}

		const promiseArray = templateIdList.map((template_id: any) => {
			return new Promise(async (resolve: any) => {
				return api.getTemplate(collectionName, template_id).then((template : ITemplate) => {
					templateList.push({
						imgLink: uriPrefix + template.immutable_data.img,
						template_id: template.template_id,
						template_name: template.immutable_data.name,
						template_series: template.immutable_data.series,
						collection_name: template.collection.collection_name
					})
					resolve()
				})
			})
		})
		await Promise.all(promiseArray)

		return templateList
	}
}