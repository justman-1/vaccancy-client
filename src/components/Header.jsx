import { useRef, useEffect, useState } from 'react'
import $ from 'jquery'
import '../styles/header.css'
import searchImg from '../imgs/search.png'
import signinImg from '../imgs/signin.png'
import userImg from '../imgs/user.png'
import Axios from '../axios.js'

export default function Header(){
    const [load, setLoad] = useState()
    const signinRef = useRef()
    const [userPhoto, setUserPhoto] = useState(false)
    const [profileId, setProfileId] = useState('')
    useEffect(async ()=>{
        if(Axios.user == true){
            $('.signinImg').css({
                display: 'none'
            })
            const [err, res] = await Axios.getPhoto('my_id')
            if(res){
                if(res.content == 'null'){
                    setUserPhoto(userImg)
                    $('.userPhoto').attr('src', userImg)
                }
                setProfileId(res.id)
                $('.userPhoto').css({
                    display: 'block'
                })
            }
            else if(err){
                if(err.status == 401){
                    localStorage.removeItem('accessToken')
                    localStorage.removeItem('refreshToken')
                    $('.signinImg').css({
                        display: 'block'
                    })
                }
            }
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