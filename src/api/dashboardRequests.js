import { Request } from "."
import { Urls } from "../constants"

export const createNews = (requestBody, requestConfig) => Request.post(Urls.NEWS, requestBody, requestConfig)

export const getArea = (id, requestConfig) => Request.get(`${Urls.AREA}/${id}`, requestConfig)

export const getAreas = requestConfig => Request.get(Urls.AREA, requestConfig)