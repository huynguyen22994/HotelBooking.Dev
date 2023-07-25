import { ADDTODO, UPDATEHEADTITLE, UPDATEHOTELRESULT, UPDATESEARCH } from './constants'

const initState = {
    todos: [],
    headTitle: "Welcome to Booking app!",
    holtelResults: [],
    searchObj: {}
}

function reducer(state, action) {
    let newState;
    switch(action.type) {
        case ADDTODO:
            newState = {
                ...state,
                todos: [...state.todos, action.todo]
            }
            return newState
        case UPDATEHEADTITLE:
            newState = {
                ...state,
                headTitle: action.headTitle
            }
            return newState
        case UPDATEHOTELRESULT:
            newState = {
                ...state,
                holtelResults: action.holtelResults
            }
            return newState
        case UPDATESEARCH:
            newState = {
                ...state,
                searchObj: action.searchObj
            }
            return newState
        default:
            return newState
    }
}

export { initState }
export default reducer;