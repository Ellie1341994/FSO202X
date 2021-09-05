import React, { useState } from "react";
import { Title } from "./components/Title";
import { PhonebookForm } from "./components/PhonebookForm";
import { PhonebookContents } from "./components/PhonebookContents";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");
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
