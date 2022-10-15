import { socketActionTypes } from "../reducers/socketReducer"

export const setSocket = payload => ({ type: socketActionTypes.SET_SOCKET, payload })

export const addMessage = payload => ({ type: socketActionTypes.ADD_MESSAGE, payload })

export const setMessages = payload => ({ type: socketActionTypes.SET_MESSAGES, payload })

export const setConversations = payload => ({ type: socketActionTypes.SET_CONVERSATIONS, payload })