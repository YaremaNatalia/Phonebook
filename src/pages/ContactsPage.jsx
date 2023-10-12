import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectContactsError,
  selectContactsIsloading,
  selectUserContacts,
} from 'redux/selectors';
import { requestContactsThunk } from 'redux/contactsServices';
import { Loader } from 'components/Loader';
import { FormContainer, FormTitle } from './RegisterPage.styled';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import { ContactForm } from 'components/ContactForm/ContactForm';

const ContactsPage = () => {
  const contacts = useSelector(selectUserContacts);
  const isLoading = useSelector(selectContactsIsloading);
  const error = useSelector(selectContactsError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestContactsThunk());
  }, [dispatch]);

  return (
    <div>
      {isLoading && <Loader />}
      {error && (
        <p className="errorMessage">Whoops, something went wrong: {error}</p>
      )}
      <section>
        <FormContainer>
          <FormTitle>Add new contact</FormTitle>
          <ContactForm />
          {contacts && contacts.length > 0 && <Filter />}
          {contacts && contacts.length > 0 && <ContactList />}
        </FormContainer>
      </section>
    </div>
  );
};

export default ContactsPage;
