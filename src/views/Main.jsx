import { useRef, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import store from '../store.js'
import $ from 'jquery'
import '../styles/main.css'
import Axios from '../axios.js'
import Header from '../components/Header'
import Vacancy from '../components/Vacancy'

export default function Main(props){
    const url = new URL(window.location.href)
    console.log(url.searchParams.get('filters'))
    const [load, setLoad] = useState(0)
    const [filters, setFilters] = useState([])
    const [vacancies, setVacancies] = useState([])
    const [loadingState, setLoadingState] = useState(false)
    const [date, setDate] = useState(new Date())
    const loading = useRef()
    useEffect(()=>{
        const request = decodeURIComponent(url.searchParams.get('request'))
        const filters = JSON.parse(decodeURIComponent(url.searchParams.get('filters')))
        console.log(props)
        if(request){
            store.dispatch({type: 'changeSearchRequest', value: request})
        }
        getVacancies()
    }, [load])
    function changeFilters(e){
        const checkbox = e.target
        const value = e.target.parentNode.children[1].innerHTML
        if(checkbox.checked){
            filters.find((e, i)=>{
                if(e == value){
                    filters.splice(i, 1)
                    return true
                }
            })
            filters.push(value)
        }
        else{
            filters.find((e, i)=>{
                if(e == value){
                    filters.splice(i, 1)
                    return true
                }
            })
        }
        setFilters(filters)
        store.dispatch({type: 'changeSearchFilters', value: filters})
    }
    async function getVacancies(){
        if(!loadingState){
            setLoadingState(true)
            setVacancies([])
            const [err, res] = await Axios.getVacancies( store.getState().searchRequest, filters, date)
            if(res){
                console.log(res)
                setLoadingState(false)
                setVacancies(res)
            }
            else if(err){
                console.log(err)
                setLoadingState(false)
            }
        }
    }
    return(
        <div>
            <Header request={decodeURIComponent(url.searchParams.get('request'))}/>
            <div className='mainFilters'>
                <div className="mainFiltersPartSp">Город</div>
                <label className='mainFiltersPart d-flex'>
                    <input type='checkbox' onChange={changeFilters}/>
                    <div className='mainFiltersPartText'>Минск</div>
                </label>
                <label className='d-flex'>
                    <input type='checkbox' onChange={changeFilters}/>
                    <div className='mainFiltersPartText'>Гродно</div>
                </label>
                <label className='d-flex'>
                    <input type='checkbox' onChange={changeFilters}/>
                    <div className='mainFiltersPartText'>Витебск</div>
                </label>
                <label className='d-flex'>
                    <input type='checkbox' onChange={changeFilters}/>
                    <div className='mainFiltersPartText'>Могилев</div>
                </label>
                <label className='d-flex'>
                    <input type='checkbox' onChange={changeFilters}/>
                    <div className='mainFiltersPartText'>Брест</div>
                </label>

                <div className='mainFiltersUseBut' onClick={getVacancies} style={{opacity: (loadingState) ? '0.5' : '1'}}>Применить</div>
            </div>
            <div className='vacanciesBl'>
                <Box className='justify-content-center' sx={{ display: (loadingState) ? 'flex' : 'none', marginTop: '20px' }} ref={loading}>
                    <CircularProgress />
                </Box>
                <div className='vacanciesBlNone' style={{display: (vacancies.length == 0 && !loadingState) ? 'block' : 'none'}}>На данный момент такие вакансии отсутствуют :/</div>
                {vacancies.map((e, i)=>{
                    return <Vacancy {...e} key={i}/>
                })}
            </div>
        </div>
    )
}