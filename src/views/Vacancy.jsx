import { useRef, useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import $, { data } from 'jquery'
import '../styles/newResume.css'
import '../styles/profile.css'
import '../styles/vacancy.css'
import Header from '../components/Header'
import Axios from '../axios.js'
import Map from '../components/Map'
import store from '../store'

export default function NewResume(props){
    const id = props.match.params.id
    const [load, setLoad] = useState(0)
    const [user, setUser] = useState(false)
    const [data, setData] = useState({})
    const [dataIndex, setDataIndex] = useState(0)
    const [loadingState, setLoadingState] = useState(false)
    useEffect(async ()=>{
        var [err, res] = await Axios.getVacancy(id)
        if(res){
            console.log(res)
            setData(res.data)
            setDataIndex(1)
        }
        else if(err){
            alert(err.text)
            window.location = '/'
        }
    }, [load])
    async function respond(){
        setLoadingState(true)
        if(localStorage.getItem('accessToken') == undefined || localStorage.getItem('refreshToken') == undefined){
            alert('Вы должны быть зарегистрированы и иметь резюме в профиле, чтобы откикнуться на вакансию')
            setLoadingState(false)
            return null
        }
        else{
            setLoadingState(false)
        }
        const [err, res] = await Axios.respondVacancy(id)
    }
    return(
        <div>
            <Header/>
            <Box className='justify-content-center' sx={{ display: 'flex', marginTop: '30px' }} style={{display: (dataIndex === 0) ? 'flex' : 'none'}}>
                <CircularProgress />
            </Box>
            <div className='newResume' style={{display: (dataIndex === 0) ? 'none' : 'block'}}>
                <div className='vacancyPosition'>{data.position}</div>
                <div className='newResumeTitleText'>{data.salary} USD</div>
                <div className='vacancyCompany'>Компания: {data.company}</div>
                <div className='vacancyPart'>Требуемый опыт работы: {data.experience}</div>
                <div className='vacancyCompany'>Чем занимается компания: {data.company_activity}</div>
                <div className='vacancyCompany'><strong>Обязанности:</strong></div>
                <div className='vacancyCompany'>{data.activity}</div>
                <div className='vacancyCompany'><strong>Требования:</strong></div>
                <div className='vacancyCompany'>{data.requirements}</div>
                <div className='vacancyCompany'><strong>Ключевые навыки:</strong></div>
                <div className='vacancyCompany'>{data.skills}</div>
                <div className='vacancyCompany'>Условия:</div>
                <div className='vacancyPart'>{data.conditions}</div>
                <div className='vacancyCompany' style={{display: (data.address != '') ? 'block' : 'none'}}>Адрес: {data.address}</div>
                <Map state="show" coords={data.coords} />
                <div className='vacancyDate'>{(data.date != undefined && data.date != null) ? data.date.slice(0, 10) : ''}</div>
                <div className='vacancyRespond' onClick={respond} style={{opacity: (!loadingState) ? '1' : '0.4'}}>Откликнуться</div>
            </div>
        </div>
    )
}