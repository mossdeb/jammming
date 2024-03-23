import ctaStyles from '../css/buttons.module.css';

export default function ButtonCTA(props){
     const{buttonAction}=props
    

    function handleSaveBt(){
       buttonAction();
    }

    return(

             <button onClick={handleSaveBt} className={ctaStyles.style1}>{props.name} </button>

    );


}