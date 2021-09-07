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
      .getAll()
      .then((response) => setPersons(response.data))
      .catch((error) => console.log(error));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    if (persons.find((person) => person.name === newName)) {
      return alert(`${newName} is already added to phonebook`);
    }
    personsService
      .add(newPerson)
      .then((response) => {
        setPersons(persons.concat(response.data));
      })
      .catch(() => alert("Error occurred!"));
  };
  const deletePerson = async (event) => {
    event.preventDefault();
    const personToDeleteId = event.target.dataset.personId;
    personsService
      .del(personToDeleteId)
      .then((response) => {
        let updatedPersons = persons.filter((person) => {
          return person.id.toString() !== personToDeleteId;
        });
        setPersons(updatedPersons);
      })
      .catch((error) => alert("Error occurred!"));
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
        deleteCallback={deletePerson}
      />
    </div>
  );
};

export default App;
