import { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Checkbox from '@mui/material/Checkbox'
import $ from 'jquery'
import '../styles/main.css'
import Header from '../components/Header'

export default function Main(props){

    return(
        <div>
            <Header/>
            <div className='mainFilters'>
                <div className="mainFiltersPartSp">Город</div>
                <label className='mainFiltersPart d-flex'>
                    <input type='checkbox' />
                    <div className='mainFiltersPartText'>Минск</div>
                </label>
                <label className='d-flex'>
                    <input type='checkbox' />
                    <div className='mainFiltersPartText'>Гродно</div>
                </label>
                <label className='d-flex'>
                    <input type='checkbox' />
                    <div className='mainFiltersPartText'>Витебск</div>
                </label>
                <label className='d-flex'>
                    <input type='checkbox' />
                    <div className='mainFiltersPartText'>Могилев</div>
                </label>
                <label className='d-flex'>
                    <input type='checkbox' />
                    <div className='mainFiltersPartText'>Брест</div>
                </label>

                <div className='mainFiltersUseBut'>Применить</div>
            </div>
            <div className='vacanciesBl'>
                asd
            </div>
        </div>
    )
}