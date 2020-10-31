import React from "react";
import { Button } from "semantic-ui-react";

const Difficulty = ({
    onUpdateDifficulty,
    difficulty,
    difficultyData,
    timerOn,
}) => {
    const onSubmit = (event) => {
        event.preventDefault();
        onUpdateDifficulty(event.target.id);
    };

    return (
        <div>
            <h3>Choose your difficulty:</h3>
            <Button.Group widths={Object.keys(difficultyData).length}>
                {Object.keys(difficultyData).map((id, i) => (
                    <Button
                        id={id}
                        onClick={onSubmit}
                        key={i}
                        active={difficulty === id}
                        disabled={timerOn}
                    >
                        {difficultyData[id].name}
                    </Button>
                ))}
            </Button.Group>
        </div>
    );
};

export default Difficulty;
