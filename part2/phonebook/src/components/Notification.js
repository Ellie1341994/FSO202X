import React from "react";

export const Notification = ({ type = "add", text, display = false }) => {
  const border = `1px solid ${type === "add" ? "#373" : "#733"}`;
  const backgroundColor = type === "add" ? "#efe" : "eff";
  const style = {
    border,
    backgroundColor,
    borderRadious: "1px 1px ",
    width: "80%",
    margin: "0 auto",
  };
  return display ? <p style={style}>{text}</p> : null;
};
