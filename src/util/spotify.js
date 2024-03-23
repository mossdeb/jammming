import React, { useState, useEffect } from 'react';

import ButtonCTA from '../components/ButtonComp';
import styleDefault from '../css/default.module.css'


const client_id = '9b59517794744bfb9bbc20fb9b69f15d';
const client_secret = '3e8accd43bb64588ad80908319fce43d';
var my_access_token = '';
var login = false;
var redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri 'http://localhost:3000/callback';
const url = 'https://api.spotify.com';
//const urlToFetch2 = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;

const REDIRECT_URI = redirect_uri; // Change this to your redirect URI




const SpotifyAuth = () => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const token = params.get('access_token');
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const handleLogin = () => {
    const queryParams = new URLSearchParams({
      client_id: client_id,
      redirect_uri: REDIRECT_URI,
      response_type: 'token',
      scope: 'user-read-private user-read-email playlist-modify-public playlist-modify-public', // Adjust scopes as needed
    });

    window.location.href = `https://accounts.spotify.com/authorize?${queryParams}`;
  };
  //console.log(accessToken);
  my_access_token =accessToken;


  return (
    <div className={styleDefault.login} >
      {accessToken ? (  <></>) : (
        <div>
       <p>Login in To start use the app</p>
        <ButtonCTA buttonAction={handleLogin} name= "Login with Spotify"/>
       </div>
      )}
      
    </div>
  );
};
//


/*
  return (
    <div className={styleDefault.login} >
      {accessToken ? ( <p> </p>) : (
        <div>
       <p>Login in To start use the app</p>
        <ButtonCTA buttonAction={handleLogin} name= "Login with Spotify"/>
       </div>
      )}
       <p>login Success</p>
    </div>
  );
};
*/

////// ------- /////// --------////// ------- /////// --------////// ------- /////// --------////// ------- /////// --------////// ------- /////// --------////// ------- /////// --------
////// ------- /////// --------////// ------- /////// --------////// ------- /////// --------////// ------- /////// --------////// ------- /////// --------////// ------- /////// --------
////// ------- /////// --------////// ------- /////// --------////// ------- /////// --------////// ------- /////// --------////// ------- /////// --------////// ------- /////// --------
////// ------- /////// --------////// ------- /////// --------////// ------- /////// --------////// ------- /////// --------////// ------- /////// --------////// ------- /////// --------
////// ------- /////// --------////// ------- /////// --------////// ------- /////// --------////// ------- /////// --------////// ------- /////// --------////// ------- /////// --------
////// ------- /////// --------////// ------- /////// --------////// ------- /////// --------////// ------- /////// --------////// ------- /////// --------////// ------- /////// --------
////// ------- /////// --------////// ------- /////// --------////// ------- /////// --------////// ------- /////// --------////// ------- /////// --------////// ------- /////// --------


const searchSpotify = async (term) => {
     
     const token = my_access_token;
    // const forSearch = `?q=${term}&type=TRACK`;
     const forSearch = `?type=track&q=${term}`;
     const endPoint ='https://api.spotify.com/v1/search';
     
     const market = 'market=ES';
     const limit = 'limit=10';
     const offset = 'offset=5';
     const include_external ="audio";
     //const urlToFetch = `${endPoint}${forSearch}${market}${limit}${offset}${include_external}`;
     const urlToFetch = `${endPoint}${forSearch}`;
     
     //console.log(urlToFetch);

    
     try{
          const response =  await fetch(urlToFetch, {  headers:{ Authorization:`Bearer ${token}`}});
          if(response.ok){
               const jsonResponse = await response.json();
               //console.log(jsonResponse);
               const results =  jsonResponse.tracks.items;
               const filterResults= results.map( tracks => ({id:tracks.id, name:tracks.name, artist:tracks.artists[0].name, album:tracks.album.name, uri:tracks.uri }));
               console.log("results");
               console.log(results);
               return filterResults;
          }
     }
     catch (error){
          console.log(error);
     }
 }; // END getGenres



const savePlaylistSpotify = async (playlist, playListName) => {
  console.log("Start");
  // Extract playlist name and tracks from the parameters
  const user_playListName = playListName;
  const user_playlist = playlist;
  const user_playlisURIs = playlist.map((track) => track.uri);
  const myUserId = "";

  // Check if playlist name or tracks are missing
  if (!user_playListName || !user_playlist) {
      // If missing, reject the promise with an error message
      return Promise.reject("Playlist name or tracks are missing.");
  }

  // Spotify API endpoint to retrieve user ID
  const userIdEndPoint = "https://api.spotify.com/v1/me";
  // Access token obtained from authentication
  const token = my_access_token;
  // Authorization header with the access token
  const header = {Authorization: `Bearer ${token}` };

  try {
    // Fetch user ID from Spotify API
    const response = await fetch(userIdEndPoint, { headers: header });
    if (!response.ok) {
      // If response is not ok, throw an error
      throw new Error('Failed to retrieve user ID from Spotify API');
    }
    const jsonResponse = await response.json();
    // Extract user ID from the JSON response
    const user_id = jsonResponse.id;

    // Create a new playlist for the user
    const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
      headers: header,
      method: 'POST',
      // Provide playlist name in the request body
      body: JSON.stringify({name:user_playListName}),
    });
    if (!playlistResponse.ok) {
      // If playlist creation response is not ok, throw an error
      throw new Error('Failed to create playlist on Spotify');
    }
    const playlistJsonResponse = await playlistResponse.json();
    // Extract playlist ID from the JSON response
    const playlistID = playlistJsonResponse.id;
    //console.log("playlistID");
    //console.log(playlistID);

    // Add tracks to the created playlist
    const addTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
      headers: header,
      method: 'POST',
      // Provide track URIs in the request body
      body: JSON.stringify({ uris: user_playlisURIs })
    });
    if (!addTracksResponse.ok) {
      // If adding tracks response is not ok, throw an error
      throw new Error('Failed to add tracks to playlist on Spotify');
    }

    console.log("FINISH");
    console.log(addTracksResponse);

    // Return success message if all operations are successful
    return 'Playlist saved successfully';
  } catch (error) {
    // Log and rethrow any errors that occur during the process
    console.error('Error:', error);
    throw new Error('Failed to save playlist on Spotify');
  }
}


export {SpotifyAuth, searchSpotify, savePlaylistSpotify};