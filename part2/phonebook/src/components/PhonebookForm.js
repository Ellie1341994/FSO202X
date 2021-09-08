import React from "react";
const NewPhoneBookEntryFormInput = ({ text, inputProps }) => (
  <label>
    {text}:{" "}
    <input
      value={inputProps.value}
      onChange={(event) => inputProps.setter(event.target.value)}
    />
  </label>
);
export const PhonebookForm = ({
  submitCallback,
  nameInputProps,
  numberInputProps,
}) => (
  <form onSubmit={submitCallback}>
    <div>
      <NewPhoneBookEntryFormInput text="name" inputProps={nameInputProps} />
      <NewPhoneBookEntryFormInput text="number" inputProps={numberInputProps} />
      <button type="submit">add or update</button>
    </div>
  </form>
);
