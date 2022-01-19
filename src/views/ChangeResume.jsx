import { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import $, { cssNumber } from 'jquery'
import '../styles/newResume.css'
import Header from '../components/Header'
import Axios from '../axios.js'
import store from '../store'

export default function ChangeResume(props){
    const resumeData = JSON.parse((localStorage.getItem('resumeData') != undefined) ? localStorage.getItem('resumeData') : '{}')
    const [load, setLoad] = useState(0)
    const photoRef = useRef()
    const saveResumeBut = useRef()
    const cancelResumeBut = useRef()
    const [user, setUser] = useState(false)
    const [position, setPosition] = useState(null)
    const [FIO, setFIO] = useState(null)
    const [born, setBorn] = useState(null)
    const [city, setCity] = useState(null)
    const [photo, setPhoto] = useState(null)
    const [photoSrc, setPhotoSrc] = useState('/getImage/' + resumeData.photo)
    const [contacts, setContacts] = useState(null)
    const [experience, setExperience] = useState(null)
    const [education, setEducation] = useState(null)
    const [languages, setLanguages] = useState(null)
    const [skills, setSkills] = useState(null)
    const [description, setDescription] = useState(null)
    useEffect(()=>{
        if(localStorage.getItem('accessToken') != undefined || localStorage.getItem('refreshToken') != undefined){
            setUser(true)
        }
        else{
            window.location = '/registration'
        }
    }, [load])
    async function saveResume(){
        if($(saveResumeBut.current).css('opacity') != '1'){
            return null
        }
        $(saveResumeBut.current).css({ opacity: '0.4' })
        $(cancelResumeBut.current).css({ opacity: '0.4' })
        var [err, res] = await Axios.changeResume({
            position: position,
            FIO: FIO,
            born: born,
            city: city,
            photo: (photo != null) ? photo.originalName : null,
            contacts: contacts,
            experience: experience,
            education: education,
            languages: languages,
            skills: skills,
            description: description
        })
        if(res){
            localStorage.setItem('refreshToken', res.refreshToken)
            localStorage.setItem('accessToken', res.accessToken)
            console.log(res)
            if(res.photoName == false || res.photoName == undefined){
                window.location.href = $('.profileIdLink').attr('href')
                return null
            }
            console.log(1)
            const fd = photo.fd
            const fd2 = new FormData()
            fd2.append('photo', fd.get('photo'), res.photoName)
            console.log(2)
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
                    $(saveResumeBut.current).css({ opacity: '1' })
                    $(cancelResumeBut.current).css({ opacity: '1' })
                    console.log(res)
                    window.location = $('.profileIdLink').attr('href')
                },
                error: (res)=>{
                    console.log(res)
                    $(saveResumeBut.current).css({ opacity: '1' })
                    $(cancelResumeBut.current).css({ opacity: '1' })
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
            $(saveResumeBut.current).css({ opacity: '1' })
            $(cancelResumeBut.current).css({ opacity: '1' })
            if(err.status == 401){
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                $('.signinImg').css({
                    display: 'block'
                })
                window.location = '/registration'
            }
            else if(err.status == 410){
                alert(err.text)
            }
        }
    }
    function savePhoto(e){
        const inp = photoRef.current
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
        if(photoSrc != null){
            setPhotoSrc(null)
            setPhoto(null)
            alert('Такой формат фото не поддерживается.')
        }
    }
    function cancelSaveResume(){
        window.location = $('.profileIdLink').attr('href')
    }
    return(
        <div>
            <Header/>
            <div className='newResume'>
                <div className='newResumeTitleLine'>
                    <div className='newResumeTitle'><span className='newResumeTitleSp'>ОСНОВНАЯ ИНФОРМАЦИЯ</span></div>
                </div>
                <Box className='newResumeInp'>
                    <TextField id="outlined-basic" defaultValue={resumeData.position} onChange={(e)=>{setPosition(e.target.value)}} label="Желамая должность" variant="outlined" style={{width: '100%'}}/>
                </Box>
                <Box className='newResumeInp'>
                    <TextField id="outlined-basic" defaultValue={resumeData.FIO} onChange={(e)=>{setFIO(e.target.value)}} label="ФИО" variant="outlined" style={{width: '100%'}}/>
                </Box>
                <div className='newResumeInpDateSp'>Дата рождения:</div>
                <Box className='newResumeInp'>
                    <TextField id="outlined-basic" defaultValue={resumeData.born.slice(0, 10)} onChange={(e)=>{setBorn(e.target.value)}} variant="outlined" style={{width: '100%'}} type='date'/>
                </Box>
                <Box className='newResumeInp'>
                    <TextField id="outlined-basic" defaultValue={resumeData.city} onChange={(e)=>{setCity(e.target.value)}} label="Город проживания" variant="outlined" style={{width: '100%'}}/>
                </Box>
                <label>
                    <img className='newResumePhotoImg' onError={photoError} src={(photoSrc != null) ? photoSrc : ''} style={{display: (photoSrc != null) ? 'block' : 'none'}}/>
                    <div className='newResumePhoto' style={{display: (photoSrc != null) ? 'none' : 'block'}}>Загрузить фото(до 5мб в соотношении 16:9)</div>
                    <input type="file" onChange={savePhoto} ref={photoRef} style={{display: 'none'}}/>
                </label>
                <div className='newResumeTitleLine' style={{marginTop: '60px'}}>
                    <div className='newResumeTitle'><span className='newResumeTitleSp'>ОСТАЛЬНАЯ ИНФОРМАЦИЯ</span></div>
                </div>
                <TextField multiline id="outlined-basic" defaultValue={resumeData.contacts} onChange={(e)=>{setContacts(e.target.value)}} label="Контакты" variant="outlined" style={{width: '80%',
                                                                                                     marginLeft: '10%', 
                                                                                                     marginTop: '10px', 
                                                                                                     marginBottom: '10px'
                                                                                                    }}/>
                <TextField multiline id="outlined-basic" defaultValue={resumeData.experience} onChange={(e)=>{setExperience(e.target.value)}} label="Опыт работы" variant="outlined" style={{width: '80%',
                                                                                                     marginLeft: '10%', 
                                                                                                     marginTop: '10px', 
                                                                                                     marginBottom: '10px'
                                                                                                    }}/>
                <TextField multiline id="outlined-basic" defaultValue={resumeData.education} onChange={(e)=>{setEducation(e.target.value)}} label="Основное образование" variant="outlined" style={{width: '80%',
                                                                                                     marginLeft: '10%', 
                                                                                                     marginTop: '10px', 
                                                                                                     marginBottom: '10px'
                                                                                                    }}/>
                <TextField multiline id="outlined-basic" defaultValue={resumeData.languages} onChange={(e)=>{setLanguages(e.target.value)}} label="Владение языками" variant="outlined" style={{width: '80%',
                                                                                                     marginLeft: '10%', 
                                                                                                     marginTop: '10px', 
                                                                                                     marginBottom: '10px'
                                                                                                    }}/>
                <TextField multiline id="outlined-basic" defaultValue={resumeData.skills} onChange={(e)=>{setSkills(e.target.value)}} label="Профессиональные навыки" variant="outlined" style={{width: '80%',
                                                                                                     marginLeft: '10%', 
                                                                                                     marginTop: '10px', 
                                                                                                     marginBottom: '10px'
                                                                                                    }}/>
                <TextField multiline id="outlined-basic" defaultValue={resumeData.description} onChange={(e)=>{setDescription(e.target.value)}} label="Подробнее о вас и о ваших профессиональных навыках" variant="outlined" style={{width: '80%',
                                                                                                     marginLeft: '10%', 
                                                                                                     marginTop: '10px', 
                                                                                                     marginBottom: '10px'
                                                                                                    }}/>
                <div className='newResumeSave' ref={saveResumeBut} onClick={saveResume}>Сохранить резюме</div>
                <div className='newResumeSave' ref={cancelResumeBut} onClick={cancelSaveResume} style={{backgroundColor: '#e34242'}}>Не применять изменений</div>
            </div>
        </div>
    )
}