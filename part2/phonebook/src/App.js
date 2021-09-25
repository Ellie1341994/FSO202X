import React, { useState, useEffect } from "react";
import { Title } from "./components/Title";
import { PhonebookForm } from "./components/PhonebookForm";
import { PhonebookContents } from "./components/PhonebookContents";
import { Notification } from "./components/Notification";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [notify, setNotify] = useState({
    status: false,
    message: "",
    type: "",
  });
  useEffect(() => {
    if (notify.status) {
      setTimeout(
        () =>
          setNotify({
            status: false,
            message: "",
            type: "",
          }),
        2000
      );
    }
  }, [notify]);
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
    const notifyCallback = (error = false) => {
      const notify = {
        status: true,
        message: error
          ? `${personFound.name}'s information has alredy been deleted`
          : personFound
          ? `Updated ${personFound.name} number`
          : `Added ${newName}`,
        type: error ? "error" : personFound ? "update" : "add",
      };
      setNotify(notify);
    };
    if (personFound) {
      const updatedPerson = { ...personFound, number: newNumber };
      return updatePerson(updatedPerson, personIndex, notifyCallback);
    } else {
      const newPerson = { name: newName, number: newNumber };
      return addPerson(newPerson, notifyCallback);
    }
  };
  const updatePerson = (person, personIndex, callback) => {
    let updatedPersons = undefined;
    personsService
      .update(person.id, person)
      .then((response) => {
        updatedPersons = [...persons];
        updatedPersons[personIndex] = response.data;
        callback();
      })
      .catch((_error) => {
        updatedPersons = persons.filter((currentPerson) => {
          return currentPerson.id !== person.id;
        });
        callback(true);
      })
      .finally(() => {
        setPersons(updatedPersons);
      });
  };
  const addPerson = (newPerson, callback) => {
    console.log(newPerson);
    personsService
      .add(newPerson)
      .then((response) => {
        callback();
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
      <Notification
        type={notify.type}
        display={notify.status}
        text={notify.message}
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
