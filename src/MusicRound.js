import React, { useEffect, useState } from "react";
import "./App.css";
import Play from "./Play";
import Difficulty from "./Difficulty";
import PlaylistSelector from "./PlaylistSelector";
import SongInfo from "./SongInfo";
import Reveal from "./Reveal";
import { Divider, Grid } from "semantic-ui-react";
import Timer from "./Timer";
import CustomPlaylist from "./CustomPlaylist";
import { find, propEq, evolve, pipe, filter, path, assocPath } from "ramda";
import Next from "./Next";
import Previous from "./Previous";
import { playlistData, difficultyData, gameStates } from "./config";

const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const MusicRound = ({
  playSong,
  pauseSong,
  getPlaylistSongs,
  getPlaylistInfo,
}) => {
  const [difficulty, setDifficulty] = useState("easy");
  const [playlist, setPlaylist] = useState("70s");
  const [playlists, setPlaylists] = useState(playlistData);
  const [gameState, setGameState] = useState(gameStates.READY);
  const [fetchingCustomPlaylist, setFetchingCustomPlaylist] = useState(false);

  const setPlaylistSongs = (songs, playlist) => {
    const sortedSongs = songs
      ? pipe((filter((item) => item.track), shuffle))(songs)
      : [];
    const newPlaylists = evolve({
      [playlist]: (data) => ({
        ...data,
        songs: sortedSongs,
        fetched: true,
      }),
    })(playlists);
    setPlaylists(newPlaylists);
  };

  const fetchPlaylistSongs = (playlist) => {
    const playlistData = playlists[playlist];
    if (playlistData.fetched) return;
    getPlaylistSongs(playlistData.playlistId).then((songs) => {
      setPlaylistSongs(songs, playlist);
    });
  };

  const onUpdateCustomPlaylistId = (value) => {
    setFetchingCustomPlaylist(true);
    getPlaylistInfo(value).then((data) => {
      if (data) {
        const sortedSongs = data.tracks.items ? shuffle(data.tracks.items) : [];
        const newPlaylists = evolve({
          custom: (playlistData) => ({
            ...playlistData,
            songs: sortedSongs,
            fetched: true,
            spotifyName: data.name,
          }),
        })(playlists);
        setPlaylists(newPlaylists);
        setFetchingCustomPlaylist(false);
      } else {
        setPlaylists({
          ...playlists,
          custom: { ...playlists.custom, songs: [], spotifyName: null },
        });
        setFetchingCustomPlaylist(false);
      }
    });
  };

  useEffect(() => fetchPlaylistSongs("70s"), []);

  const activeDifficulty = find(propEq(difficulty, "value"))(difficultyData);
  const currentPlaylist = playlists[playlist];
  const songPosition = currentPlaylist.position;
  const currentSongData = path(["songs", songPosition, "track"])(
    currentPlaylist
  );

  const onPlay = () => {
    setGameState(gameStates.PLAYING);
    playSong(currentSongData.id);
  };

  const onTimeUp = () => {
    setGameState(gameStates.TIME_UP);
    pauseSong();
  };

  const onReveal = () => {
    setGameState(gameStates.REVEALED);
    pauseSong();
  };

  const onStop = () => {
    setGameState(gameStates.READY);
    pauseSong();
  };

  const onUpdateDifficulty = (value) => {
    setGameState(gameStates.READY);
    setDifficulty(value);
  };

  const onUpdatePlaylist = (value) => {
    if (value !== "custom") fetchPlaylistSongs(value);
    setPlaylist(value);
    setGameState(gameStates.READY);
  };

  const onPrevious = () => {
    const newPosition = songPosition - 1;
    setPlaylists(assocPath([playlist, "position"], newPosition, playlists));
    playSong(currentPlaylist.songs[newPosition].track.id);
    setGameState(gameStates.PLAYING);
  };

  const onNext = () => {
    const newPosition = songPosition + 1;
    setPlaylists(assocPath([playlist, "position"], newPosition, playlists));
    playSong(currentPlaylist.songs[newPosition].track.id);
    setGameState(gameStates.PLAYING);
  };

  return (
    <>
      <div className="App">
        <PlaylistSelector
          onUpdatePlaylist={onUpdatePlaylist}
          playlists={playlists}
          gameState={gameState}
        />
        <Divider hidden />

        <Difficulty
          onUpdateDifficulty={onUpdateDifficulty}
          difficulty={activeDifficulty}
          difficultyData={difficultyData}
          gameState={gameState}
        />

        {playlist === "custom" && (
          <CustomPlaylist
            onUpdateCustomPlaylistId={onUpdateCustomPlaylistId}
            customPlaylistInfo={playlists.custom}
            fetchingCustomPlaylist={fetchingCustomPlaylist}
          />
        )}

        <Divider hidden />
        <div className="timerBox">
          {gameState === gameStates.REVEALED ? (
            <SongInfo currentSongData={currentSongData} playlist={playlist} />
          ) : (
            <Timer
              key={activeDifficulty.difficultyPlayTime}
              seconds={activeDifficulty.difficultyPlayTime}
              onTimeUp={onTimeUp}
              gameState={gameState}
            />
          )}
        </div>
        <Divider hidden />
        <Grid>
          <Grid.Row centered columns={3}>
            <Grid.Column width={3}>
              <Previous
                onPrevious={onPrevious}
                disabled={
                  gameState === gameStates.PLAYING ||
                  currentPlaylist.songs === undefined ||
                  songPosition === 0
                }
              />
            </Grid.Column>
            <Grid.Column width={3}>
              <Play onPlay={onPlay} onStop={onStop} gameState={gameState} />
            </Grid.Column>
            <Grid.Column width={3}>
              <Next
                onNext={onNext}
                disabled={
                  gameState === gameStates.PLAYING ||
                  currentPlaylist.songs === undefined ||
                  songPosition === currentPlaylist.songs.length - 1
                }
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Reveal onReveal={onReveal} currentSongData={currentSongData} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </>
  );
};

export default MusicRound;
