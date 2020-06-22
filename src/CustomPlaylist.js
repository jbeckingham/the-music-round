import React, { useState, useEffect } from "react";
import { Input, Form, Icon, Popup } from "semantic-ui-react";

const popupText =
    "To get your spotify playlist id, naviate to the playlist in your Spotify app. \n Click the More icon (...) -> Share -> Copy Spotify URI. \n You should have copied text of the form spotify:playlist:7cnpWoxyYpTfdi6MdLZRCZ. \n The Id is the alphanumberical string after 'spotify:playlist:'.";

const CustomPlaylist = ({ onUpdateCustomPlaylistId, customPlaylistInfo }) => {
    const [typingStarted, setTypingStarted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onChange = (event) => {
        event.preventDefault();
        setTypingStarted(Boolean(event.target.value));
        if (event.target.value.includes("spotify:playlist")) {
            setErrorMessage(
                'Looks like you\'ve pasted the whole playlist URI. Trying removing "spotify:playlist:" from the beginning.'
            );
        } else {
            setErrorMessage("Invalid playlist id.");
        }
        onUpdateCustomPlaylistId(event.target.value);
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
                            style={{ display: "inline-block" }}
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
                                style={{ display: "inline-block" }}
                            />
                        ) : (
                            <Icon
                                name="thumbs down outline"
                                size="large"
                                inverted
                                color="red"
                                style={{ display: "inline-block" }}
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
