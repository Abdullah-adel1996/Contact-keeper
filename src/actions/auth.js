import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (idtoken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idtoken,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logOut = () => { 
    return {
        type: actionTypes.LOGOUT,
    };
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email : email,
            password : password,
            returnSecureToken : true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyArEMJPwEq-wkqM9PfrG73Vm_9cTY-KdyM', authData)
        .then(response => {
            dispatch(authSuccess(response.data.idToken, response.data.localId));
        })

        .catch(err => { 
            console.log(err);
            dispatch(authFail(err));
        
        });
    };
};

export const login = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email : email,
            password : password,
            returnSecureToken : true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyArEMJPwEq-wkqM9PfrG73Vm_9cTY-KdyM', authData)
        .then(response => {
            dispatch(authSuccess(response.data.idToken, response.data.localId));
        })
        .catch(err => { 
            dispatch(authFail(err));
        
        });
    };
};

