import trackStyles from '../css/trackStyles.module.css';
import Track from './TrackComp.js';
//

export default function Playlist(props){
const playList = props.playList;
          return (

                    <div className={trackStyles.container}> 

                         { playList.map( (track) => 
                                                  <Track name={track.name} artist={track.artist} album={track.album} id={track.id} RemoveTrack={props.RemoveTrack} AddTrack={false}/>  
                         )}
                    </div>

          );
}
