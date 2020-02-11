// Actual state is going to go here, and here we will be checking actions
// In the reducer we have to evaluate action types
import uuid from 'uuid';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from '../actions/types';

const initialState = {
    items: [],
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            };
        case DELETE_ITEM:
            return {
                ...state,
                // action.payload is the id from itemActions
                items: state.items.filter(item => item.id !== action.payload)
            };
        case ADD_ITEM:
            return {
                // we are spreading the state beacouse we cannot directly change it, we have to make a copy of it
                ...state,
                // action.payload is the item from itemActions
                items: [action.payload, ...state.items]
            };
        case ITEMS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}