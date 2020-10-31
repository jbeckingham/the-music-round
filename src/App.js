import React, { useState, useEffect } from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import Player from "./Player";
import hash from "./hash";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { Button } from "semantic-ui-react";

require("dotenv").config();
const redirectDomain = process.env.REACT_APP_SITE_DOMAIN;

const App = () => {
    const [ready, setReady] = useState(false);
    const [spotifyPlayer, setSpotifyPlayer] = useState(null);
    const [token, setToken] = useState(null);

    window.onSpotifyWebPlaybackSDKReady = () => {
        console.log("connecting with token..." + token);
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

    useEffect(() => {
        let _token = hash.access_token;

        if (_token) {
            console.log("setting token...");
            setToken(_token);
        }
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                {!token && (
                    <a
                        className="btn btn--loginApp-link"
                        href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectDomain}&scope=${scopes.join(
                            "%20"
                        )}&response_type=token&show_dialog=true`}
                    >
                        <Button inverted size="massive" color="green">
                            Login To Spotify
                        </Button>
                    </a>
                )}
                {token && (
                    <Player
                        token={token}
                        ready={ready}
                        spotifyPlayer={spotifyPlayer}
                    />
                )}
            </header>
        </div>
    );
};

export default App;
