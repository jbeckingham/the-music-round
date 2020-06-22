import React, { useState } from "react";
import MusicRound from "./MusicRound";
import { Loader } from "semantic-ui-react";

const Player = ({ token }) => {
    const [ready, setReady] = useState(false);
    const [spotifyPlayer, setSpotifyPlayer] = useState(null);

    window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
            name: "Web Playback SDK Quick Start Player",
            getOAuthToken: (cb) => {
                cb(token);
            },
            spotify_uri: "spotify:track:7xGfFoTpQ2E7fRF5lN10tr",
        });

        // Error handling
        player.addListener("initialization_error", ({ message }) => {
            console.error(message);
        });
        player.addListener("authentication_error", ({ message }) => {
            console.error(message);
        });
        player.addListener("account_error", ({ message }) => {
            console.error(message);
        });
        player.addListener("playback_error", ({ message }) => {
            console.error(message);
        });

        // Playback status updates
        player.addListener("player_state_changed", (state) => {
            console.log(state);
        });

        // Ready
        player.addListener("ready", ({ device_id }) => {
            console.log("Ready with Device ID", device_id);
            setReady(true);
        });

        // Not Ready
        player.addListener("not_ready", ({ device_id }) => {
            console.log("Device ID has gone offline", device_id);
        });

        // Connect to the player!
        player.connect().then((success) => {
            if (success) {
                console.log(
                    "The Web Playback SDK successfully connected to Spotify!"
                );
                setSpotifyPlayer(player);
            }
        });
    };

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
