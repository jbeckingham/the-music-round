import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";

const Go = ({ onGo, timerOn }) => {
    const onSubmit = (event) => {
        event.preventDefault();
        onGo();
    };

    return (
        <Button
            inverted
            onClick={onSubmit}
            type="submit"
            color="green"
            size="massive"
            disabled={timerOn}
        >
            Go
        </Button>
    );
};

export default Go;
