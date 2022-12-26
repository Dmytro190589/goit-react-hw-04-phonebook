import { useState, useEffect } from 'react';
import css from './App.module.css';
import ContactForm from './ContactsForm/ContactsForm';
import Filter from './Filter/Filter';
import ContactList from './ContactsList/ContactsList';

export default function App() {
  const userLocalStorage = window.localStorage.getItem('contact');
  const userParsed = JSON.parse(userLocalStorage);

  const [contacts, setContacts] = useState(userParsed ? userParsed : []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contact', JSON.stringify(contacts));
  }, [contacts]);

  const filteredContacts = () => {
    const register = filter.toLowerCase();

    return contacts.filter(i => i.name.toLowerCase().includes(register));
  };

  const deleteItem = itemId => {
    setContacts(contacts.filter(item => item.id !== itemId));
  };

  const filterContacts = data => {
    setFilter(data.currentTarget.value);
  };

  const addContact = contact => {
    contacts.some(e => e.name === contact.name)
      ? alert(`${contact.name} is already in contacts`)
      : setContacts(prevState => [...prevState, contact]);
  };
  const result = filteredContacts();
  return (
    <div className={css.form}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={filterContacts} />
      <ContactList contacts={result} onClick={deleteItem} />
    </div>
  );
}

// export class App extends Component {
//  ;
//   componentDidMount() {
//     const localContact = JSON.parse(localStorage.getItem('contact'));
//     if (localContact) {
//       this.setState({ contacts: localContact });
//     }
//   }
//   componentDidUpdate(prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contact', JSON.stringify(this.state.contacts));
//     }
//   }
//   filteredContacts = () => {
//     const { contacts, filter } = this.state;
//     const register = filter.toLowerCase();
//     return contacts.filter(i => i.name.toLowerCase().includes(register));
//   };

//   deleteItem = itemId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(item => item.id !== itemId),
//     }));
//   };

//   filter = data => {
//     this.setState({ filter: data.currentTarget.value });
//   };

//   addContact = ({ name, number, id }) => {
//     this.state.contacts.some(e => e.name === name)
//       ? alert(`${name} is already in contacts`)
//       : this.setState(prevState => ({
//           contacts: [{ name, number, id }, ...prevState.contacts],
//         }));
//   };

//   render() {

//   }
// }
// export default App;
