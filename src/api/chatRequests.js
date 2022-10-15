import { Request } from "."
import { Urls } from "../constants"

export const getConversations = requestConfig => Request.get(Urls.CHAT, requestConfig)

export const getSingleConversation = (id, requestConfig) => Request.get(`${Urls.CHAT}/${id}`, requestConfig)