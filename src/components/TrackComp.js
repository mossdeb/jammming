import trackStyles from '../css/trackStyles.module.css';




export default function Track(props){

const { AddTrack, RemoveTrack} = props;

const HandleClick =(event)=>{

        if(props.AddTrack){
            AddTrack(props.id);
            //AddTrack( ['artist':props.artist, 'album':props.album, id:{props.id}] );
        }

        if(props.RemoveTrack){
            RemoveTrack(props.id);
        }

}

 

    return(

         <div className={trackStyles.main}>
               <div className={trackStyles.box}> 
                         <h4>{props.name}</h4>
                         <p> {`Artist: ${props.artist} | Album: ${props.album}`}</p>
               </div>
               <div > 
                         <button className={trackStyles.buttonAddRemove} onClick={HandleClick}> {props.AddTrack===false? "-":"+"}</button>
               </div>
         </div>

    );



}

// <p> {`Artist: ${props.artist} | Album ${props.album} | ID ${props.id}`}</p>