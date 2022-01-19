import { useRef, useEffect, useState } from 'react'
import $ from 'jquery'
import '../styles/header.css'
import searchImg from '../imgs/search.png'
import signinImg from '../imgs/signin.png'
import userImg from '../imgs/user.png'
import houseImg from '../imgs/house.png'
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
                console.log(res)
                if(!res.content){
                    setUserPhoto(userImg)
                    $('.userPhoto').attr('src', userImg)
                }
                else{
                    setUserPhoto(userImg)
                    $('.userPhoto').attr('src', '/getImage/' + res.content)
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
    function imageError(){
    }
    return(
        <div className='header'>
            <a href='/'><img src={houseImg} className='headerMain' /></a>
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
                <img style={{display: (userPhoto != false) ? 'block' : 'none'}} src={(userPhoto != false) ? userPhoto : ''} onError={imageError} className='userPhoto'/>
            </a>
        </div>
    )
}