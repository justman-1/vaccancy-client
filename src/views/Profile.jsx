import { useRef, useState, useEffect } from 'react'
import $ from 'jquery'
import '../styles/profile.css'
import '../styles/registration.css'
import Header from '../components/Header'
import userImg from '../imgs/user.png'
import pencilImg from '../imgs/pencil.png'

export default function Profile(props){
    const id = props.match.params.id
    const [load, setLoad] = useState()
    const [profileD, setProfileD] = useState(1)
    const [login, setLogin] = useState()
    const [userPhoto, setUserPhoto] = useState('')
    const [myVaccancyChoose, setMyVaccancyChoose] = useState(false)
    const [resume, setResume] = useState(0)
    useEffect(()=>{
        $.ajax({
            url: '/getProfileSmallInfo',
            method: 'get',
            data: {
                id: id
            },
            success: (res)=>{
                console.log(res)
                setLogin(res.login)
                if(!res.photo) setUserPhoto(userImg)
                if(!res.resume) setResume(false)
                if(res.resume) setResume(true)
                setProfileD(0)
            },
            error: (res)=>{
                if(res.status == 410){
                    setProfileD(res.responseText)
                }
            }
        })
    }, [load])
    useEffect(()=>{

    }, [myVaccancyChoose])
    return(
        <div>
            <Header/>
            <div className='profileBl' style={{display: (profileD == 0) ? 'flex' : 'none'}}>
                <img className='profileChange' src={pencilImg}/>
                <img className='profilePhoto' src={(userPhoto != '') ? userPhoto : ''}/>
                <div className='profileInfoLogin'>{login}</div>
            </div>

            <div className='vaccanciesButs' style={{display: (profileD == 0) ? 'flex' : 'none'}}>
                <div className='vaccanciesBut' 
                style={{border: (myVaccancyChoose == true) ? '0px solid white' : '', 
                top: (myVaccancyChoose == true) ? '-1px' : ''}} onClick={()=>{setMyVaccancyChoose(false)}}>Мое резюме</div>
                <div className='vaccanciesBut' 
                style={{border: (myVaccancyChoose == false) ? '0px solid white' : '', 
                top: (myVaccancyChoose == false) ? '-1px' : ''}} onClick={()=>{setMyVaccancyChoose(true)}}>Мои вакансии</div>
            </div>
            <div className='vaccancies' style={{display: (profileD == 0) ? 'flex' : 'none'}}>
                <a className="vaccanciesCreate" href='/new_resume' style={{display: (resume == false) ? 'block' : 'none'}}>Создать резюме</a>
            </div>

            <div className='profileNoneError' style={{display: (profileD != 0 && profileD != 1) ? 'block' : 'none'}}>{profileD}</div>
        </div>
    )
}