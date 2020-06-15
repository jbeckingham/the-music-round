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
    disney: {
        name: "Disney",
        playlistId: "37i9dQZF1DX1okZ1ZeITst",
    },
    disney: {
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
};

const MusicRound = ({ playSong, pauseSong, getPlaylistSongs }) => {
    const [difficulty, setDifficulty] = useState("easy");
    const [genre, setGenre] = useState("70s");
    const [currentSongId, setCurrentSongId] = useState("");
    const [currentSongData, setCurrentSongData] = useState(null);
    const [playlistSongs, setPlaylistSongs] = useState({});
    const [reveal, setReveal] = useState(false);
    const [timerOn, setTimerOn] = useState(false);
    const [timeUp, setTimeUp] = useState(false);

    const fetchSongs = () => {
        Object.entries(genreData).map(([genre, { playlistId }]) => {
            getPlaylistSongs(playlistId).then((songs) =>
                setPlaylistSongs((prevState) => ({
                    ...prevState,
                    [genre]: songs,
                }))
            );
        });
    };

    useEffect(fetchSongs, []);

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

    const getDifficultyPlayTime = () =>
        difficultyData[difficulty].difficultyPlayTime;
    const difficultyGuessTime = () =>
        difficultyData[difficulty].difficultyGuessTime;

    const getNewSongId = () => {
        const num = Math.floor(Math.random() * playlistSongs[genre].length);
        setCurrentSongData(playlistSongs[genre][num].track);
        return playlistSongs[genre][num].track.id;
    };

    const onGo = () => {
        setReveal(false);
        setTimeUp(false);
        // Generate new id
        const newSongId = getNewSongId();
        setCurrentSongId(newSongId);
        playSong(newSongId).then(() => {
            setTimerOn(true);
        });
    };

    const onReplay = () => {
        playSong(currentSongId);
        setTimeout(pauseSong, getDifficultyPlayTime(difficulty));
    };

    const onTimeUp = () => {
        setTimeUp(true);
        setTimerOn(false);
        pauseSong();
    };

    const onReveal = () => {
        setReveal(true);
    };

    const onUpdateDifficulty = (value) => {
        setTimeUp(true);
        setDifficulty(value);
        setReveal(false);
        setTimeUp(false);
    };

    const onUpdateGenre = (value) => {
        setGenre(value);
        setReveal(false);
        setTimeUp(false);
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
                    genres={genreData}
                    timerOn={timerOn}
                />
                <Divider hidden />
                <div className="timerBox">
                    {reveal ? (
                        <SongInfo
                            currentSongData={currentSongData}
                            genre={genre}
                        />
                    ) : (
                        <Timer
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
                <Reveal
                    onReveal={onReveal}
                    currentSongData={currentSongData}
                    timerOn={timerOn}
                />
            </div>
        </>
    );
};

export default MusicRound;
