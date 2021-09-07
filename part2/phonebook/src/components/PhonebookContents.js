import React from "react";
import { Title } from "./Title";
const PhonebookSearch = ({ value, setter }) => (
  <label>
    Search:
    <input
      placeholder="Search peope by name"
      value={value}
      onChange={(event) => setter(event.target.value)}
    />
  </label>
);
export const PhonebookContents = ({
  content = [],
  searchInputProps,
  deleteCallback,
}) => (
  <>
    <Title text="Numbers" type="secondary" />
    <PhonebookSearch
      value={searchInputProps.value}
      setter={searchInputProps.setter}
    />
    {content
      .filter(({ name }) =>
        name.toLowerCase().includes(searchInputProps.value.toLowerCase())
      )
      .map(({ name, number, id }, index) => (
        <h2 key={`${name}#${index}`}>
          {name + " " + number}
          <button data-person-id={id} onClick={deleteCallback}>
            X
          </button>
        </h2>
      ))}
  </>
);
