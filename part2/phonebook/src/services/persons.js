import axios from "axios";
const addPerson = (newPerson) =>
  axios.post("http://localhost:3001/persons", newPerson);
const getAllPersons = () => axios.get("http://localhost:3001/persons");
const deletePerson = () => {};
const updatePerson = () => {};

export default { addPerson, updatePerson, deletePerson, getAllPersons };
