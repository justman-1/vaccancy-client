import { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import $ from 'jquery'
import '../styles/newResume.css'
import Header from '../components/Header'
import Axios from '../axios.js'
import Map from '../components/Map'
import store from '../store'

export default function NewResume(props){
    const [load, setLoad] = useState(0)
    const saveVacancyBut = useRef()
    const map = useRef()
    const [user, setUser] = useState(false)
    const [position, setPosition] = useState('')
    const [company, setCompany] = useState('')
    const [companyActivity, setCompanyActivity] = useState('')
    const [activity, setActivity] = useState('')
    const [experience, setExperience] = useState('')
    const [requirements, setRequirements] = useState('')
    const [conditions, setConditions] = useState('')
    const [skills, setSkills] = useState('')
    const [salary, setSalary] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    useEffect(async ()=>{
        if(localStorage.getItem('accessToken') != undefined || localStorage.getItem('refreshToken') != undefined){
            setUser(true)
        }
        else{
            window.location = '/registration'
        }
    }, [load])
    async function saveVacancy(){
        if($(saveVacancyBut.current).css('opacity') != '1') return null
        $(saveVacancyBut.current).css({
            opacity: '0.4'
        })
        const data = {
            position: position,
            company: company,
            companyActivity: companyActivity,
            activity: activity,
            experience: experience,
            requirements: requirements,
            conditions: conditions,
            skills: skills,
            salary: salary,
            city: city,
            address: address,
            coords: store.getState().map.coords,
            date: new Date()
        }
        console.log(data)
        var [err, res] = await Axios.saveVacancy(data)
        if(res){
            $(saveVacancyBut.current).css({
                opacity: '1'
            })
            window.location = $('.profileIdLink').attr('href')
        }
        else if(err){
            if(err.status == 410){
                alert(err.text)
                $(saveVacancyBut.current).css({
                    opacity: '1'
                })
            }
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
                    <TextField id="outlined-basic" onChange={(e)=>{setPosition(e.target.value)}} label="Назначаемая должность" variant="outlined" style={{width: '100%'}}/>
                </Box>
                <Box className='newResumeInp'>
                    <TextField id="outlined-basic" onChange={(e)=>{setCompany(e.target.value)}} label="Название вашей компании" variant="outlined" style={{width: '100%'}}/>
                </Box>
                <TextField multiline id="outlined-basic" onChange={(e)=>{setCompanyActivity(e.target.value)}} label="Чем занимется ваша компания" variant="outlined" style={{width: '80%',
                                                                                                     marginLeft: '10%', 
                                                                                                     marginTop: '10px', 
                                                                                                     marginBottom: '10px'
                                                                                                    }}/>
                <TextField multiline id="outlined-basic" onChange={(e)=>{setActivity(e.target.value)}} label="Чем предстоит заниматься" variant="outlined" style={{width: '80%',
                                                                                                     marginLeft: '10%', 
                                                                                                     marginTop: '10px', 
                                                                                                     marginBottom: '10px'
                                                                                                    }}/>
                <TextField multiline id="outlined-basic" onChange={(e)=>{setExperience(e.target.value)}} label="Требуемый опыт работы" variant="outlined" style={{width: '80%',
                                                                                                     marginLeft: '10%', 
                                                                                                     marginTop: '10px', 
                                                                                                     marginBottom: '10px'
                                                                                                    }}/>
                <TextField multiline id="outlined-basic" onChange={(e)=>{setRequirements(e.target.value)}} label="Требования и пожелания" variant="outlined" style={{width: '80%',
                                                                                                     marginLeft: '10%', 
                                                                                                     marginTop: '10px', 
                                                                                                     marginBottom: '10px'
                                                                                                    }}/>
                <TextField multiline id="outlined-basic" onChange={(e)=>{setConditions(e.target.value)}} label="Условия" variant="outlined" style={{width: '80%',
                                                                                                     marginLeft: '10%', 
                                                                                                     marginTop: '10px', 
                                                                                                     marginBottom: '10px'
                                                                                                    }}/>
                <TextField multiline id="outlined-basic" onChange={(e)=>{setSkills(e.target.value)}} label="Ключевые навыки" variant="outlined" style={{width: '80%',
                                                                                                     marginLeft: '10%', 
                                                                                                     marginTop: '10px', 
                                                                                                     marginBottom: '10px'
                                                                                                    }}/>
                <Box className='newResumeInp'>
                    <TextField id="outlined-basic" onChange={(e)=>{setSalary(e.target.value)}} label="Зарплата(в долларах)" variant="outlined" type='number' style={{width: '100%'}}/>
                </Box>
                <Box className='newResumeInp'>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Город</InputLabel>
                        <Select onChange={(e)=>{setCity(e.target.value)}} value={city} label="город" labelId="demo-simple-select-label" id="demo-simple-select" style={{width: '100%'}}>
                            <MenuItem value={'Минск'}>Минск</MenuItem>
                            <MenuItem value={'Гродно'}>Гродно</MenuItem>
                            <MenuItem value={'Витебск'}>Витебск</MenuItem>
                            <MenuItem value={'Могилев'}>Могилев</MenuItem>
                            <MenuItem value={'Брест'}>Брест</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box className='newResumeInp'>
                    <TextField id="outlined-basic" onChange={(e)=>{setAddress(e.target.value)}} label="Адрес(если работа неудаленная)" variant="outlined" style={{width: '100%'}}/>
                </Box>
                <div className='newResumeMapSp'>Отметьте ваш офис на карте(если работа неудаленная)</div>
                <Map state="choose"/>
                <div className='newResumeSave' ref={saveVacancyBut} onClick={saveVacancy}>Сохранить вакансию</div>
            </div>
        </div>
    )
}