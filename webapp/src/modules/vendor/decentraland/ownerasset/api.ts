
import { API_VIRTUAL_URL } from '../api'

import { OwnerAssetsFetchOptions } from '../../../ownerasset/types'

class OwnerAssetAPI {
  fetch = async (params: OwnerAssetsFetchOptions) => {
    const ownerassetsArray = await fetch(API_VIRTUAL_URL + `/user/assets/${params.owner}`, {
      // mode: 'no-cors',
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    }).then(response => {
      return response.json()
    })
    return ownerassetsArray
  }

  // fetchOne = async (optionId: string) => {
  //   const asset = await fetch(API_VIRTUAL_URL + '/assets/' + optionId, {
  //     // mode: 'no-cors',
  //     method: "GET",
  //     headers: {
  //       "Accept": "application/json"
  //     }
  //   }).then(response => {
  //     return response.json()
  //   })
  //   return asset
  // }


}





export const ownerassetAPI = new OwnerAssetAPI()
