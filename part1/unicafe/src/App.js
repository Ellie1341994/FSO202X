import React, { useState } from "react";

const baseFeedbackData = { good: 0, bad: 0, neutral: 0 };

const Title = ({ text }) => <h1>{text}</h1>;
const StatisticLine = ({ text, value }) => <p>{text + ": " + value}</p>;
const Statistics = ({ data }) => {
  const all = data.good + data.bad + data.neutral;
  const hasStats = Boolean(all);
  const average = (data.good - data.bad) / (all || 1);
  const positivePortion = (100 * data.good) / (all || 1);
  return (
    <div>
      <Title text="Statitics" />
      {hasStats ? (
        <>
          <StatisticLine text="Good" value={data.good} />
          <StatisticLine text="Bad" value={data.bad} />
          <StatisticLine text="Neutral" value={data.neutral} />
          <StatisticLine text="All" value={all} />
          <StatisticLine text="Average" value={average} />
          <StatisticLine text="Positive" value={positivePortion} />
        </>
      ) : (
        "No Feedback given"
      )}
    </div>
  );
};
const Button = ({ text, action }) => <button onClick={action}>{text}</button>;
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
      <Button text="good" action={addFeedback("good")} />
      <Button text="bad" action={addFeedback("bad")} />
      <Button text="neutral" action={addFeedback("neutral")} />
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
