import { useRef, useState } from 'react'
import Header from '../components/Header'
import '../styles/registration.css'
import $ from 'jquery'

export default function Registration(){
    const email = useRef()
    const password = useRef()
    const [error, setError] = useState()
    function createAccByEmail(){
        $.ajax({
            url: '/signin',
            method: 'post',
            data: {
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
                <div className='registrSp'>Вход в аккаунт</div>
                <input className='registrEmailInp' type='email' placeholder='Email@gmail.com' ref={email}/>
                <input className='registrEmailInp' type='password' placeholder='Password' ref={password}/>
                <div className='registrCreateBut' onClick={createAccByEmail}>Войти</div>
                <div className='registrError'>{error}</div>
                <div className='registrLine'>Еще не зарегистрированы? <a href='/registration'>Зарегистрируйтесь</a>.</div>
            </form>
        </div>
    )
}