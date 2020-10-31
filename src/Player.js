import React from "react";
import MusicRound from "./MusicRound";
import { Loader } from "semantic-ui-react";

const Player = ({ token, ready, spotifyPlayer }) => {
    const play = ({
        spotify_uri,
        playerInstance: {
            _options: { id },
        },
    }) => {
        return fetch(
            `https://api.spotify.com/v1/me/player/play?device_id=${id}`,
            {
                method: "PUT",
                body: JSON.stringify({ uris: [spotify_uri] }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    };

    const pause = ({
        playerInstance: {
            _options: { id },
        },
    }) => {
        return fetch(
            `https://api.spotify.com/v1/me/player/pause?device_id=${id}`,
            {
                method: "PUT",
                body: JSON.stringify({}),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    };

    const getPlaylistSongs = (playlistUri) => {
        return fetch(
            `https://api.spotify.com/v1/playlists/${playlistUri}/tracks`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((response) => response.json())
            .then((data) => data.items);
    };

    const getPlaylistInfo = (playlistUri) => {
        return fetch(`https://api.spotify.com/v1/playlists/${playlistUri}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            return response.ok ? response.json() : null;
        });
    };

    const pauseSong = () => {
        return pause({
            playerInstance: spotifyPlayer,
        });
    };

    const playSong = (id) => {
        return play({
            playerInstance: spotifyPlayer,
            spotify_uri: "spotify:track:" + id,
        });
    };

    return (
        <>
            {!ready ? (
                <Loader active>Setting up the player...</Loader>
            ) : (
                <MusicRound
                    playSong={playSong}
                    pauseSong={pauseSong}
                    getPlaylistSongs={getPlaylistSongs}
                    getPlaylistInfo={getPlaylistInfo}
                />
            )}
        </>
    );
};

export default Player;
