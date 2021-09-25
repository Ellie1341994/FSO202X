import React from "react";

export const Notification = ({ type = "add", text, display = false }) => {
  const border = `3px solid ${
    type === "error" ? "#a22" : type === "add" ? "#373" : "#733"
  }`;
  const backgroundColor = type === "add" ? "#efe" : "eff";
  const style = {
    border,
    backgroundColor,
    borderRadious: "25% 25%",
    width: "80%",
    margin: "0 auto",
  };
  return display ? <p style={style}>{text}</p> : null;
};
