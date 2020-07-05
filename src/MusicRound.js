import React, { useEffect, useState } from "react";
import "./App.css";
import Go from "./Go";
import Replay from "./Replay";
import Difficulty from "./Difficulty";
import Genre from "./Genre";
import SongInfo from "./SongInfo";
import Reveal from "./Reveal";
import { Divider } from "semantic-ui-react";
import Timer from "./Timer";
import CustomPlaylist from "./CustomPlaylist";

const genreData = {
    "70s": {
        name: "70s",
        playlistId: "37i9dQZF1DWTJ7xPn4vNaz",
    },
    "80s": {
        name: "80s",
        playlistId: "37i9dQZF1DX4UtSsGT1Sbe",
    },
    "90s": {
        name: "90s",
        playlistId: "37i9dQZF1DXbTxeAdrVG2l",
    },
    "00s": {
        name: "00s",
        playlistId: "37i9dQZF1DX4o1oenSJRJd",
    },
    taylorSwift: {
        name: "Taylor Swift",
        playlistId: "37i9dQZF1DX5KpP2LN299J",
    },
    country: {
        name: "Country",
        playlistId: "37i9dQZF1DWZBCPUIUs2iR",
    },
    rAndB: {
        name: "R & B",
        playlistId: "5z1r7bTErmmuBPmYlew77u",
    },
    pitbull: {
        name: "Mr Worldwide",
        playlistId: "37i9dQZF1DXcfXDjovoEpj",
    },
    elton: {
        name: "Elton John",
        playlistId: "37i9dQZF1DX7VulteLVOkq",
    },
    queen: {
        name: "Queen",
        playlistId: "37i9dQZF1DWSNC7AjZWNry",
    },
    burtBacharach: {
        name: "Burt Bacharach",
        playlistId: "37i9dQZF1DZ06evO1MMyZq",
    },
    rollingStones: {
        name: "Rolling Stones",
        playlistId: "37i9dQZF1DX5COO9vTaRpO",
    },
    spiceGirls: {
        name: "Spice Girls",
        playlistId: "37i9dQZF1DWWUJdr9ahsbf",
    },
    boyBands: {
        name: "90s Boy Bands",
        playlistId: "37i9dQZF1DX17dmzi8A5FV",
    },
    dad: {
        name: "Dad Music",
        playlistId: "1JLGQfMBmN1iQjCgTwgpTY",
    },
    disney: {
        name: "Disney",
        playlistId: "37i9dQZF1DX1okZ1ZeITst",
    },
    indie: {
        name: "Indie",
        playlistId: "37i9dQZF1DWYBF1dYDPlHw",
    },
    floRida: {
        name: "Flo Rida",
        playlistId: "37i9dQZF1DZ06evO07bvXy",
    },
    motown: {
        name: "Motown",
        playlistId: "1bZNAY2boFGQn3r06V6QG1",
    },
    mozart: {
        name: "Mozart",
        playlistId: "0fuX5lDLGVqojcZonDHqoJ",
    },
    custom: {
        name: "Custom Playlist",
        playlistId: "",
    },
};

const difficultyData = {
    veryEasy: {
        name: "Very Easy",
        difficultyPlayTime: 20000,
        difficultyGuessTime: 20000,
    },
    easy: {
        name: "Easy",
        difficultyPlayTime: 10000,
        difficultyGuessTime: 10000,
    },
    moderate: {
        name: "Moderate",
        difficultyPlayTime: 7000,
        difficultyGuessTime: 7000,
    },
    hard: {
        name: "Hard",
        difficultyPlayTime: 5000,
        difficultyGuessTime: 5000,
    },
    veryHard: {
        name: "Very Hard",
        difficultyPlayTime: 3000,
        difficultyGuessTime: 3000,
    },
};

const getRandomElement = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

const MusicRound = ({
    playSong,
    pauseSong,
    getPlaylistSongs,
    getPlaylistInfo,
}) => {
    const [difficulty, setDifficulty] = useState("easy");
    const [genre, setGenre] = useState("70s");
    const [playlists, setPlaylists] = useState(genreData);
    const [currentSongData, setCurrentSongData] = useState(null);
    const [playlistSongs, setPlaylistSongs] = useState({});
    const [playedSongIds, setPlayedSongIds] = useState({});
    const [reveal, setReveal] = useState(false);
    const [timerOn, setTimerOn] = useState(false);
    const [timeUp, setTimeUp] = useState(false);
    const [customPlaylistInfo, setCustomPlaylistInfo] = useState(false);

    const fetchSongs = () => {
        Object.entries(genreData).map(([genre, { playlistId }]) => {
            getPlaylistSongs(playlistId).then((songs) => {
                const filteredSongs = songs
                    ? songs.filter((item) => item.track)
                    : [];
                setPlaylistSongs((prevState) => ({
                    ...prevState,
                    [genre]: filteredSongs || [],
                }));
                if (!songs && genre != "custom") {
                    const { [genre]: tmp, ...rest } = playlists;
                    setPlaylists(rest);
                }
            });
        });
    };

    useEffect(fetchSongs, []);

    const getDifficultyPlayTime = () =>
        difficultyData[difficulty].difficultyPlayTime;

    const generateNewSong = () => {
        let playedGenreSongs = playedSongIds[genre] || [];
        const unplayedGenreSongs = playlistSongs[genre].filter(
            (song) => !playedGenreSongs.includes(song.track.id)
        );
        let songsToChooseFrom = unplayedGenreSongs;
        if (unplayedGenreSongs.length == 0) {
            playedGenreSongs = [];
            songsToChooseFrom = playlistSongs[genre];
        }
        if (songsToChooseFrom.length != 0) {
            const song = getRandomElement(songsToChooseFrom);
            setCurrentSongData(song.track);
            setPlayedSongIds({
                ...playedSongIds,
                [genre]: [...playedGenreSongs, song.track.id],
            });
            return song.track.id;
        }
        return null;
    };

    const onGo = () => {
        setReveal(false);
        setTimeUp(false);
        // Generate new song
        const newSongId = generateNewSong();
        if (newSongId) {
            playSong(newSongId).then(() => {
                setTimerOn(true);
            });
        }
    };

    const onReplay = () => {
        setReveal(false);
        setTimeUp(false);
        playSong(currentSongData.id).then(() => {
            setTimerOn(true);
        });
    };

    const onTimeUp = () => {
        setTimerOn(false);
        setTimeUp(true);
        pauseSong();
    };

    const onReveal = () => {
        setReveal(true);
        setTimerOn(false);
        pauseSong();
    };

    const onUpdateDifficulty = (value) => {
        setTimeUp(false);
        setDifficulty(value);
        setReveal(false);
    };

    const onUpdateGenre = (value) => {
        setGenre(value);
        setReveal(false);
        setTimeUp(false);
    };

    const onUpdateCustomPlaylistId = (value) => {
        // Check if custom genre, and if so make sure songs are pulled in
        getPlaylistInfo(value).then((data) => {
            if (data) {
                setCustomPlaylistInfo(data);
                setPlaylistSongs((prevState) => ({
                    ...prevState,
                    [genre]: data.tracks.items,
                }));
            } else {
                setCustomPlaylistInfo(null);
                setPlaylistSongs((prevState) => ({
                    ...prevState,
                    [genre]: [],
                }));
            }
        });
    };

    return (
        <>
            <div className="App">
                <h1>Time to play the music round!</h1>
                <Difficulty
                    onUpdateDifficulty={onUpdateDifficulty}
                    difficulty={difficulty}
                    difficultyData={difficultyData}
                    timerOn={timerOn}
                />
                <Divider hidden />
                <Genre
                    onUpdateGenre={onUpdateGenre}
                    genres={playlists}
                    timerOn={timerOn}
                />
                {genre == "custom" && (
                    <CustomPlaylist
                        onUpdateCustomPlaylistId={onUpdateCustomPlaylistId}
                        customPlaylistInfo={customPlaylistInfo}
                    />
                )}

                <Divider hidden />
                <div className="timerBox">
                    {reveal ? (
                        <SongInfo
                            currentSongData={currentSongData}
                            genre={genre}
                        />
                    ) : (
                        <Timer
                            key={getDifficultyPlayTime(difficulty)}
                            timerOn={timerOn}
                            seconds={getDifficultyPlayTime(difficulty)}
                            onTimeUp={onTimeUp}
                            timeUp={timeUp}
                        />
                    )}
                </div>
                <Divider hidden />
                <Go onGo={onGo} timerOn={timerOn} />
                <Replay
                    onReplay={onReplay}
                    currentSongData={currentSongData}
                    timerOn={timerOn}
                />
                <Reveal onReveal={onReveal} currentSongData={currentSongData} />
            </div>
        </>
    );
};

export default MusicRound;
