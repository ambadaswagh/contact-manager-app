import React, { useState, useEffect } from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { uuid } from "uuidv4";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import EditContact from "./EditContact";
import ContactList from "./ContactList";
import ContactDetails from './ContactDetails'

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts,  { id: uuid(), ...contact } ]);
  };

  const updateContactHandler = (contact) => {
    setContacts(contacts.map((obj)=>{
     return obj.id == contact.id ? { ...contact } : obj;
    }));
  };

  const filterResults = (searchText) => {

    setSearchTerm(searchText);

    if(searchText !=""){ 
      const newContactList = contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(searchText.toLowerCase())
      })
      setSearchResult(newContactList);
    }else{
      setSearchResult(contacts);
    }

  }

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveContacts) setContacts(retriveContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact render={(props) => (
          <ContactList
          {...props} 
          contacts={ searchTerm.length ==0 ? contacts : searchResult} 
          getContactId={removeContactHandler}
          filterResults={filterResults} 
          />
          )}
          />
          <Route path="/add" render={(props) => (
          <AddContact
          {...props} 
          addContactHandler={addContactHandler} 
          />
          )}
         />
         <Route path="/edit" render={(props) => (
          <EditContact
          {...props} 
          updateContactHandler={updateContactHandler} 
          />
          )}
         />
         <Route path="/contact/:id" component={ContactDetails} />
        </Switch>
       
        {/* <AddContact addContactHandler={addContactHandler} />
        <ContactList contacts={contacts} getContactId={removeContactHandler} /> */}
      </BrowserRouter>
     
    </div>
  );
}

export default App;
