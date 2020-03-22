import {AUTH_START, AUTH_SUCCESS, AUTH_FAIL, LOGOUT} from '../actions/actionTypes';


const initialState = {
    token: null,
    userId: null,
    error: null,
    isAuth: false
};

export default function auth(state = initialState, action) {
    switch (action.type) {
        case AUTH_START:
            return {
                ...state,
                error: null,
            }
        case AUTH_SUCCESS:
            return {
                ...state,
                token: action.idToken,
                userId: action.userId,
                error: null,  
                isAuth: true 
            }
        case AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                isAuth: false
            }
        case LOGOUT:
            return {
                ...state,
                isAuth: false,
                token: null,
                userId: null
            }    
        default:
            return state
    }
};