import { useRef, useEffect, useState } from 'react'
import $ from 'jquery'
import '../styles/main.css'
import searchImg from '../imgs/search.png'
import markerImg from '../imgs/marker.svg'

export default function Vacancy(props){
    console.log(props)
    return(
        <div className='vacancyBl'>
            <div><a href={'/vacancy/' + props.id} className='vacancyBlPosition'>{props.position}</a></div>
            <div><span className='vacancyBlCompany'>{props.company}</span><img src={markerImg} className='vacancyBlMarker'/></div>
            <div className='vacancyBlCompany'>{props.city}</div>
            <div className='vacancyBlActivity'>{props.activity}</div>
            <div>
                <div className='vacancyBlRespond'>Откликнуться</div>
            </div>
        </div>
    )
}