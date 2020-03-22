import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {filterContacts} from '../actions/contacts';

const SearchContacts = (props) => {

    const [enteredFilter, setEnteredFilter] = useState('');

    useEffect(() => {
        const query =
      enteredFilter.length === 0
        ? ''
        : `?orderBy="name"&equalTo="${enteredFilter}"`;
        props.dispatch(filterContacts(query));
        
    },[enteredFilter])

 return (
    <div>
        <form>
        <input
            value={enteredFilter}
            type='text'
            placeholder='Filter Contacts...'
            onChange={e => {
                setEnteredFilter(e.target.value.trim());
            }}
        />
        </form>
        </div>
    );
   
}
const mapStateToProps = ({contacts}) => {
    return {contacts}

}

export default connect(mapStateToProps) (SearchContacts)
