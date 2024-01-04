import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import { Movies } from "./common/Movies";

export function MoviesList ({addOrRemoveFav}) {
    let token = sessionStorage.getItem('token')
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const API_KEY = "9b12b2741bda770f881ce541ec80c1ae"
    const Swalert = require('sweetalert2')
    
    useEffect(()=>{
        setLoading(true)
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`)
        .then(res => {
            const data =res.data.results
            setMovies(data)
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
      
    },[])
    
    return (
        <>
        {   
            !token && <Navigate to='/login'/> 
        }
        {
            loading 
            ? 
            <h1 className="text-sky-300 text-center text-4xl mt-20">Loading...</h1> 
            :
            <Movies array={movies} addOrRemoveFav={addOrRemoveFav}/>
        }
        </>
    )
}
