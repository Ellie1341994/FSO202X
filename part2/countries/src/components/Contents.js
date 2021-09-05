import React from "react";
import { Country } from "./Country";

const Countries = ({ data }) =>
  data.map((country) => <Country data={country} />);

export const Contents = ({ data, filters }) => {
  const filteredCountries = data.filter((country) =>
    country.name.toLowerCase().includes(filters.countryName.toLowerCase())
  );
  const feedback = "Too many matches, specify another filter";
  if (filteredCountries.length === 1) {
    return <Country toggable={false} data={filteredCountries[0]} />;
  } else if (filteredCountries.length <= 10) {
    return <Countries data={filteredCountries} />;
  }
  return feedback;
};
