export const authEndpoint = "https://accounts.spotify.com/authorize";

export const clientId = "86fdf77cbf704aacb43c9e7a6b30e105";
export const redirectUri = "the-music-round.netlify.app/redirect";
export const scopes = ["streaming", "user-read-email", "user-read-private"];

export const gameStates = {
  READY: "ready",
  PLAYING: "playing",
  TIME_UP: "timeUp",
  REVEALED: "revealed",
};

export const playlistData = {
  "70s": {
    name: "70s",
    playlistId: "37i9dQZF1DWTJ7xPn4vNaz",
    fetched: false,
    position: 0,
  },
  "80s": {
    name: "80s",
    playlistId: "37i9dQZF1DX4UtSsGT1Sbe",
    fetched: false,
    position: 0,
  },
  "90s": {
    name: "90s",
    playlistId: "37i9dQZF1DXbTxeAdrVG2l",
    fetched: false,
    position: 0,
  },
  "00s": {
    name: "00s",
    playlistId: "37i9dQZF1DX4o1oenSJRJd",
    fetched: false,
    position: 0,
  },
  taylorSwift: {
    name: "Taylor Swift",
    playlistId: "37i9dQZF1DX5KpP2LN299J",
    fetched: false,
    position: 0,
  },
  country: {
    name: "Country",
    playlistId: "37i9dQZF1DWZBCPUIUs2iR",
    fetched: false,
    position: 0,
  },
  rAndB: {
    name: "R & B",
    playlistId: "5z1r7bTErmmuBPmYlew77u",
    fetched: false,
    position: 0,
  },
  pitbull: {
    name: "Mr Worldwide",
    playlistId: "37i9dQZF1DXcfXDjovoEpj",
    fetched: false,
    position: 0,
  },
  elton: {
    name: "Elton John",
    playlistId: "37i9dQZF1DX7VulteLVOkq",
    fetched: false,
    position: 0,
  },
  queen: {
    name: "Queen",
    playlistId: "37i9dQZF1DWSNC7AjZWNry",
    fetched: false,
    position: 0,
  },
  burtBacharach: {
    name: "Burt Bacharach",
    playlistId: "37i9dQZF1DZ06evO1MMyZq",
    fetched: false,
    position: 0,
  },
  rollingStones: {
    name: "Rolling Stones",
    playlistId: "37i9dQZF1DX5COO9vTaRpO",
    fetched: false,
    position: 0,
  },
  spiceGirls: {
    name: "Spice Girls",
    playlistId: "37i9dQZF1DWWUJdr9ahsbf",
    fetched: false,
    position: 0,
  },
  boyBands: {
    name: "90s Boy Bands",
    playlistId: "37i9dQZF1DX17dmzi8A5FV",
    fetched: false,
    position: 0,
  },
  dad: {
    name: "Dad Music",
    playlistId: "1JLGQfMBmN1iQjCgTwgpTY",
    fetched: false,
    position: 0,
  },
  disney: {
    name: "Disney",
    playlistId: "37i9dQZF1DX1okZ1ZeITst",
    fetched: false,
    position: 0,
  },
  indie: {
    name: "Indie",
    playlistId: "37i9dQZF1DWYBF1dYDPlHw",
    fetched: false,
    position: 0,
  },
  floRida: {
    name: "Flo Rida",
    playlistId: "37i9dQZF1DZ06evO07bvXy",
    fetched: false,
    position: 0,
  },
  motown: {
    name: "Motown",
    playlistId: "1bZNAY2boFGQn3r06V6QG1",
    fetched: false,
    position: 0,
  },
  custom: {
    name: "Custom Playlist",
    spotifyName: null,
    playlistId: "",
    fetched: false,
    position: 0,
  },
};

export const difficultyData = [
  {
    value: "veryEasy",
    name: "Very Easy (20 seconds)",
    difficultyPlayTime: 20,
    difficultyGuessTime: 20,
  },
  {
    value: "easy",
    name: "Easy (10 seconds)",
    difficultyPlayTime: 10,
    difficultyGuessTime: 10,
  },
  {
    value: "moderate",
    name: "Moderate (7 seconds)",
    difficultyPlayTime: 7,
    difficultyGuessTime: 7,
  },
  {
    value: "hard",
    name: "Hard (5 seconds)",
    difficultyPlayTime: 5,
    difficultyGuessTime: 5,
  },
  {
    value: "veryHard",
    name: "Very Hard (3 seconds)",
    difficultyPlayTime: 3,
    difficultyGuessTime: 3,
  },
];
