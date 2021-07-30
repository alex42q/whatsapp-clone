import React, {useEffect, useState} from 'react'
import "./Login.css"
import axios from "axios"
import Cookie from "js-cookie"

export default function Login(props) {
    const [email, getEmail] = useState("")
    const [password, getPassword] = useState("")

    function loginRequest(e){
        e.preventDefault()

        const user = {
            email:email,
            password:password
        }

        axios.post(`http://localhost:5000/api/auth/login`, user, {
            withCredentials:true
        })
        .then(res=>{
            console.log(res.data.jwt)
          const token = Cookie.set("access_token", res.data.jwt)
          if(token){
              props.history.replace("/main")
          }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className='login'>
            <div className='login__container'>
                <div className='login__image'>
                    <img className='login__img' src="https://premiumplus.io/wp-content/uploads/2019/10/whatsapp-1000x1024.png"></img>
                </div>
                <div className='login__texts'>
                    <h2>Sing in to whatsapp clone</h2>
                </div>
                <div className='login__form'>
                    <form onSubmit={loginRequest}>
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
                            <button type='submit'  className='login__btn'>Sign in</button>
                        </div>
                    </form>
                </div>
                <div className='login__noAccount'>
                    <div className='login__p'>
                        <p>You dont have an account?</p>
                    </div>
                    <div className='login__a'>
                        <a className='login__link' href='/register'>Register now!</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
