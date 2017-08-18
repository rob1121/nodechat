import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import message from './reducers/messageReducer';

export default createStore(combineReducers({ message }), {}, applyMiddleware(thunk));
