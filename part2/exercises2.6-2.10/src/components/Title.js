import React from "react";
export const Title = ({ text = "Phonebook", type = "main" }) =>
  type === "main" ? <h1>{text}</h1> : <h2>{text}</h2>;
