import React from 'react';
import ContactForm from './contactForm';
import ContactsList from './contactsList';
import SearchContacts from './searchContacts';


 const contacts = () => {
    return (
        <div className='grid-2'>
            <div>
            <ContactForm />
            </div>
            <div>
            <SearchContacts/>
            <ContactsList/>
            </div>
        </div>
    );
}

export default contacts;
