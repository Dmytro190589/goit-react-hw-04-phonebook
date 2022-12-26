import { useState } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import css from './Contacts.module.css';

export default function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  console.log(name, number);

  const handleChange = event => {
    const tagName = event.target.name;
    const inputValue = event.target.value;

    switch (tagName) {
      case 'name':
        setName(inputValue);
        break;
      case 'number':
        setNumber(inputValue);
        break;
      default:
        return;
    }
  };
  const addContact = evt => {
    evt.preventDefault();
    onSubmit({ name, number, id: shortid() });
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={addContact} className={css.form}>
      <label className={css.label}>
        Name:
        <input
          className={css.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
        />
      </label>
      <label className={css.label}>
        Number:
        <input
          className={css.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
        />
      </label>
      <button className={css.btn} type="submit">
        Add contact
      </button>
    </form>
  );
}
ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};
