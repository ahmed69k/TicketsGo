import pic from '../assets/IMG_3295.jpeg'
import '../styling/peak.css'
import audio from '../assets/Lil Wayne - Love Me (Explicit VersionClosed Captioned) ft. Drake, Future.mp3'


function Peaky(){
    return(
        <>
        <div className='container'>
            <div className='text'>
                <h2> Agmad team leader da wala ehhh 😎 </h2>
            </div>
            
            <img className = 'peaky-pic'src={pic}></img>
        </div>
        <audio src={audio} autoPlay ></audio>
        
        </>
    )
}
export default Peaky