import React, {useEffect, useState} from 'react'
import axios from "axios"
import "./Register.css"

export default function Register(props) {
    const [email, getEmail] = useState("")
    const [password, getPassword] = useState("")
    const [firstName, getFirstName] = useState("")
    const [lastname, getLastName] = useState('')
    const [userName, getUserName] = useState("")

    function RegisterUser(e){
        e.preventDefault()

        const user = {
            email:email,
            password:password,
            firstname:firstName,
            lastname:lastname,
            username:userName
        }

        axios.post(`http://localhost:5000/api/auth/register`, user)
        .then(res=>{
            props.history.push("/")
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className='register'>
        <div className='login__container'>
                <div className='login__image'>
                    <img className='login__img' src="https://premiumplus.io/wp-content/uploads/2019/10/whatsapp-1000x1024.png"></img>
                </div>
                <div className='login__texts'>
                    <h2>Sing up to whatsapp clone</h2>
                </div>
                <div className='login__form'>
                    <form onSubmit={RegisterUser}>
                    <div className='login__email'>
                            <input onChange={(e)=>{
                                getFirstName(e.target.value)
                            }} className='login__input' type='text' name='email' placeholder='Firstname'></input>
                        </div>
                        <div className='login__email'>
                            <input onChange={(e)=>{
                                getLastName(e.target.value)
                            }} className='login__input' type='text' name='email' placeholder='Lastname'></input>
                        </div>
                        <div className='login__email'>
                            <input onChange={(e)=>{
                                getUserName(e.target.value)
                            }} className='login__input' type='text' name='email' placeholder='Username'></input>
                        </div>
                        <div className='login__email'>
                            <input onChange={(e)=>{
                                getEmail(e.target.value)
                            }} className='login__input' type='text' name='email' placeholder='email@example.com'></input>
                        </div>
                        <div className='login__password'>
                            <input onChange={(e)=>{
                                getPassword(e.target.value)
                            }} className='login__input' type='password' name='password' placeholder='Your secret password'></input>
                        </div>
                        <div className='login__button'>
                            <button type='submit' className='login__btn'>Sign up</button>
                        </div>
                    </form>
                </div>
                <div className='login__noAccount'>
                    <div className='login__p'>
                        <p>Do you have an account?</p>
                    </div>
                    <div className='login__a'>
                        <a className='login__link' href='/register'>Sign in now!</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
