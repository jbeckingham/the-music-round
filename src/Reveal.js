import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";

const Reveal = ({ onReveal, currentSongData }) => {
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
            disabled={!currentSongData}
        >
            Reveal
        </Button>
    );
};

export default Reveal;
