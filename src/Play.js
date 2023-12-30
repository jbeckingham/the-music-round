import React from "react";
import { Button } from "semantic-ui-react";
import { gameStates } from "./config";

const Play = ({ onPlay, onStop, gameState }) => {
  const onSubmit = (event) => {
    event.preventDefault();
    const handler = gameState === gameStates.PLAYING ? onStop : onPlay;
    handler();
  };

  const icon = gameState === gameStates.PLAYING ? "stop" : "play";

  return (
    <Button
      circular
      icon={icon}
      inverted
      onClick={onSubmit}
      type="submit"
      color="green"
      size="massive"
    />
  );
};

export default Play;
