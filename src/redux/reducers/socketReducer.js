export const socketActionTypes = {
    SET_SOCKET: 'SET_SOCKET',
    ADD_MESSAGE: 'ADD_MESSAGE',
    SET_MESSAGES: 'SET_MESSAGES',
    SET_CONVERSATIONS: 'SET_CONVERSATIONS'
}

const message = {
    _id: undefined,
    text: undefined,
    createdAt: undefined,
    user: undefined,
    image: undefined,
    video: undefined,
    audio: undefined,
    system: undefined,
    sent: undefined,
    received: undefined,
    pending: undefined,
}

const conversation = {
    user: {

    },
    messages: []
}

const initialState = {
    socket: null,
    messages: [],
    selectedConversation: null,
    conversations: [],
}

const socketReducer = (state = initialState, action) => {
    switch (action.type) {
        case socketActionTypes.SET_SOCKET:
            return { ...state, socket: action.payload }

        case socketActionTypes.ADD_MESSAGE:
            const newMessagesList = [...state.messages, ...action.payload]
            newMessagesList.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt)
            })
            return { ...state, messages: newMessagesList }

        case socketActionTypes.SET_MESSAGES:
            const messagesList = action.payload.messages
            const selectedConversation = action.payload.selectedConversation
            messagesList.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt)
            })
            return { ...state, messages: messagesList, selectedConversation }

        case socketActionTypes.SET_CONVERSATIONS:
            return { ...state, conversations: action.payload }

        default:
            return state
    }
}

export default socketReducer