import { useRef, useState } from 'react'
import Header from '../components/Header'
import '../styles/registration.css'
import $ from 'jquery'
import Axios from '../axios.js'

export default function Registration(){
    const nickname = useRef()
    const email = useRef()
    const password = useRef()
    const [error, setError] = useState()
    async function createAccByEmail(){
        const [err, res] = await Axios.register(nickname.current.value, email.current.value, password.current.value)
        if(err){
            if(err.status == 410 | 501){
                setError(err.text)
            }
        }
    }
    return(
        <div>
            <Header/>
            <form className='registrBl'>
                <div className='registrSp'>Регистрация</div>
                <input className='registrEmailInp' placeholder='Nickname' ref={nickname}/>
                <input className='registrEmailInp' type='email' placeholder='Email@gmail.com' ref={email}/>
                <input className='registrEmailInp' type='password' placeholder='Password' ref={password}/>
                <div className='registrCreateBut' onClick={createAccByEmail}>Создать аккаунт</div>
                <div className='registrError'>{error}</div>
                <div className='registrLine'>Уже зарегистрированы? <a href='/signin'>Войдите</a>.</div>
            </form>
        </div>
    )
}