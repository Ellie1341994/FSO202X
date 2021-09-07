import axios from "axios";
const add = (newPerson) =>
  axios.post("http://localhost:3001/persons", newPerson, {
    headers: { "Content-Type": "application/json" },
  });
const getAll = () => axios.get("http://localhost:3001/persons");
const del = (id) => axios.delete(`http://localhost:3001/persons/${id}`);
const update = () => {};

export default { add, update, del, getAll };
