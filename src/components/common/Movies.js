import { Grid, Card, Title, Text, Button } from "@tremor/react"
import { Link } from "react-router-dom"
import { HeartIcon } from "@heroicons/react/solid"
import { Icon } from "@tremor/react"

export function Movies ({array, addOrRemoveFav}) {
    
    return (
        <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6 m-4">
            {array?.map(movie => 
            <Card key={movie.id} className="w-30 flex flex-col justify-center rounded-xl hover:shadow-gray-50">
                <Title className="text-center mb-2 ml-6">
                    {movie.title.substring(0,20)}...
                    <Button 
                        color="transparent" 
                        onClick={() => {addOrRemoveFav(movie)}} 
                        className="btnFav ml-5 transparent"
                    >
                        <Icon size="lg" color="rose" icon={HeartIcon} />
                    </Button>
                </Title><br/>
                <img  className='mb-2 rounded-xl m-auto' src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title}/><br/>
                <Text className="mb-2 text-center">{movie.overview.substring(0,30)}...</Text><br/>
                <Button color="orange[900]" className="text-orange-300 self-center hover:text-sky-700"><Link to={`/details?Id=${movie.id}`}>More details</Link></Button>
            </Card>
            )}
        </Grid>
    )
}