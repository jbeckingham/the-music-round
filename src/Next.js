import React from "react";
import { Button } from "semantic-ui-react";

const Next = ({ onNext, disabled }) => {
  const onSubmit = (event) => {
    event.preventDefault();
    onNext();
  };

  return (
    <Button
      circular
      icon="forward"
      inverted
      onClick={onSubmit}
      type="submit"
      color="white"
      size="massive"
      disabled={disabled}
    />
  );
};

export default Next;
