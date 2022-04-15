import React, { useEffect, useState } from 'react';
import personService from '../src/services/persons';

const App = (props) => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setNewSearch] = useState('');

  const addPerson = (e) => {
    e.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber
    };

    const hasVal = persons.some(person => person.name === newPerson.name);

    if (hasVal) {
      alert(`Você foi add ${newName}!`);
    } else {
      personService
        .addPerson(newPerson)
        .then(person => {
          setPersons(persons.concat(person));
        });
    };

    setNewName('');
    setNewNumber('');
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearchChange = (e) => {
    setNewSearch(e.target.value);
  };

  const filtered = !search 
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    personService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons);
      })
  }, [])

  return (
    <>
      <h2>Telefone</h2>
      Filtrar pessoa:{" "}
      <input type="text" value={search} onChange={handleSearchChange} />
      <h2>Add nova pessoa</h2>
      <form onSubmit={addPerson}>
        <div>
          Nome:{" "}
          <input type="text" value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Numero:{" "}
          <input type="text" value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numeros</h2>
      {filtered.map((p) => {
        return (
          <p key={p.name}>
            {p.name} - {p.number}
          </p>
        );
      })}
    </>
  );
};

export default App;