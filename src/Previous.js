import React from "react";
import { Button } from "semantic-ui-react";

const Previous = ({ onPrevious, gameState, disabled }) => {
  const onSubmit = (event) => {
    event.preventDefault();
    onPrevious();
  };

  return (
    <Button
      circular
      icon="backward"
      inverted
      onClick={onSubmit}
      type="submit"
      color="white"
      size="massive"
      disabled={disabled}
    />
  );
};

export default Previous;
