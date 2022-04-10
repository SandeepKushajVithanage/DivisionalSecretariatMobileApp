import { Request } from "."
import { Urls } from "../constants"

export const createNews = (requestBody, requestConfig) => Request.post(Urls.NEWS, requestBody, requestConfig)