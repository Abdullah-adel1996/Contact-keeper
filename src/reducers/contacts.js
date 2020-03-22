import * as actionTypes from '../actions/actionTypes';

const initialState = {
    error: null,
    contacts: [],
    current: null
};

export default function contacts(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ADD_CONTACT_SUCCESS:
            const newContact = {...action.contactData,
                id : action.contactId
            }
            return {
                ...state,
                contacts: state.contacts.concat(newContact),
                error: null,
            }
        case actionTypes.FETCH_CONTACTS_START:
            return {
                ...state,
                error: null,
            }
        case actionTypes.FETCH_CONTACTS_SUCCESS:
            return {
                ...state,
                contacts: action.contacts,
                error: null,  
                
            }
        case actionTypes.FETCH_CONTACTS_FAIL:
            return {
                ...state,
                error: action.error
            }
        case actionTypes.DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(
                    contact => contact.id !== action.id
                    )
            }    
        case actionTypes.SET_CURRENT:
            return {
                ...state,
                current: action.contact
            }
        case actionTypes.DELETE_CURRENT:
            return {
                ...state,
                current: null
            }
        case actionTypes.UPDATE_CONTACT:
        return {
            ...state,
            contacts: state.contacts.map(contact =>
                contact.id === action.contact.id ? action.contact : contact
              )
        }
        default:
            return state
    }
};
