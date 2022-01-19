import { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import $, { map } from 'jquery'
import store from '../store.js'

export default function MapComp(props){
    const [location, setLocation] = useState(null)
    const [center, setCenter] = useState([53.873744, 27.578746])
    const [propsIndex, setPropsIndex] = useState(null)
    useEffect(()=>{
        if(props.state == 'show'){
            var coords = props.coords
            console.log(coords)
            if(!coords) return $('.map').css({ display: 'none' })
            $('.map').css({ display: 'block' })
            setLocation(coords)
            setCenter(coords)
        }
        else if(props.state == 'choose'){
            if(props.coords != undefined && props.coords){
                if(!propsIndex){
                    var coords = props.coords
                    $('.map').css({ display: 'block' })
                    setLocation(coords)
                    setCenter(coords)
                    setPropsIndex(1)
                    store.dispatch({type: 'saveCoords', coords: coords})
                }
            }
        }
    })
    function choosePlace(e){
        if(props.state == 'choose'){
            console.log(e.get('coords'))
            var coords = e.get('coords')
            setLocation(coords)
            store.dispatch({type: 'saveCoords', coords: coords})
        }
    }
    function delMark(){
        if(props.state == 'choose'){
            store.dispatch({type: 'saveCoords', coords: null})
            setLocation(null)
        }
    }
    return(
        <div className='map'>
            <YMaps location>
                <Map defaultState={{ center: center, zoom: 11 }} height='200px' width="100%" onClick={choosePlace}>
                    <Placemark geometry={location} onClick={delMark} />
                </Map>
            </YMaps>
        </div>
    )
}