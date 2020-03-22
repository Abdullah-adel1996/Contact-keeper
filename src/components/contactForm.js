import React, {useState, useEffect} from 'react';
import { addContact, deleteCurrent, updateContact} from '../actions/contacts';
import {connect} from 'react-redux';


 const ContactForm = (props) => {

  const {current} = props.contacts;


  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
        userId: props.auth.userId

      });
    }
  }, [current]);

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
        userId: props.auth.userId
      });
    
    const onChange = e =>
        setContact({ ...contact, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (current === null) {
        props.dispatch(addContact(contact, props.auth.token));
      } else {
        props.dispatch(updateContact(contact, props.auth.token, props.auth.userId));
      }
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
        userId: props.auth.userId

      });
      deleteAll();
    };
    
    const deleteAll = () => {
      props.dispatch(deleteCurrent());
    };

    return (
    <form onSubmit={handleSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        required
        value={contact.name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={contact.email}
        onChange={onChange}
        required
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={contact.phone}
        onChange={onChange}
        required
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={contact.type === 'personal'}
        onChange={onChange}
      />{' '}
      Personal{' '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={contact.type === 'professional'}
        onChange={onChange}
      />{' '}
      Professional
      <div>
        <input
          type='submit'
          value={current ? 'Update Contact' : 'Add Contact'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={deleteAll}>
            Clear
          </button>
        </div>
      )}
    </form>
    )
}

const mapStateToProps = ({contacts, auth}) => {
  return {contacts, auth}
}
export default connect(mapStateToProps)(ContactForm);
