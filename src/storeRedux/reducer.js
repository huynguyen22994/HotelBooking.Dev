import { CHANGETITLE } from './constants'
const initStateRedux = {
    titlePage: "Hotel Booking.dev"
}

function reducer(state = initStateRedux, action) {
    switch(action.type) {
        case CHANGETITLE:
            return {
                ...state,
                titlePage: action.titlePage
            }
        default:
            return state;    
    }
}

export default reducer