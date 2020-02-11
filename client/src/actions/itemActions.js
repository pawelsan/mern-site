import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';

// dispatch come from thunk, enables us to make an asynchronous request
export const getItems = () => dispatch => {
    // it goes back to the item Reducer and checking the action
    // when this action will reach itemReducer, it will launch the action.type part
    // so itemActions communicate with itemReducer without formal import here
    // the communicate on the level of the ShoppingList component where:
    // 1) this itemActions is directly imported
    // 2) the redux is connected to react via connect; redux already has itemReducers via reducers/index.js via store
    dispatch(setItemsLoading());
    // we added a proxy in package.json in React that enables it to have the url shortened
    axios
        .get('api/items')
        .then(res =>
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            }))
    // return {
    //     // this type is then used as action.type in switch in itemReducer
    //     type: GET_ITEMS
    // }
};
// deleteItem takes in the id because it needs to know which one to delete
export const deleteItem = id => {
    return {
        // this type is then used as action.type in switch in itemReducer
        type: DELETE_ITEM,
        payload: id
    }
}

export const addItem = item => {
    return {
        // this type is then used as action.type in switch in itemReducer
        type: ADD_ITEM,
        payload: item
    }
}

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}