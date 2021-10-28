import React, {useRef} from "react";
import ContactCard from "./ContactCard";
import {Link} from 'react-router-dom';

const ContactList = (props) => {
  console.log(props);

  const searchRef = useRef();

  const deleteConactHandler = (id) => {
    props.getContactId(id);
  };

  const filterResults = () =>{
    const searchVal = searchRef.current.value;
    props.filterResults(searchVal);
  }

  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHander={deleteConactHandler}
        key={contact.id}
      />
    );
  });
  return (
  <div className="main">
    <h2>Contact List
    &nbsp;
      <Link to="/add">
        <button className="ui button blue right">Add Contact</button>
      </Link>
    </h2>
    <div className="ui search">
      <div className="ui icon input">
         <input type="text" placeholder="Search Contacts" className="prompt" ref={searchRef} onChange={filterResults}/>
         <i className="search icon"></i>
      </div>
    </div>
    <div className="ui celled list">{renderContactList}</div>
  </div>
  );
};

export default ContactList;
