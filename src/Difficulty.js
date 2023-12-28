import React from "react";
import { Select } from "semantic-ui-react";

const Difficulty = ({
  onUpdateDifficulty,
  difficulty,
  difficultyData,
  timerOn,
}) => {
  const onSubmit = (value) => {
    onUpdateDifficulty(value);
  };

  const difficultyOptions = difficultyData.map((i) => ({
    key: i.value,
    value: i.value,
    text: i.name,
  }));

  return (
    <div>
      <h3>Choose your difficulty:</h3>
      <Select
        style={{ minWidth: "200px" }}
        onChange={(event, data) => onSubmit(data.value)}
        options={difficultyOptions}
        defaultValue={difficulty.value}
        disabled={timerOn}
      />
    </div>
  );
};

export default Difficulty;
