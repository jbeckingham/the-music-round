import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";

const Replay = ({ onReplay, currentSongData, timerOn }) => {
    const onSubmit = (event) => {
        event.preventDefault();
        onReplay();
    };

    return (
        <Button
            inverted
            onClick={onSubmit}
            type="submit"
            color="orange"
            size="massive"
            disabled={!currentSongData || timerOn}
        >
            Replay
        </Button>
    );
};

export default Replay;
