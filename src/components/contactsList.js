import React, {useEffect, Fragment} from 'react';
import ContactItem from './contactItem';
import {connect} from 'react-redux';
import {fetchContacts} from '../actions/contacts'

 const ContactsList = (props) => {

    useEffect(() => {
       props.dispatch(fetchContacts(props.auth.token, props.auth.userId));
      }, []);
    if (props.contacts.contacts !== null && props.contacts.contacts.length === 0) {
    return <h4>Please add a contact</h4>;
    }
    return (
        <Fragment>
            {props.contacts.contacts.map(contact => (
                  <ContactItem contact={contact}  key={contact._id}/>
              ))}
        </Fragment>
       
    )
}

const mapStateToProps = ({contacts, auth}) => {
    return {contacts, auth}
}
export default connect(mapStateToProps)(ContactsList)
