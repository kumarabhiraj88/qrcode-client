import { combineReducers } from 'redux';
import userReducer from './userReducer';
import sidebarReducer from './sidebarReducer';
import qrcodeReducer from './qrcodeReducer';


export default combineReducers({
    userReducer,
    sidebarReducer,
    qrcodeReducer
})