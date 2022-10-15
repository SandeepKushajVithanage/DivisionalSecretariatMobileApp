import { Request } from "."
import { Urls } from "../constants"

export const updateProfileApi = (requestBody, requestConfig) => Request.put(Urls.CURRENT_USER, requestBody, requestConfig)

export const getCurrentUser = requestConfig => Request.get(Urls.CURRENT_USER, requestConfig)