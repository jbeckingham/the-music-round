import React, { useState } from "react";
import { Input, Form, Icon, Popup, Loader } from "semantic-ui-react";

const popupText =
  "You can paste your Spotify playlist ID or the whole link. To get the link, naviate to the playlist in your Spotify app. \n Click the More icon (...) -> Share -> Copy link to playlist";

const CustomPlaylist = ({
  onUpdateCustomPlaylistId,
  customPlaylistInfo,
  fetchingCustomPlaylist,
}) => {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onChange = async (event) => {
    event.preventDefault();
    setValue(event.target.value);
    if (!event.target.value) return;
    const id = event.target.value.replace(
      "https://open.spotify.com/playlist/",
      ""
    );
    setValue(event.target.value);
    onUpdateCustomPlaylistId(id);
    setErrorMessage("Invalid playlist id.");
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
        <Form.Field style={{ display: "inline-block", padding: "10px" }}>
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
        {fetchingCustomPlaylist && <Loader size="small" active />}
        {value !== "" && !fetchingCustomPlaylist && (
          <>
            {customPlaylistInfo.spotifyName ? (
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
      {value !== "" && customPlaylistInfo.spotifyName ? (
        <p className="custom-import-success">
          Successfully fetched {customPlaylistInfo.songs.length} tracks from
          playlist <strong>{customPlaylistInfo.spotifyName}</strong>
        </p>
      ) : (
        <>
          <>
            {value && !fetchingCustomPlaylist && (
              <p className="custom-import-error">{errorMessage}</p>
            )}
          </>
        </>
      )}
    </>
  );
};

export default CustomPlaylist;
