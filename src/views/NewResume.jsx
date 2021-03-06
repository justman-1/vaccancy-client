import { useRef, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import $ from 'jquery'
import '../styles/newResume.css'
import Header from '../components/Header'
import Axios from '../axios.js'

export default function NewResume(props){
    const [load, setLoad] = useState(0)
    const photoRef = useRef()
    const saveResumeBut = useRef()
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
    async function saveResume(){
        if($(saveResumeBut.current).css('opacity') != '1'){
            return null
        }
        $(saveResumeBut.current).css({
            opacity: '0.4'
        })
        var [err, res] = await Axios.saveResume({
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
                    $(saveResumeBut.current).css({
                        opacity: '1'
                    })
                },
                error: (res)=>{
                    $(saveResumeBut.current).css({
                        opacity: '1'
                    })
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
            $(saveResumeBut.current).css({
                opacity: '1'
            })
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
            alert('?????????????? ?????????????????????? ???????????????? ???? 5????.')
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
            alert('?????????? ???????????? ???????? ???? ????????????????????????????.')
        }
    }
    return(
        <div>
            <Header/>
            <div className='newResume'>
                <div className='newResumeTitleLine'>
                    <div className='newResumeTitle'><span className='newResumeTitleSp'>???????????????? ????????????????????</span></div>
                </div>
                <Box className='newResumeInp'>
                    <TextField id="outlined-basic" onChange={(e)=>{setPosition(e.target.value)}} label="?????????????? ??????????????????" variant="outlined" style={{width: '100%'}}/>
                </Box>
                <Box className='newResumeInp'>
                    <TextField id="outlined-basic" onChange={(e)=>{setFIO(e.target.value)}} label="??????" variant="outlined" style={{width: '100%'}}/>
                </Box>
                <div className='newResumeInpDateSp'>???????? ????????????????:</div>
                <Box className='newResumeInp'>
                    <TextField id="outlined-basic" onChange={(e)=>{setBorn(e.target.value)}} variant="outlined" style={{width: '100%'}} type='date'/>
                </Box>
                <Box className='newResumeInp'>
                    <TextField id="outlined-basic" onChange={(e)=>{setCity(e.target.value)}} label="?????????? ????????????????????" variant="outlined" style={{width: '100%'}}/>
                </Box>
                <label>
                    <img className='newResumePhotoImg' onError={photoError} src={(photoSrc != null) ? photoSrc : ''} style={{display: (photoSrc != null) ? 'block' : 'none'}}/>
                    <div className='newResumePhoto' style={{display: (photoSrc != null) ? 'none' : 'block'}}>?????????????????? ????????(???? 5???? ?? ?????????????????????? 16:9)</div>
                    <input type="file" onChange={savePhoto} ref={photoRef} style={{display: 'none'}}/>
                </label>
                <div className='newResumeTitleLine' style={{marginTop: '60px'}}>
                    <div className='newResumeTitle'><span className='newResumeTitleSp'>?????????????????? ????????????????????</span></div>
                </div>
                <TextField multiline id="outlined-basic" onChange={(e)=>{setContacts(e.target.value)}} label="????????????????" variant="outlined" style={{width: '80%',
                                                                                                     marginLeft: '10%', 
                                                                                                     marginTop: '10px', 
                                                                                                     marginBottom: '10px'
                                                                                                    }}/>
                <TextField multiline id="outlined-basic" onChange={(e)=>{setExperience(e.target.value)}} label="???????? ????????????" variant="outlined" style={{width: '80%',
                                                                                                     marginLeft: '10%', 
                                                                                                     marginTop: '10px', 
                                                                                                     marginBottom: '10px'
                                                                                                    }}/>
                <TextField multiline id="outlined-basic" onChange={(e)=>{setEducation(e.target.value)}} label="???????????????? ??????????????????????" variant="outlined" style={{width: '80%',
                                                                                                     marginLeft: '10%', 
                                                                                                     marginTop: '10px', 
                                                                                                     marginBottom: '10px'
                                                                                                    }}/>
                <TextField multiline id="outlined-basic" onChange={(e)=>{setLanguages(e.target.value)}} label="???????????????? ??????????????" variant="outlined" style={{width: '80%',
                                                                                                     marginLeft: '10%', 
                                                                                                     marginTop: '10px', 
                                                                                                     marginBottom: '10px'
                                                                                                    }}/>
                <TextField multiline id="outlined-basic" onChange={(e)=>{setSkills(e.target.value)}} label="???????????????????????????????? ????????????" variant="outlined" style={{width: '80%',
                                                                                                     marginLeft: '10%', 
                                                                                                     marginTop: '10px', 
                                                                                                     marginBottom: '10px'
                                                                                                    }}/>
                <TextField multiline id="outlined-basic" onChange={(e)=>{setDescription(e.target.value)}} label="?????????????????? ?? ?????? ?? ?? ?????????? ???????????????????????????????? ??????????????" variant="outlined" style={{width: '80%',
                                                                                                     marginLeft: '10%', 
                                                                                                     marginTop: '10px', 
                                                                                                     marginBottom: '10px'
                                                                                                    }}/>
                <div className='newResumeSave' ref={saveResumeBut} onClick={saveResume}>?????????????????? ????????????</div>

            </div>
        </div>
    )
}