import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom";
import { Movies } from "./common/Movies"

export function Results ({addOrRemoveFav}) {
    let query = new URLSearchParams(window.location.search)
    let search = query.get('search')
    const Swalert = require('sweetalert2')
    let token = sessionStorage.getItem('token')
    const [loading, setLoading] = useState(false)

    const [searchedMovies, setSearchedMovies]= useState([])

    useEffect(()=>{
        setLoading(true)
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=9b12b2741bda770f881ce541ec80c1ae&query=${search}`)
        .then(res => {
            const data = res.data.results
            setSearchedMovies(data)
            setLoading(false)
        })
        .catch(error=>{
            Swalert.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
            console.error(error)
            setLoading(false)
        })
    },[searchedMovies])
    return (
        <>
         {!token && <Navigate to="/login"/> }
        {
            searchedMovies.length === 0 
            ? 
            <h2 className="text-center text-orange-300">Your search didn't return any results</h2> 
            :  
            <h2 className="text-center text-orange-300">The movies related to {search.toUpperCase()} are:</h2>
        }
        {
            loading 
            ? 
            <h1 className="text-sky-300 text-center text-4xl mt-20">Loading...</h1> 
            :
            <Movies array={searchedMovies} addOrRemoveFav={addOrRemoveFav}/>
        }
        </>
    )
}