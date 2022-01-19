import { useRef, useEffect, useState } from 'react'
import $ from 'jquery'
import '../styles/vacancyBl.css'
import searchImg from '../imgs/search.png'
import signinImg from '../imgs/signin.png'

export default function Vacancy(props){
    console.log(props)
    return(
        <a href={'/vacancy/' + props.id}>
            <div className='vacancyBl'>
                
            </div>
        </a>
    )
}