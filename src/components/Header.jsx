import { useRef, useEffect, useState } from 'react'
import $ from 'jquery'
import '../styles/header.css'
import searchImg from '../imgs/search.png'
import signinImg from '../imgs/signin.png'
import userImg from '../imgs/user.png'

export default function Header(){
    const [load, setLoad] = useState()
    const signinRef = useRef()
    const [userPhoto, setUserPhoto] = useState(false)
    const [profileId, setProfileId] = useState('')
    useEffect(()=>{
        if(localStorage.getItem('accessToken') != undefined && localStorage.getItem('refreshToken') != undefined){
            $('.signinImg').css({
                display: 'none'
            })
            $.ajax({
                url: '/getPhoto',
                method: 'get',
                data: {
                    id: 'my_id'
                },
                headers: {
                    access_token: localStorage.getItem('accessToken'),
                    refresh_token: localStorage.getItem('refreshToken')
                },
                success: (res)=>{
                    console.log(res)
                    if(res.content == 'null'){
                        setUserPhoto(userImg)
                        $('.userPhoto').attr('src', userImg)
                    }
                    setProfileId(res.id)
                    $('.userPhoto').css({
                        display: 'block'
                    })
                },
                error: (res)=>{
                    if(res.status == 401){
                        localStorage.removeItem('accessToken')
                        localStorage.removeItem('refreshToken')
                        $('.signinImg').css({
                            display: 'block'
                        })
                    }
                }
            })
        }
    }, [load])
    return(
        <div className='header'>
            <div className='headerSearch'>
                <input type="text" className='headerSearchInp' placeholder='Search...'/>
                <div className='headerSearchBut'>
                    <img src={searchImg} className='headerSearchButImg' />
                </div>
            </div>
            <a href="/registration">
                <img src={signinImg} className='signinImg' ref={signinRef}/>
            </a>
            <a href={'/profile/' + profileId} style={{display: (userPhoto != false) ? 'block' : 'none'}} className='profileIdLink'>
                <img style={{display: (userPhoto != false) ? 'block' : 'none'}} src={(userPhoto == false) ? '' : userPhoto} className='userPhoto'/>
            </a>
        </div>
    )
}