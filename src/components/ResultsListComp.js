import trackStyles from '../css/trackStyles.module.css';
import Track from './TrackComp.js';
//

export default function Results(props){
const resultsList = props.resultsList;
        return (

                <div className={trackStyles.container}> 
                        { resultsList.map( (track) => 
                                        <Track name={track.name} artist={track.artist} album={track.album} id={track.id} AddTrack={props.AddTrack} RemoveTrack={false}/>  
                        )}
                </div>

        );


}