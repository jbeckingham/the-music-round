import React, { useState, useEffect } from "react";
import { Input, Form, Icon, Popup } from "semantic-ui-react";

const popupText =
    "You can paste your Spotify playlist ID or the whole URI. To get the URI, naviate to the playlist in your Spotify app. \n Click the More icon (...) -> Share -> Copy Spotify URI.";

const CustomPlaylist = ({ onUpdateCustomPlaylistId, customPlaylistInfo }) => {
    const [typingStarted, setTypingStarted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onChange = (event) => {
        event.preventDefault();
        const id = event.target.value.replace("spotify:playlist:", "");
        setTypingStarted(Boolean(event.target.value));
        setErrorMessage("Invalid playlist id.");
        onUpdateCustomPlaylistId(id);
    };

    return (
        <>
            <Form
                size="medium"
                style={{
                    width: "70%",
                    margin: "auto",
                    paddingTop: "10px",
                    display: "inline-block",
                }}
            >
                <Popup
                    content={popupText}
                    trigger={
                        <Icon
                            name="info circle"
                            size="large"
                            style={{
                                display: "inline-block",
                                marginTop: "17px",
                            }}
                        />
                    }
                />
                <Form.Field
                    style={{ display: "inline-block", padding: "10px" }}
                >
                    <Input
                        placeholder={
                            customPlaylistInfo
                                ? customPlaylistInfo.id
                                : "Paste playlist id here..."
                        }
                        onChange={onChange}
                        style={{ display: "inline-block" }}
                    />
                </Form.Field>
                {typingStarted && (
                    <>
                        {Boolean(customPlaylistInfo) ? (
                            <Icon
                                name="thumbs up outline"
                                size="large"
                                inverted
                                color="green"
                                style={{
                                    display: "inline-block",
                                    marginTop: "17px",
                                }}
                            />
                        ) : (
                            <Icon
                                name="thumbs down outline"
                                size="large"
                                inverted
                                color="red"
                                style={{
                                    display: "inline-block",
                                    marginTop: "17px",
                                }}
                            />
                        )}
                    </>
                )}
            </Form>
            {customPlaylistInfo ? (
                <p className="custom-import-success">
                    Successfully imported{" "}
                    {customPlaylistInfo.tracks.items.length} tracks from
                    playlist <strong>{customPlaylistInfo.name}</strong>
                </p>
            ) : (
                <>
                    {typingStarted && (
                        <p className="custom-import-error">{errorMessage}</p>
                    )}
                </>
            )}
        </>
    );
};

export default CustomPlaylist;
