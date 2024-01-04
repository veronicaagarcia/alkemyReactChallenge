import { Link } from "react-router-dom"
import { Search } from "./Search"

export function Header () {
    let token = sessionStorage.getItem('token')

    return (
        <header className="w-full p-6 bg-primary">
            <ul className="w-full mx-auto flex justify-evenly">

                <Link to='/' className="w-1/6 text-sky-700 text-lg font-large">Home</Link>
                {
                    !token &&
                    <Link to='/login' className="w-1/6 text-white hover:text-orange-300 text-lg font-medium">Login</Link>
                }
                {
                    token &&
                    <>
                    <Link to='/list' className="w-1/6 text-white hover:text-orange-300 text-lg font-medium">List of Movies</Link>
                    <Link to='/favorites' className="w-1/6 text-white hover:text-orange-300 text-lg font-medium">Favorites</Link>
                    <Search className="w-4/6"/>
                    </>
                }
            </ul>
        </header>
    )
}