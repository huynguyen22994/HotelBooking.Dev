import { ADDTODO, REMOVETODO, UPDATEHEADTITLE, UPDATEHOTELRESULT, UPDATESEARCH } from './constants'

function addTodo(state) {
    return {
        type: ADDTODO,
        todo: {
            ...state
        }
    }
}

function removeTodo(state) {
    return {
        type: REMOVETODO,
        state
    }
}

function updateHeadTitle(title) {
    return {
        type: UPDATEHEADTITLE,
        headTitle: title
    }
}

function setHotelResults(hotels) {
    return {
        type: UPDATEHOTELRESULT,
        holtelResults: hotels
    }
}

function setSearchObj(searchObj) {
    return {
        type: UPDATESEARCH,
        searchObj: searchObj
    }
}

export default {
    addTodo,
    removeTodo,
    updateHeadTitle,
    setHotelResults,
    setSearchObj
};