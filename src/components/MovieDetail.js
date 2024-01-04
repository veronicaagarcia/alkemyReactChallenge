import { Card, Title, Text, Badge, Button } from "@tremor/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/solid";
import { Icon } from "@tremor/react";

export function MovieDetail ({addOrRemoveFav}) {
    let token = sessionStorage.getItem('token')
    let query = new URLSearchParams(window.location.search)
    let Id = query.get('Id')
    const API_KEY = "9b12b2741bda770f881ce541ec80c1ae"
    const [movieDetail, setMovieDetail] = useState(null)
    const Swalert = require('sweetalert2')
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        axios.get(`https://api.themoviedb.org/3/movie/${Id}?api_key=${API_KEY}`)
        .then(res=>{
            const infoDetail = res.data
            setMovieDetail(infoDetail)
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
    },[Id])

    return (
        <section className="w-full h-full">
        {!token && <Navigate to="/login"/> }
        {
            loading &&
            <h1 className="text-sky-300 text-center text-4xl mt-20">Loading...</h1> 
        }
        {
            movieDetail && 
        <Card className='w-2/4 mx-auto p-8 mt-8 mb-20 hover:shadow-gray-50'>
            <Title className="text-center mb-2 ml-6">
                {movieDetail.title.substring(0,20)}...
                <Button 
                    color="transparent" 
                    onClick={() => {addOrRemoveFav(movieDetail)}} 
                    className="btnFav ml-5 transparent"
                >
                    <Icon size="lg" color="rose" icon={HeartIcon} />
                </Button>
            </Title><br/>
            <Badge size="md"> 
                Movie Rating: {Math.floor(movieDetail.vote_average)}
            </Badge>
            <img  className='rounded-xl m-auto' src={`https://image.tmdb.org/t/p/w300/${movieDetail.poster_path}`} alt={movieDetail.title}/><br/>
            <div className="flex justify-evenly mb-4">
                <Text><span className="text-sky-800">Release Date:</span> {movieDetail.release_date}</Text>
                <Text><span className="text-sky-800">Popularity:</span> {movieDetail.popularity}</Text>
            </div>
            <Text className="text-xl text-center underline">Description</Text>
            <Text>{movieDetail.overview}</Text>
            <ul className="text-gray-300 flex justify-around mt-4"><span className="text-sky-800"> Genres:</span>
                { movieDetail.genres.map(genre => {
                   return <li>{genre.name}</li>
                }) 
                }
            </ul>
        </Card>
        }
        </section>
    )
}
