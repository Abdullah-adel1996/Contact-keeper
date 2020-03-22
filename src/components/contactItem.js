import React from 'react';
import {deleteContact, setCurrent} from '../actions/contacts';
import {connect} from 'react-redux';


const ContactItem = (props) => {
  

  const {id, name, email, phone, type} = props.contact;

  const onDelete = () => {
    props.dispatch(deleteContact(id, props.auth.token))
  }

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open' /> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone' /> {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => props.dispatch(setCurrent(props.contact))}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

const mapStateToProps = ({auth}) => {
  return {auth}

}
export default connect(mapStateToProps)(ContactItem);
