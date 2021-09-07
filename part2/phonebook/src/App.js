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

  const handleSubmitPerson = (event) => {
    event.preventDefault();
    let personIndex = undefined;
    const personFound = persons.find((person, index) => {
      personIndex = index;
      return person.name === newName;
    });
    if (personFound) {
      const updatedPerson = { ...personFound, number: newNumber };
      return updatePerson(updatedPerson, personIndex);
    }
    const newPerson = { name: newName, number: newNumber };
    return addPerson(newPerson);
  };
  const updatePerson = (person, personIndex) => {
    personsService
      .update(person.id, person)
      .then((response) => {
        persons[personIndex] = response.data;
        const updatedPersons = [...persons];
        setPersons(updatedPersons);
      })
      .catch((error) => alert("Error occurred!"));
  };
  const addPerson = (newPerson) => {
    console.log(newPerson);
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
      .then((_response) => {
        let updatedPersons = persons.filter((person) => {
          return person.id.toString() !== personToDeleteId;
        });
        setPersons(updatedPersons);
      })
      .catch((_error) => alert("Error occurred!"));
  };
  return (
    <div>
      <Title />
      <PhonebookForm
        submitCallback={handleSubmitPerson}
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
