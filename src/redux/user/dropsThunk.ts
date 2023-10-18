import { AppThunk } from '../store'
import { DropsApi } from "../../api/drops.api";
import { setDropsData } from "./userSlice";
import { TemplateApi } from "../../api/template.api";


export const getDropsThunk =
 (): AppThunk => async (dispatch, getState) => {
  const dropsList = [] as any
  const drop = await DropsApi.getDrop(91078)
  const dropData = drop.data.rows[0]
  const dropTemplate = await TemplateApi.getTemplates([dropData.assets_to_mint[0].template_id], "testopenpack")

  dropData.display_data = !dropData.display_data ? '' : JSON.parse(dropData.display_data)
  dropData.img = dropTemplate[0].imgLink

  dropsList.push(dropData)

  dispatch(setDropsData(dropsList))
}