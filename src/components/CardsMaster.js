import React, {useState} from 'react';
//
import styleResults from '../css/cardsMaster.module.css'
import styleInputs from '../css/inputs.module.css';
//
import Playlist from './PlaylistComp.js';
import Results from './ResultsListComp.js';
import ButtonCTA from './ButtonComp.js';
//

function CardsMaster(props){

      const [plName, setPlName]= useState(props.placeholder);
      const{ handleName, btSavePlayList }=props;
      
      const resultsList = props.resultsList;
      const playList = props.playList;
  

      function handleInputName(event){
            handleName(event.target.value);
            setPlName(event.target.value);
      }     
      
      function handleCLick(){

         console.log("AQUI");

      }

return(
   <div className={styleResults.resultsMain}> 

            <h4 className={styleResults.text1}> {`Configure your playlist`}</h4>
                  
            <div className={styleResults.card}> 
                        <h2> {`Results for:  `}   <span style={{color:" #1ddc96"}}>{props.searchValue} </span></h2>
                        <Results resultsList={resultsList} AddTrack={props.AddTrack} /> 
                   
                  </div>

                  <div className={styleResults.card}> 
                        <div className={styleResults.box}>
                              <h2 > Playlist</h2>
                              <input id="search" placeholder="Playlist Name" value={plName} className={styleInputs.style2} onChange={handleInputName}/>
                        </div>
                        <Playlist playList={playList} RemoveTrack={props.RemoveTrack}/>
                        <ButtonCTA name="Save Playlist" buttonAction={btSavePlayList}/>           
                  </div>
       
   </div>

)}



export default CardsMaster;