import axios from "axios";
const options = {
  headers: { "Content-Type": "application/json" },
};
const add = (newPerson) =>
  axios.post("http://localhost:3001/persons", newPerson, options);
const getAll = () => axios.get("http://localhost:3001/persons");
const del = (id) => axios.delete(`http://localhost:3001/persons/${id}`);
const update = (id, updatedPerson) =>
  axios.put(`http://localhost:3001/persons/${id}`, updatedPerson, options);

export default { add, update, del, getAll };
