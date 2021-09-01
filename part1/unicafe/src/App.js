import React, { useState } from "react";

const baseFeedbackData = { good: 0, bad: 0, neutral: 0 };
const Title = ({ text }) => <h1>{text}</h1>;
const Feedback = ({ type, value }) => <p>{type + ": " + value}</p>;
const UserFeedback = ({ data }) => {
  return (
    <div>
      <Title text="Statitics" />
      <Feedback type="good" value={data.good} />
      <Feedback type="bad" value={data.bad} />
      <Feedback type="neutral" value={data.neutral} />
    </div>
  );
};
const FeedbackPanel = ({ data, action }) => {
  const addFeedback = (type) => {
    return () => {
      data[type] += 1;
      const newFeedback = { ...data };
      action(newFeedback);
    };
  };
  return (
    <div>
      <Title text="Give Feedback" />
      <button onClick={addFeedback("good")}>good</button>
      <button onClick={addFeedback("bad")}>bad</button>
      <button onClick={addFeedback("neutral")}>neutral</button>
    </div>
  );
};
const App = () => {
  const [feedback, setFeedback] = useState(baseFeedbackData);
  return (
    <>
      <FeedbackPanel data={feedback} action={setFeedback} />
      <UserFeedback data={feedback} />
    </>
  );
};

export default App;
