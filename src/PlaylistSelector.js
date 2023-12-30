import React from "react";
import { Select } from "semantic-ui-react";
import { gameStates } from "./config";

const PlaylistSelector = ({ onUpdatePlaylist, playlists, gameState }) => {
  const onSubmit = (value) => {
    onUpdatePlaylist(value);
  };

  const options = Object.keys(playlists).map((playlist, i) => ({
    key: playlist,
    value: playlist,
    text: playlists[playlist].name,
  }));

  return (
    <div>
      <Select
        style={{ minWidth: "200px" }}
        onChange={(event, data) => onSubmit(data.value)}
        options={options}
        defaultValue="70s"
        disabled={gameState === gameStates.PLAYING}
      />
    </div>
  );
};

export default PlaylistSelector;
