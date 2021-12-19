import { useRef, useState } from 'react'
import Header from '../components/Header'
import '../styles/registration.css'
import $ from 'jquery'
import Axios from '../axios.js'

export default function Registration(){
    const email = useRef()
    const password = useRef()
    const [error, setError] = useState('')
    async function signIn(){
        const [err, res] = await Axios.signInByEmail(email.current.value, password.current.value)
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
                <div className='registrSp'>Вход в аккаунт</div>
                <input className='registrEmailInp' type='email' placeholder='Email@gmail.com' ref={email}/>
                <input className='registrEmailInp' type='password' placeholder='Password' ref={password}/>
                <div className='registrCreateBut' onClick={signIn}>Войти</div>
                <div className='registrError'>{error}</div>
                <div className='registrLine'>Еще не зарегистрированы? <a href='/registration'>Зарегистрируйтесь</a>.</div>
            </form>
        </div>
    )
}