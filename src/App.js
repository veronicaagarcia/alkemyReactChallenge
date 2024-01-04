import { Routes, Route  } from 'react-router-dom';
import { Login } from "./components/Login";
import { MoviesList } from './components/MoviesList';
import { MovieDetail } from './components/MovieDetail';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { Results } from './components/Results';
import { Favorites } from './components/Favorites';
import { useState } from 'react';
import { Home } from './components/Home';

function App() {

  let favsLs = JSON.parse(localStorage.getItem('favs'))
  const [favs, setFavs]= useState(favsLs ? favsLs : [])

  const addOrRemoveFav = (movie) => {

    let noMovieFav = [...favs].find(m => m.id === movie.id)
    if (noMovieFav === undefined){

      setFavs([...favs, movie])
    } else {
      let isMovieFav = [...favs].filter(m => m.id !== movie.id)

      setFavs(isMovieFav)
      localStorage.setItem('favs', JSON.stringify(isMovieFav))
    }
  }

  return (
    <>
      <Header/>
      <Routes>
        <Route exact path='/' Component={Home}/>
        <Route path='/login' Component={Login}/>
        <Route path='/list' element={<MoviesList addOrRemoveFav={addOrRemoveFav}/>} />
        <Route path='/details' element={<MovieDetail addOrRemoveFav={addOrRemoveFav}/>}/>
        <Route path='/results' element={<Results addOrRemoveFav={addOrRemoveFav}/>}/>
        <Route path='/favorites' element={<Favorites favs={favs} addOrRemoveFav={addOrRemoveFav} />}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
