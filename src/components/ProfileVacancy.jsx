import { useRef, useEffect, useState } from 'react'
import $ from 'jquery'
import Axios from '../axios.js'
import '../styles/profileVacancy.css'
import pencilImg from '../imgs/pencil.png'
import trashcanImg from '../imgs/trashcan.png'
import eyeImg from '../imgs/eye.png'
import store from '../store.js'

export default function ProfileVacancy(props){
    const vacancy = useRef()
    async function deleteVacancy(){
        const result = window.confirm(`Вы действительно хотите удалить вакансию "${props.position}"?`)
        if(result == true){
            const [err, res] = await Axios.deleteVacancy(props.id)
            if(res){
                store.dispatch({type: 'deleteVacancy', id: props.id})
            }
            else if(err){
                alert(err.text)
            }
        }
    }
    return(
            <div className='vacancyIconBl' ref={vacancy}>
                <a href={'/vacancy/' + props.id}><img src={eyeImg} className='vacancyIconEye'/></a>
                <a href={'/changeVacancy/' + props.id}><img src={pencilImg} className='vacancyIconChange'/></a>
                <img src={trashcanImg} className='vacancyIconTrashcan' onClick={deleteVacancy}/>
                <div className='d-flex'>
                    <div className='vacancyIconPosition'>{props.position}</div>
                    <div className='vacancyIconSalary'>{props.salary} USD</div>
                </div>
                <div className='vacancyIconCity'>{props.city}</div>
            </div>
    )
}