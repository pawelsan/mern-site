// brings together other reducers
// the state from those reducers goes through here

import { combineReducers } from 'redux';
import itemReducer from './itemReducer';

export default combineReducers({
    // this influences how we called the state in the ShoppingList component -> it is called there: state.item
    // so the state from the store is like the state of states object
    item: itemReducer
})