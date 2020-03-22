import * as actionTypes from './actionTypes';
import axios from 'axios';


export const addContactStart = () => {
    return {
        type: actionTypes.ADD_CONTACT_START
    };
};

export const addContactSuccess = ( id, contactData ) => {
    return {
        type: actionTypes.ADD_CONTACT_SUCCESS,
        contactId: id,
        contactData: contactData
    };
};

export const addContactFail = ( error ) => {
    return {
        type: actionTypes.ADD_CONTACT_FAIL,
        error: error
    };
}

export const addContact = ( contactData, token ) => {
    return dispatch => {
        dispatch( addContactStart() );
        axios.post( 'https://contact-keeper-12674.firebaseio.com/contacts.json?auth=' + token , contactData )
            .then( response => {
                dispatch( addContactSuccess( response.data.name, contactData ) );
            } )
            .catch( error => {
                dispatch( addContactFail( error ) );
            } );
    };
};

export const fetchContactsStart = () => {
    return {
        type: actionTypes.FETCH_CONTACTS_START
    };
};

export const fetchContactsSuccess = ( contacts ) => {
    return {
        type: actionTypes.FETCH_CONTACTS_SUCCESS,
        contacts: contacts
    };
};

export const fetchContactsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_CONTACTS_FAIL,
        error: error
    };
};

export const fetchContacts = (token, userId) => {
    return dispatch => {
        dispatch(fetchContactsStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get( 'https://contact-keeper-12674.firebaseio.com/contacts.json' + queryParams )
        .then( res => {
            const fetchedContacts = [];
            for ( let key in res.data ) {
                fetchedContacts.push( {
                    ...res.data[key],
                    id: key
                } );
            }
            dispatch(fetchContactsSuccess(fetchedContacts));
        } )
            .catch( error => {
                dispatch(fetchContactsFail(error));
            } );
    };
};

export const onDeleteContact = ( id ) => {
    return {
        type: actionTypes.DELETE_CONTACT,
        id: id
    };
};

export const deleteContact = (id, token) => {
    return dispatch => {
        axios.delete( `https://contact-keeper-12674.firebaseio.com/contacts/${id}.json?auth=` + token)
          .then((response) => {
            dispatch(onDeleteContact(id))
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    };
};

export const setCurrent = ( contact ) => {
    return {
        type: actionTypes.SET_CURRENT,
        contact: contact
    };
};

export const deleteCurrent = () => {
    return {
        type: actionTypes.DELETE_CURRENT,
    };
};

export const onUpdateContact = ( contact ) => {
    return {
        type: actionTypes.UPDATE_CONTACT,
        contact: contact
    };
};

export const updateContact = (contact, token, userId) => {
    return dispatch => {
        axios.put( `https://contact-keeper-12674.firebaseio.com/contacts/${contact.id}.json?auth=` + token,{
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        type: contact.type,
        userId: userId
    })
          .then((response) => {
            dispatch(onUpdateContact(contact))
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    };
};

export const onFilterContacts = ( contacts ) => {
    return {
        type: actionTypes.FILTER_CONTACTS,
        contacts: contacts
    };
};
 
export const filterContacts = (query) => {
    return dispatch => {
        axios.get( 'https://contact-keeper-12674.firebaseio.com/contacts.json?' + query)
          .then(res => {
            const filteredContacts = [];
            for ( let key in res.data ) {
                filteredContacts.push( {
                    ...res.data[key],
                    id: key
                } );
            }
            dispatch(onFilterContacts(filteredContacts));
        } ).catch((error) => {
            console.log(error)
        })
    };
};