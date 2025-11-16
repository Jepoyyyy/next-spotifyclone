import SpotifyWebApi from 'spotify-web-api-node';

const scopes = [ 
    // User Profile
  "user-read-email",
  "user-read-private",

  // Library
  "user-library-read",
  "user-library-modify",

  // Playback
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",

  // Listening History
  "user-top-read",
  "user-read-recently-played",

  // Playlists
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-modify-private",

  // Follow
  "user-follow-read",
  "user-follow-modify",

  // Web Playback SDK (if needed)
  "streaming",
].join(",");

const params = { 
    scope: scopes,
};

const queryParamString = new URLSearchParams(params);
const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export default spotifyApi ;

export { LOGIN_URL };
