import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Card, TextInput, Button } from "@tremor/react";

export function Login () {
    const Swalert = require('sweetalert2')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        const email = e.target.email.value
        const password = e.target.password.value

        const validEmail = /\S+@\S+\.\S+/;

        if( email === '' | password === '') {
           return Swalert.fire({
            icon: "warningr",
            title: "Oops...",
            text: "You must complete the fields!",
            })
        }

        if(validEmail.test(email) === false){
           return Swalert.fire({
            icon: "warningr",
            title: "Oops...",
            text: "You must provide a valid email address!",
            })
        }

        axios.post('http://challenge-react.alkemy.org', {email, password})
        .then(res => {
            const data = res.data.token
            sessionStorage.setItem('token', data)
            navigate('/list')
            window.location.reload()
        })
        .catch(err => {
            Swalert.fire({
                icon: "error",
                title: "Oops...",
                text: "invalid credentials!",
            })
        })
    }

    return (
        <>
        <form onSubmit={handleSubmit} className='w-2/4 flex flex-col mx-auto p-8'>
            <h2 className='text-orange-300 text-center text-lg font-medium'>Enter your email and password</h2>
            <Card className='p-10 mt-4 flex flex-col mx-auto'>
                <TextInput className="mb-4"type="text" name="email" placeholder="email.example@gmail.com"/>
                <TextInput className="mb-4"type="password" name="password" placeholder="******"/>
                <Button className="m-auto" color='orange-300' variant="secondary" type="submit">Login</Button>
            </Card>
        </form>
        </>
    )
}
