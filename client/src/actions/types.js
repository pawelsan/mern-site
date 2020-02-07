// variables set to strings that we are exporting to itemReducer
// it is kindda in the lowest level of data flow
// the first flow goes from types.js => itemActions in order to form getItems() which checks the action type in the reducer
// the second flow is from types.js => itemReducer in order to decide what to do with the state in case on particular actions

export const GET_ITEMS = 'GET_ITEMS';
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';