import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from './types';

export const getItems = () => {
    // it goes back to the item Reducer and checking the action
    // when this action will reach itemReducer, it will launch the action.type part
    // so itemActions communicate with itemReducer without formal import here
    // the communicate on the level of the ShoppingList component where:
    // 1) this itemActions is directly imported
    // 2) the redux is connected to react via connect; redux already has itemReducers via reducers/index.js via store

    return {
        // this type is then used as action.type in switch in itemReducer
        type: GET_ITEMS
    }
};
// deleteItem takes in the id because it needs to know which one to delete
export const deleteItem = id => {
    return {
        // this type is then used as action.type in switch in itemReducer
        type: DELETE_ITEM,
        payload: id
    }
}