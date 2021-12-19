import { createStore } from 'redux';
import Axios from './axios.js'

const initialState = {
    id: null
}

const store = createStore(reducer, initialState);

function reducer(state = initialState, action) {
    switch(action.type) {
        case 'id': 
            state.id = action.value
            return state
        
        default: return state;
    }
}

export default store;