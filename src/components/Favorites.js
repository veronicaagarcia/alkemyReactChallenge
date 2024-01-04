import { Navigate } from "react-router-dom";
import { Movies } from "./common/Movies"

export function Favorites ({favs, addOrRemoveFav}) {
    let token = sessionStorage.getItem('token')
    return (
        <>
         {!token && <Navigate to="/login"/> }
        {
            favs.length === 0 ? 
            <h2 className="text-center text-orange-300">You don't select any movie yet</h2> : 
            <h2 className="text-center text-orange-300">Favorites</h2>
        }
         <Movies array={favs} addOrRemoveFav={addOrRemoveFav}/>
        </>
    )
}
