import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { toDoListReducer } from '../reducers/todo-list';

const store = createStore(combineReducers({ toDoListReducer }), applyMiddleware(thunk));
export { store };