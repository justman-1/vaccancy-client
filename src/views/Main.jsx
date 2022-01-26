import { useRef, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import $ from 'jquery'
import '../styles/main.css'
import Axios from '../axios.js'
import Header from '../components/Header'

export default function Main(props){
    const [load, setLoad] = useState(0)
    const [filters, setFilters] = useState([])
    const [vacancies, setVacancies] = useState([])
    const [loadingState, setLoadingState] = useState(false)
    const loading = useRef()
    useEffect(()=>{
        getVacancies(vacancies.length)
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
    }
    async function getVacancies( index ){
        if(!loadingState){
            setLoadingState(true)
            const [err, res] = await Axios.getVacancies(index, filters)
            if(res){
                console.log(res)
            }
            else if(err){
                console.log(err)
            }
        }
    }
    return(
        <div>
            <Header/>
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

                <div className='mainFiltersUseBut'>Применить</div>
            </div>
            <div className='vacanciesBl'>
                <Box className='justify-content-center' sx={{ display: (loadingState) ? 'flex' : 'none', marginTop: '20px' }} ref={loading}>
                    <CircularProgress />
                </Box>
            </div>
        </div>
    )
}