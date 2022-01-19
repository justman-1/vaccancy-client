import { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import $ from 'jquery'
import '../styles/changeProfile.css'
import Header from '../components/Header'
import userImg from '../imgs/user.png'
import Axios from '../axios.js'
import store from '../store'

export default function ChangeResume(props){
    const [load, setLoad] = useState()
    const [nick, setNick] = useState('')
    const [email, setEmail] = useState('')
    const [photo, setPhoto] = useState(null)
    const [photoSrc, setPhotoSrc] = useState('')
    const loading = useRef()
    const profile = useRef()
    const photoInp = useRef()
    const saveChangesBut = useRef()
    const cancelChangesBut = useRef()
    useEffect(async ()=>{
        const [err, res] = await Axios.getProfileSomeInfoForChange()
        if(res){
            console.log(res)
            setNick(res.login)
            setEmail(res.email)
            if(res.photo) setPhotoSrc('/getImage/' + res.photo)
            else setPhotoSrc(userImg)
            $(loading.current).css({ display: 'none'})
            $(profile.current).css({ display: 'block'})
        }
    }, [load])
    function savePhoto(e){
        const inp = photoInp.current
        const file = inp.files[0]
        console.log(file)

        if(file.size > 5000000){
            alert('Выбрете изображение размером до 5мб.')
        }
        else if(file != undefined){
            const fileReader = new FileReader()
            fileReader.onload = fileLoad =>{
                const result = fileLoad.target.result
                setPhotoSrc(result)
                const fd = new FormData()
                fd.append('photo', file)
                setPhoto({
                    fd: fd,
                    originalName: file.name
                })
                console.log(photo)
                inp.value = null
            }
            fileReader.readAsDataURL(file)
        }
    }
    function photoError(){
        if(photoSrc != null && photo != null){
            setPhotoSrc(null)
            setPhoto(null)
            alert('Такой формат фото не поддерживается.')
        }
    }
    async function saveChanges(){
        if( $(saveChangesBut.current).css('opacity') != '1') return null

        $(saveChangesBut.current).css({ opacity: '0.5' })
        $(cancelChangesBut.current).css({ opacity: '0.5' })

        const [err, res] = await Axios.saveProfileInfo({
            login: nick,
            email: email,
            photo: (photo == null) ? null : photo.originalName
        })
        if(res){
            console.log(res)
            localStorage.setItem('refreshToken', res.refreshToken)
            localStorage.setItem('accessToken', res.accessToken)
            if(res.photoName == false || res.photoName == undefined){
                window.location.href = $('.profileIdLink').attr('href')
                return null
            }
            const fd = photo.fd
            const fd2 = new FormData()
            fd2.append('photo', fd.get('photo'), res.photoName)
            $.ajax({
                url: '/saveImage',
                method: 'post',
                headers: {
                    access_token: localStorage.getItem('accessToken'),
                    refresh_token: localStorage.getItem('refreshToken')
                },
                data: fd2,
                contentType: false,
                processData: false,
                success: (res)=>{
                    console.log(res)
                    window.location = $('.profileIdLink').attr('href')
                },
                error: (res)=>{
                    console.log(res)
                    alert(res.responseText)
                    $(saveChangesBut.current).css({ opacity: '1' })
                    $(cancelChangesBut.current).css({ opacity: '1' })
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
        else if(err){
            $(saveChangesBut.current).css({ opacity: '1' })
            $(cancelChangesBut.current).css({ opacity: '1' })
        }
    }
    function cancelChanges(){
        window.location = $('.profileIdLink').attr('href')
    }
    return(
        <div>
            <Header/>
            <Box className='justify-content-center' sx={{ display: 'flex', marginTop: '30px' }} ref={loading}>
                <CircularProgress />
            </Box>
            <div className='profileChangeBl' ref={profile}>
                <div className='d-flex'>
                    <label className='profileChangeBlPhoto'>
                        <img src={photoSrc} className='profileChangeBlPhotoImg' onError={photoError}/>
                        <input type="file" ref={photoInp} style={{display: 'none'}} onChange={savePhoto}/>
                    </label>
                    <div className='profileChangeBlPart'>
                        <Box className='newResumeInp'>
                            <TextField id="outlined-basic" value={nick} onChange={e=>{setNick(e.target.value)}} label="Nickname" variant="outlined" style={{width: '100%'}}/>
                        </Box>
                        <Box className='newResumeInp'>
                            <TextField id="outlined-basic" value={email} onChange={e=>{setEmail(e.target.value)}} label="Email" variant="outlined" style={{width: '100%'}}/>
                        </Box>
                    </div>
                </div>
                <div className='newResumeSave' onClick={saveChanges} style={{marginTop: '40px'}} ref={saveChangesBut}>Сохранить изменения</div>
                <div className='newResumeSave' onClick={cancelChanges} style={{backgroundColor: '#e34242'}} ref={cancelChangesBut}>Не сохранять изменения</div>
            </div>
        </div>
    )
}