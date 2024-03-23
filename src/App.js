
//import logo from './logo.svg';

import React, {useState, useEffect} from 'react';
//
import HeaderJam from './components/HeaderComp.js';
import SearchBar from './components/SearchBarComp.js'
import CardsMaster from './components/CardsMaster.js'
import FooterBar from './components/FooterComp.js'
//
import './App.css';
import styleDefault from './css/default.module.css'
//
import {tracksList} from './util/tracksList.js'
//
import {SpotifyAuth, searchSpotify, savePlaylistSpotify} from  './util/spotify.js';



 


function App() {


    const [results, setResults] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [playListName, setPlayListName] = useState("Electro");
    const [searchValue, setSearchValue] = useState("");





    function AddTrack(id){
            const newTrack = results.filter( (track)=> track.id === id );
            const validation = playlist.some( (track)=> track.id === id );

            setPlaylist( (prev)=>{
                if(!validation){
                  return [...prev, newTrack[0]]
                }else{
                  return [...prev]
                }
            });
    }
 


    function RemoveTrack(id){
           setPlaylist(  (prev)=> prev.filter( (track)=> track.id !== id ) );  
    }
    
    function handleName(name){
           setPlayListName(name);
    }

    
    function SavePlayList(){
        //  alert(
        //  `savePlaylist: ${playListName}  
        //   With The Data: ${JSON.stringify(playlist)}`
        //  );
         savePlaylistSpotify(playlist, playListName);
    }


    function HandleSearch(inputData){
      if(inputData){
            searchSpotify(inputData).then( result =>{
                setResults(result);
              
          });

      }else{
           setResults([]);
           alert("type sommeting");
      }

      setSearchValue(inputData);
    
      }

    return (
      <div>
      <HeaderJam/> 
      <SpotifyAuth/>
      <SearchBar btSearch={HandleSearch}/>                          
      <CardsMaster resultsList={results} playList ={playlist} handleName={handleName} placeholder={playListName} AddTrack={AddTrack} RemoveTrack={RemoveTrack} btSavePlayList={SavePlayList} searchValue={searchValue}/>

      <FooterBar/>   
      
      </div>
    );
}

export default App;

/*
 { getLogin() ? (  <SpotifyAuth />  ) : 
                          (
                            <>
                            <SearchBar btSearch={HandleSearch}/>                          
                            <CardsMaster resultsList={results} playList ={playlist} handleName={handleName} placeholder={playListName} AddTrack={AddTrack} RemoveTrack={RemoveTrack} btSavePlayList={SavePlayList} searchValue={searchValue}/>
                            </>
                            )  }
*/


/*
<div className={styleDefault.containe}>
<SpotifyAuth />
<HeaderJam/> 
<SearchBar btSearch={HandleSearch}/>
<CardsMaster resultsList={results} playList ={playlist} handleName={handleName} placeholder={playListName} AddTrack={AddTrack} RemoveTrack={RemoveTrack} btSavePlayList={SavePlayList} searchValue={searchValue}/>
<FooterBar/>         
</div>
*/

/*
<div className="App">

<header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <p>
    Edit <code>src/App.js</code> My Fisrt react APP
  </p>
  <a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn React
  </a>
</header>
</div>
*/