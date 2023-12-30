import React from "react";
import { Header } from "semantic-ui-react";

const SongInfo = ({ currentSongData }) => {
  const artists = currentSongData.artists
    .map((artist) => artist.name)
    .join(", ");

  return (
    <>
      <h2>{currentSongData.name}</h2>
      <h3>{artists}</h3>
      <img alt="" src={currentSongData.album.images[0].url} width="130px"></img>
    </>
  );
};

export default SongInfo;
