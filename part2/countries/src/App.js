import React, { useState, useEffect } from "react";
import axios from "axios";
import { Title } from "./components/Title";
import { Contents } from "./components/Contents";
import { CountriesSearcher } from "./components/CountriesSearcher";

const App = () => {
  const [countries, setPersons] = useState([]);
  const [filters, setFilters] = useState({ max: 10, countryName: "" });
  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => setPersons(response.data));
  }, []);

  return (
    <>
      <Title text="Countries" />
      <CountriesSearcher filters={filters} setFilters={setFilters} />
      <Contents data={countries} filters={filters} />
    </>
  );
};

export default App;
