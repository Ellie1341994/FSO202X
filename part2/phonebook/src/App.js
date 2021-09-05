import React, { useState, useEffect } from "react";
import axios from "axios";
import { Title } from "./components/Title";
import { PhonebookForm } from "./components/PhonebookForm";
import { PhonebookContents } from "./components/PhonebookContents";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    persons.find((person) => person.name === newName)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(newPerson));
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