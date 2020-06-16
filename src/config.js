require("dotenv").config();

export const authEndpoint = "https://accounts.spotify.com/authorize";

export const clientId = "86fdf77cbf704aacb43c9e7a6b30e105";
export const redirectUri = process.env.REACT_APP_SITE_DOMAIN + "/redirect";
export const scopes = ["streaming", "user-read-email", "user-read-private"];
