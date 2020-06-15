import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";

const Reveal = ({ onReveal, currentSongData, timerOn }) => {
    const onSubmit = (event) => {
        event.preventDefault();
        onReveal();
    };

    return (
        <Button
            inverted
            onClick={onSubmit}
            type="submit"
            color="yellow"
            size="massive"
            disabled={!currentSongData || timerOn}
        >
            Reveal
        </Button>
    );
};

export default Reveal;
