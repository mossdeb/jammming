import styleDefault from '../css/default.module.css'

function HeaderJam(props){
    return ( 
        <div className={styleDefault.header}> 
            <h1>Ja<span style={{color:" #1ddc96"}}>mmm</span>ing</h1>
        </div>
    );
}



export default HeaderJam;