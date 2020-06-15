import React, { useEffect, useState } from "react";
import "./App.css";

const SongInfo = ({ currentSongData, genre }) => {
    const getArtists = () => {
        const artists = currentSongData.artists.map((artist) => artist.name);
        return artists.join(", ");
    };

    const getAlbumImage = () => {
        return currentSongData.album.images[0].url;
    };

    console.log(currentSongData);
    console.log(getAlbumImage());

    return (
        <>
            <h3>The song was: {currentSongData.name}</h3>
            <h3>
                By: {getArtists()}
                {genre == "mozart" && " (Originally composed by Mozart)"}
            </h3>
            <img src={getAlbumImage()} width="130px"></img>
        </>
    );
};

export default SongInfo;
