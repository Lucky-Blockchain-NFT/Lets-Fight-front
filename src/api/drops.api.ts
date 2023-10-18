import axios from 'axios'
// import { ExplorerApi } from 'atomicassets'
import data from '../data.json'
// import { PackTemplateType } from "../redux/types";
// import { ITemplate } from "atomicassets/build/API/Explorer/Objects";


export const DropsApi = {
	getDrop: async (dropId: any) => {
		return axios.post(data.apiWaxSweden + data.apiGetTableRowsUrl, {
			code: "atomicdropsx",
			table: "drops",
			scope: "atomicdropsx",
			json: true,
			index_position: '1',
			key_type: '',
			encode_type: '',
			lower_bound: dropId,
			upper_bound: dropId,
			limit: 10,
			reverse: false,
			show_payer: false
		})
	}
}