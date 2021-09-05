import React, { useState, useEffect } from "react";
import axios from "axios";
import { Title } from "./components/Title";
const Countries = ({ data, filters }) => {
  const filteredCountries = data.filter((country) =>
    country.name.toLowerCase().includes(filters.countryName.toLowerCase())
  );
  if (filteredCountries.length === 1) {
    return (
      <div>
        <h3>{filteredCountries[0].name}</h3>
        <p>Capital: {filteredCountries[0].capital}</p>
        <p>Population: {filteredCountries[0].population}</p>
        Languages{" "}
        <ul>
          {filteredCountries[0].languages.map((lang) => (
            <li>{lang.name}</li>
          ))}
        </ul>
        <img
          width="75px"
          height="auto"
          src={filteredCountries[0].flag}
          alt="flag"
        />
      </div>
    );
  } else if (filteredCountries.length <= 10) {
    return filteredCountries.map((country) => <h3>{country.name}</h3>);
  }
  return "Too many matches, specify another filter";
};
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
      <label style={{ margin: "0 auto" }}>
        Search information of up to ten countries:
        <input
          style={{ margin: "0 1%" }}
          value={filters.countryName}
          placeholder="Canada"
          onChange={(event) =>
            setFilters({ ...filters, countryName: event.target.value })
          }
        />
      </label>
      <Countries data={countries} filters={filters} />
    </>
  );
};

export default App;
