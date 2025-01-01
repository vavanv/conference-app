import { useState, useCallback } from 'react';
import { Contact, ContactFormData } from '../types/contact';
import { generateInitialContacts } from '../utils/contactsData';

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>(generateInitialContacts());

  const addContact = useCallback((data: ContactFormData) => {
    const newContact: Contact = {
      id: crypto.randomUUID(),
      ...data
    };
    setContacts(prev => [...prev, newContact]);
    return newContact;
  }, []);

  const updateContact = useCallback((id: string, data: ContactFormData) => {
    setContacts(prev => 
      prev.map(contact => 
        contact.id === id ? { ...contact, ...data } : contact
      )
    );
  }, []);

  const deleteContact = useCallback((id: string) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  }, []);

  return {
    contacts,
    addContact,
    updateContact,
    deleteContact
  };
}