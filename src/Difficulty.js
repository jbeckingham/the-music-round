import React from "react";
import { Select } from "semantic-ui-react";
import { gameStates } from "./config";

const Difficulty = ({
  onUpdateDifficulty,
  difficulty,
  difficultyData,
  gameState,
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
      <Select
        style={{ minWidth: "200px" }}
        onChange={(event, data) => onSubmit(data.value)}
        options={difficultyOptions}
        defaultValue={difficulty.value}
        disabled={gameState === gameStates.PLAYING}
      />
    </div>
  );
};

export default Difficulty;
