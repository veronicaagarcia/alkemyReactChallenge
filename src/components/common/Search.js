import { SearchIcon } from "@heroicons/react/solid";
import { TextInput,  Button } from "@tremor/react";
import { useNavigate } from "react-router-dom";

export function Search () {

    const navigate = useNavigate()
    const Swalert = require('sweetalert2')

    const handleSubmit = (e) => {
        e.preventDefault()
        const search = e.currentTarget.search.value.trim()
        if(search.length === 0) {
            Swalert.fire({
                icon: "warning",
                text: "You must write something!",
            })
        } else if (search.length < 2){
            Swalert.fire({
                icon: "warning",
                text: "You must write at least 2 letters",
            })
        } else {
            e.currentTarget.search.value = ''
            navigate(`/results?search=${search}`)
        }
    }
    return (
        <form className="flex" onSubmit={handleSubmit}>
            <TextInput className="mr-1" icon={SearchIcon} placeholder="Avatar" name="search" />
            <Button variant="secondary" className="hover:text-sky-700" color="orange-300" type="submit">Search</Button>
        </form>
    )
}