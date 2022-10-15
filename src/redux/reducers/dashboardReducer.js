export const dashboardActionTypes = {
    SET_AREA: 'SET_AREA',
    SET_AREA_LOADING: 'SET_AREA_LOADING',
}

const initialState = {
    area: null,
    areaLoading: true,
}

const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case dashboardActionTypes.SET_AREA:
            return { ...state, area: action.payload, areaLoading: false }
        
        case dashboardActionTypes.SET_AREA_LOADING:
            return { ...state, areaLoading: action.payload }

        default:
            return state
    }
}

export default dashboardReducer