import React, { useState } from "react";

const baseFeedbackData = { good: 0, bad: 0, neutral: 0 };

const Title = ({ text }) => <h1>{text}</h1>;
const Feedback = ({ type, value }) => <p>{type + ": " + value}</p>;
const Statistics = ({ data }) => {
  const all = data.good + data.bad + data.neutral;
  const average = (data.good - data.bad) / (all || 1);
  const positivePortion = (100 * data.good) / (all || 1);
  return (
    <div>
      <Title text="Statitics" />
      <Feedback type="Good" value={data.good} />
      <Feedback type="Bad" value={data.bad} />
      <Feedback type="Neutral" value={data.neutral} />
      <Feedback type="All" value={all} />
      <Feedback type="Average" value={average} />
      <Feedback type="Positive" value={positivePortion} />
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
      <Statistics data={feedback} />
    </>
  );
};

export default App;
