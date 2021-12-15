import { useRef, useState } from 'react'
import Header from '../components/Header'
import '../styles/registration.css'
import $ from 'jquery'

export default function Registration(){
    const nickname = useRef()
    const email = useRef()
    const password = useRef()
    const [error, setError] = useState()
    function createAccByEmail(){
        $.ajax({
            url: '/register',
            method: 'post',
            data: {
                login: nickname.current.value,
                email: email.current.value,
                password: password.current.value
            },
            success: (res)=>{
                localStorage.setItem('refreshToken', res.refreshToken)
                localStorage.setItem('accessToken', res.accessToken)
                window.location = '/profile/' + res.id
            },
            error: (res)=>{
                console.log(res)
                if(res.status == 410 | 501){
                    setError(res.responseText)
                }
            }
        })
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