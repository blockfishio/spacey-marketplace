
import { API_VIRTUAL_URL } from '../api'

import { AssetsFetchParams } from '../../../asset/types'

class AssetAPI {
  fetch = async (params: AssetsFetchParams) => {
    const assetsArray = await fetch(API_VIRTUAL_URL + `/assets?category=${params.category ? params.category.toLowerCase() : 'all'}`, {
      // mode: 'no-cors',
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    }).then(response => {
      return response.json()
    })
    return assetsArray
  }

  fetchOne = async (optionId: string) => {
    const asset = await fetch(API_VIRTUAL_URL + '/assets/' + optionId, {
      // mode: 'no-cors',
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    }).then(response => {
      return response.json()
    })
    return asset
  }


}





export const assetAPI = new AssetAPI()
