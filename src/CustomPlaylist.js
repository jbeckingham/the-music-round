import React, { useState } from "react";
import { Input, Form, Icon } from "semantic-ui-react";

const CustomPlaylist = ({ onUpdateCustomPlaylistId, customPlaylistInfo }) => {
    const onSubmit = (event) => {
        event.preventDefault();
        onUpdateCustomPlaylistId(event.target.value);
    };

    return (
        <>
            <Form
                onSubmit={onSubmit}
                size="medium"
                style={{
                    width: "70%",
                    margin: "auto",
                    paddingTop: "10px",
                    display: "inline-block",
                }}
            >
                <Icon
                    name="info circle"
                    size="large"
                    style={{ display: "inline-block" }}
                />
                <Form.Field
                    style={{ display: "inline-block", padding: "10px" }}
                >
                    <Input
                        placeholder="Paste playlist id here..."
                        onChange={onSubmit}
                        style={{ display: "inline-block" }}
                    />
                </Form.Field>
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
            </Form>
            {customPlaylistInfo && (
                <p className="custom-import-success">
                    Successfully imported{" "}
                    {customPlaylistInfo.tracks.items.length} tracks from
                    playlist {customPlaylistInfo.name}
                </p>
            )}
        </>
    );
};

export default CustomPlaylist;
