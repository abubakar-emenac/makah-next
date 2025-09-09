import React from 'react';
import Navbar from './NavBar';
import ContactInfo from './ContactInfo';

const ContactPage = () => {
    return (
        <>
            <div className='flex flex-col mt-8 w-full max-w-[95%] mx-auto'>
                <Navbar textColor='black' />
                ContactPage
                <ContactInfo />
            </div>
        </>
    )
}

export default ContactPage;