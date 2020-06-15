import React, { useState } from "react";
import { Form, Button, Select } from "semantic-ui-react";

const Genre = ({ onUpdateGenre, genres, timerOn }) => {
    const onSubmit = (value) => {
        onUpdateGenre(value);
    };

    const options = Object.keys(genres).map((genre, i) => ({
        key: genre,
        value: genre,
        text: genres[genre].name,
    }));

    return (
        <div>
            <h3>Choose your genre</h3>
            <Select
                style={{ minWidth: "200px" }}
                onChange={(event, data) => onSubmit(data.value)}
                options={options}
                placeholder="70s"
                disabled={timerOn}
            />
        </div>
    );
};

export default Genre;
