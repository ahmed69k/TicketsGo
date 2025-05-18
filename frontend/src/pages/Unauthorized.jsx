import { Link } from 'react-router-dom'
import '../styling/Unauthorized.css'

function Unauthorized(){
    return(
        <>
        <h1>Unauthorized Access</h1>
        <h2>Please return Home:</h2>
        <Link to='/'><button>Home</button></Link>
        </>
    )
}
export default Unauthorized