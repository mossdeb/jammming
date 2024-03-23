import React, {useState} from 'react';
import ButtonCTA from './ButtonComp';


import styleDefault from '../css/default.module.css'
import styleInputs from '../css/inputs.module.css'

function SearchBar(props){
       const {btSearch}= props
       const [inputData, setInputData] = useState('');



   function handleBt(){
       btSearch(inputData);
    }
   function handleInput(event){

      setInputData(event.target.value);

   }

    return (
        <div className={styleDefault.searchBar}> 
                <lable for="search" >Search</lable>
                <input id="search" placeholder="song/artist" className={styleInputs.style1} value={inputData} onChange={handleInput}/>
                <ButtonCTA name="Search" buttonAction={handleBt} />
        </div>
    )
}

export default SearchBar;