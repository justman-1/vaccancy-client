import { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import $ from 'jquery'
import '../styles/profile.css'
import '../styles/registration.css'
import '../styles/newResume.css'
import Header from '../components/Header'
import userImg from '../imgs/user.png'
import pencilImg from '../imgs/pencil.png'
import Axios from '../axios.js'

export default function Profile(props){
    const id = props.match.params.id
    const [load, setLoad] = useState()
    const [profileD, setProfileD] = useState(1)
    const [login, setLogin] = useState()
    const [userPhoto, setUserPhoto] = useState('')
    const [myVaccancyChoose, setMyVaccancyChoose] = useState(false)
    const [resume, setResume] = useState(0)
    const [resumePhoto, setResumePhoto] = useState(null)
    const [position, setPosition] = useState()
    const [FIO, setFIO] = useState('')
    const [city, setCity] = useState('')
    const [born, setBorn] = useState('')
    const [experience, setExperience] = useState('')
    const [skills, setSkills] = useState('')
    const [education, setEducation] = useState('')
    const [languages, setLanguages] = useState('')
    const [description, setDescription] = useState('')
    const [contacts, setContacts] = useState('')
    const myId = useSelector(state => state.id)
    useEffect(()=>{
        console.log(myId)
    }, [myId])
    useEffect(async ()=>{
        const [err, res] = await Axios.getProfileInfo(id)
        if(err){
            if(err.status == 410){
                setProfileD(err.responseText)
            }  
        }
        else if(res){
            console.log(res)
                setLogin(res.login)
                if(!res.photo) setUserPhoto(userImg)
                if(!res.resume) setResume(false)
                if(res.resume){
                    const resume = res.resume
                    setResumePhoto('/getImage/' + resume.photo)
                    setPosition(resume.position)
                    setFIO(resume.FIO)
                    setCity(resume.city)
                    const bornParts = resume.born.split('-')
                    setBorn(bornParts[0] + '.' + bornParts[1] + '.' + bornParts[2].slice(0, 2))
                    setExperience(resume.experience)
                    setSkills(resume.skills)
                    setEducation(resume.education)
                    setLanguages(resume.languages)
                    setDescription(resume.description)
                    setContacts(resume.contacts)
                    setResume(true)
                    localStorage.setItem('resumeData', JSON.stringify(resume))
                }
                setProfileD(0)
        }
    }, [load])
    useEffect(()=>{

    }, [myVaccancyChoose])
    return(
        <div>
            <Header/>
            <div className='profileBl' style={{display: (profileD == 0) ? 'flex' : 'none'}}>
                <img className='profileChange' src={pencilImg}/>
                <img className='profilePhoto' src={(userPhoto != '') ? userPhoto : ''}/>
                <div className='profileInfoLogin'>{login}</div>
            </div>

            <div className='vaccanciesButs' style={{display: (profileD == 0) ? 'flex' : 'none'}}>
                <div className='vaccanciesBut' 
                style={{border: (myVaccancyChoose == true) ? '0px solid white' : '', 
                top: (myVaccancyChoose == true) ? '-1px' : ''}} onClick={()=>{setMyVaccancyChoose(false)}}>Мое резюме</div>
                <div className='vaccanciesBut' 
                style={{border: (myVaccancyChoose == false) ? '0px solid white' : '', 
                top: (myVaccancyChoose == false) ? '-1px' : ''}} onClick={()=>{setMyVaccancyChoose(true)}}>Мои вакансии</div>
            </div>
            <div className='vaccancies' style={{display: (profileD == 0) ? 'flex' : 'none'}}>
                <a className="resumeCreate" href='/new_resume' style={{display: (resume == false) ? 'block' : 'none'}}>Создать резюме</a>
                <div className='resume' style={{display: (resume == false) ? 'none' : 'block'}}>
                    <a href="/change_resume" className='resumeChangeLink'>
                        <img className='resumeChangeBut' src={pencilImg}/>
                    </a>
                    <div className='d-flex'>
                        <img className='resumePhoto' src={(resumePhoto != null) ? resumePhoto : ''}/>
                        <div>
                            <div className='resumeNameBl'>
                                <div className='resumeNameSp'>Должность:</div>
                                <div className='resumeNameField'>{position}</div>
                            </div>
                            <div className='resumeNameBl'>
                                <div className='resumeNameSp'>ФИО:</div>
                                <div className='resumeNameField'>{FIO}</div>
                            </div>
                            <div className='resumeNameBl'>
                                <div className='resumeNameSp'>Город:</div>
                                <div className='resumeNameField'>{city}</div>
                            </div>
                            <div className='resumeNameBl'>
                                <div className='resumeNameSp'>Дата рождения:</div>
                                <div className='resumeNameField'>{born}</div>
                            </div>
                        </div>
                    </div>
                    <div className='newResumeTitleLine' style={{marginTop: '50px', fontWeight: '600'}}>
                        <div className='newResumeTitle'><span className='newResumeTitleSp'>ОПЫТ РАБОТЫ</span></div>
                    </div>
                    <div>{experience}</div>
                    <div className='newResumeTitleLine' style={{marginTop: '50px', fontWeight: '600'}}>
                        <div className='newResumeTitle'><span className='newResumeTitleSp'>ПРОФЕССИОНАЛЬНЫЕ НАВЫКИ</span></div>
                    </div>
                    <div>{skills}</div>
                    <div className='newResumeTitleLine' style={{marginTop: '50px', fontWeight: '600'}}>
                        <div className='newResumeTitle'><span className='newResumeTitleSp'>ОСНОВНОЕ ОБРАЗОВАНИЕ</span></div>
                    </div>
                    <div>{education}</div>
                    <div className='newResumeTitleLine' style={{marginTop: '50px', fontWeight: '600'}}>
                        <div className='newResumeTitle'><span className='newResumeTitleSp'>ВЛАДЕНИЕ ЯЗЫКАМИ</span></div>
                    </div>
                    <div>{languages}</div>
                    <div className='newResumeTitleLine' style={{marginTop: '50px', fontWeight: '600'}}>
                        <div className='newResumeTitle'><span className='newResumeTitleSp'>ПОДРОБНЕЕ</span></div>
                    </div>
                    <div>{description}</div>
                    <div className='newResumeTitleLine' style={{marginTop: '50px', fontWeight: '600'}}>
                        <div className='newResumeTitle'><span className='newResumeTitleSp'>КОНТАКТЫ</span></div>
                    </div>
                    <div>{contacts}</div>
                </div>
            </div>

            <div className='profileNoneError' style={{display: (profileD != 0 && profileD != 1) ? 'block' : 'none'}}>{profileD}</div>
        </div>
    )
}