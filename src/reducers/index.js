import {combineReducers} from 'redux';
import auth from './auth';
import contacts from './contacts';
import errors from './contacts';




export default combineReducers({
    auth,
    contacts,
    errors
})