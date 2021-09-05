import React, { useState } from "react";
const CountryInformation = ({ capital, population, languages, flag }) => {
  return (
    <>
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>
      Languages{" "}
      <ul>
        {languages.map((lang) => (
          <li>{lang.name}</li>
        ))}
      </ul>
      <img width="75px" height="auto" src={flag} alt="flag" />
    </>
  );
};
export const Country = ({ data, toggable = true }) => {
  const [showInformation, setShowInformation] = useState(!toggable);
  return (
    <div>
      <h3 style={{ display: "inline", marginRight: "1%" }}>{data.name}</h3>
      {toggable && (
        <button onClick={() => setShowInformation(!showInformation)}>
          {showInformation ? "Hide" : "Show"} information
        </button>
      )}
      {showInformation && (
        <CountryInformation
          capital={data.capital}
          population={data.population}
          languages={data.languages}
          flag={data.flag}
        />
      )}
    </div>
  );
};
