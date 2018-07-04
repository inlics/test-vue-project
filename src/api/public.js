import axios from 'axios'
import {key} from 'api/config'

// 获取微信jsapi所需参数
export function getConfigParam (data) {
  const url = '/weiXin/getWeiChatJsapiTicketApi' + key

  return axios.post(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
