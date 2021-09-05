import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchValue, setSearchValue ] = useState('')
  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {name : newName, number: newNumber};
     persons.find((person) => person.name === newName)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(newPerson))
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <label>
          name: <input value={newName} onChange={(event) => setNewName(event.target.value)}/>
        </label>
        <label>
          number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)}/>
        </label>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
          <label>Search:
      <input placeholder="Search peope by name" value={searchValue} onChange={(event) => setSearchValue(event.target.value)} />
          </label>
      {persons
        .filter(({name}) => name.toLowerCase().includes(searchValue.toLowerCase()))
        .map(({name, number}, index) => <h2 key={`${name}#${index}`}>{name + " " + number}</h2>)}
    </div>
  )
}

export default App
