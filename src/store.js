import { createStore } from 'redux';
import Axios from './axios.js'

const initialState = {
    id: null,
    map: {
        coords: null,
        coordsIndex: 0
    },
    deleteVacancy: {
        index: 0,
        id: null
    }
}

const store = createStore(reducer, initialState);

function reducer(state = initialState, action) {
    switch(action.type) {
        case 'id': 
            state.id = action.value
            return state

        case 'saveCoords':
            state.map.coords = action.coords
            if(action.index != undefined) state.map.coordsIndex = state.map.coordsIndex + 1
            return state

        case 'deleteVacancy':
            state.deleteVacancy.index += 1
            state.deleteVacancy.id = action.id
            return state
        
        default: return state;
    }
}

export default store;