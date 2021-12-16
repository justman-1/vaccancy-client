import { useRef, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import $ from 'jquery'
import '../styles/newResume.css'
import Header from '../components/Header'

export default function NewResume(props){
    const [load, setLoad] = useState(0)
    const photoRef = useRef()
    const [user, setUser] = useState(false)
    const [position, setPosition] = useState('')
    const [FIO, setFIO] = useState('')
    const [born, setBorn] = useState('')
    const [city, setCity] = useState('')
    const [photo, setPhoto] = useState(null)
    const [photoSrc, setPhotoSrc] = useState(null)
    const [contacts, setContacts] = useState('')
    const [experience, setExperience] = useState('')
    const [education, setEducation] = useState('')
    const [languages, setLanguages] = useState('')
    const [skills, setSkills] = useState('')
    const [description, setDescription] = useState('')
    useEffect(()=>{
        if(localStorage.getItem('accessToken') != undefined || localStorage.getItem('refreshToken') != undefined){
            setUser(true)
        }
        else{
            window.location = '/registration'
        }
    }, [load])
    function saveResume(){
        console.log(photo)
        $.ajax({
            url: '/saveResume',
            method: 'post',
            headers: {
                access_token: localStorage.getItem('accessToken'),
                refresh_token: localStorage.getItem('refreshToken')
            },
            data: {
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
            },
            success: (res)=>{
                console.log(res)
                const fd = photo.fd
                const fd2 = new FormData()
                fd2.append('photo', fd.get('photo'))
                $.ajax({
                    url: '/saveImage',
                    method: 'post',
                    headers: {
                        access_token: localStorage.getItem('accessToken'),
                        refresh_token: localStorage.getItem('refreshToken'),
                        photoName: res.photoName
                    },
                    data: fd2,
                    contentType: false,
                    processData: false,
                    success: (res)=>{
                        console.log(res)
                        window.location = $('.profileIdLink').attr('href')
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
            },
            error: (res)=>{
                if(res.status == 401){
                    localStorage.removeItem('accessToken')
                    localStorage.removeItem('refreshToken')
                    $('.signinImg').css({
                        display: 'block'
                    })
                    window.location = '/register'
                }
                else if(res.status == 410){
                    alert(res.responseText)
                }
            }
        })
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
    return(
        <div>
            <Header/>
            <div className='newResume'>
                <div className='newResumeTitleLine'>
                    <div className='newResumeTitle'><span className='newResumeTitleSp'>ОСНОВНАЯ ИНФОРМАЦИЯ</span></div>
                </div>
                <Box className='newResumeInp'>
                    <TextField id="outlined-basic" onChange={(e)=>{setPosition(e.target.value)}} label="Желамая должность" variant="outlined" style={{width: '100%'}}/>
                </Box>
                <Box className='newResumeInp'>
                    <TextField id="outlined-basic" onChange={(e)=>{setFIO(e.target.value)}} label="ФИО" variant="outlined" style={{width: '100%'}}/>
                </Box>
                <div className='newResumeInpDateSp'>Дата рождения:</div>
                <Box className='newResumeInp'>
                    <TextField id="outlined-basic" onChange={(e)=>{setBorn(e.target.value)}} variant="outlined" style={{width: '100%'}} type='date'/>
                </Box>
                <Box className='newResumeInp'>
                    <TextField id="outlined-basic" onChange={(e)=>{setCity(e.target.value)}} label="Город проживания" variant="outlined" style={{width: '100%'}}/>
                </Box>
                <label>
                    <img className='newResumePhotoImg' onError={photoError} src={(photoSrc != null) ? photoSrc : ''} style={{display: (photoSrc != null) ? 'block' : 'none'}}/>
                    <div className='newResumePhoto' style={{display: (photoSrc != null) ? 'none' : 'block'}}>Загрузить фото(до 5мб в соотношении 16:9)</div>
                    <input type="file" onChange={savePhoto} ref={photoRef} style={{display: 'none'}}/>
                </label>
                <div className='newResumeTitleLine' style={{marginTop: '60px'}}>
                    <div className='newResumeTitle'><span className='newResumeTitleSp'>ОСТАЛЬНАЯ ИНФОРМАЦИЯ</span></div>
                </div>
                <TextField multiline id="outlined-basic" onChange={(e)=>{setContacts(e.target.value)}} label="Контакты" variant="outlined" style={{width: '80%',
                                                                                                     marginLeft: '10%', 
                                                                                                     marginTop: '10px', 
                                                                                                     marginBottom: '10px'
                                                                                                    }}/>
                <TextField multiline id="outlined-basic" onChange={(e)=>{setExperience(e.target.value)}} label="Опыт работы" variant="outlined" style={{width: '80%',
                                                                                                     marginLeft: '10%', 
                                                                                                     marginTop: '10px', 
                                                                                                     marginBottom: '10px'
                                                                                                    }}/>
                <TextField multiline id="outlined-basic" onChange={(e)=>{setEducation(e.target.value)}} label="Основное образование" variant="outlined" style={{width: '80%',
                                                                                                     marginLeft: '10%', 
                                                                                                     marginTop: '10px', 
                                                                                                     marginBottom: '10px'
                                                                                                    }}/>
                <TextField multiline id="outlined-basic" onChange={(e)=>{setLanguages(e.target.value)}} label="Владение языками" variant="outlined" style={{width: '80%',
                                                                                                     marginLeft: '10%', 
                                                                                                     marginTop: '10px', 
                                                                                                     marginBottom: '10px'
                                                                                                    }}/>
                <TextField multiline id="outlined-basic" onChange={(e)=>{setSkills(e.target.value)}} label="Профессиональные навыки" variant="outlined" style={{width: '80%',
                                                                                                     marginLeft: '10%', 
                                                                                                     marginTop: '10px', 
                                                                                                     marginBottom: '10px'
                                                                                                    }}/>
                <TextField multiline id="outlined-basic" onChange={(e)=>{setDescription(e.target.value)}} label="О себе" variant="outlined" style={{width: '80%',
                                                                                                     marginLeft: '10%', 
                                                                                                     marginTop: '10px', 
                                                                                                     marginBottom: '10px'
                                                                                                    }}/>
                <div className='newResumeSave' onClick={saveResume}>Сохранить резюме</div>

            </div>
        </div>
    )
}