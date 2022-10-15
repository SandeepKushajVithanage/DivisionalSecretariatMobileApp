import axios from 'axios'

import { Urls } from '../constants'

export const Request = axios.create({
    baseURL: Urls.BASE_URI,
})

Request.interceptors.request.use(
  async config => {
    console.group();
    console.log('API ENDPOINT', config.baseURL + config.url)
    console.log('Request Header', config.headers)
    console.log('Request Body', config.data)
    console.groupEnd()
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

Request.interceptors.response.use(function (response) {
    console.group();
    console.log('Request URL', response.config.baseURL + response.config.url)
    console.log('Request Header', response.config.headers)
    console.log('Request Body', response.config.data)
    console.log('Response Body', response.data)
    console.groupEnd()
    if (Array.isArray(response.data.result)) {
      console.table(response.data.result);
    }
    return response
  }, function (error) {
    console.log(error?.request?.responseURL, error?.request?.status)
    throw error
  });