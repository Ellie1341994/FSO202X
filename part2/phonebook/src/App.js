import React, { useState, useEffect } from "react";
import { Title } from "./components/Title";
import { PhonebookForm } from "./components/PhonebookForm";
import { PhonebookContents } from "./components/PhonebookContents";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    personsService
      .getAllPersons()
      .then((response) => setPersons(response.data));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    if (persons.find((person) => person.name === newName)) {
      return alert(`${newName} is already added to phonebook`);
    }
    personsService.addPerson(newPerson);
    setPersons(persons.concat(newPerson));
  };
  return (
    <div>
      <Title />
      <PhonebookForm
        submitCallback={addPerson}
        numberInputProps={{ value: newNumber, setter: setNewNumber }}
        nameInputProps={{ value: newName, setter: setNewName }}
      />
      <PhonebookContents
        searchInputProps={{ value: searchValue, setter: setSearchValue }}
        content={persons}
      />
    </div>
  );
};

export default App;
