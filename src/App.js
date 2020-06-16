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
    const [token, setToken] = useState(null);

    useEffect(() => {
        let _token = hash.access_token;

        if (_token) {
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
                {token && <Player token={token} />}
            </header>
        </div>
    );
};

export default App;
