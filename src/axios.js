import axios from 'axios'
import $ from 'jquery'
import store from './store'

class Axios{

    constructor(){
        if(localStorage.getItem('accessToken') != undefined &&
           localStorage.getItem('refreshToken') != undefined){
            this.user = true
        }
        else{
            this.user = false
        } 
    }

    async register(login, email, password){
        try{
            const { data } = await axios({
                url: '/register',
                method: 'post',
                data: {
                    login: login,
                    email: email,
                    password: password
                }
            })
            localStorage.setItem('refreshToken', data.refreshToken)
            localStorage.setItem('accessToken', data.accessToken)
            window.location = '/profile/' + data.id
            return [null, data]
        }catch(err){
            err = err.response
            return [{status: err.status, text: err.data}, null]
        }
    }

    async signInByEmail(email, password){
        try{
            const { data } = await axios({
                url: '/signin',
                method: 'post',
                data: {
                    email: email,
                    password: password
                }
            })
            localStorage.setItem('refreshToken', data.refreshToken)
            localStorage.setItem('accessToken', data.accessToken)
            window.location = '/profile/' + data.id
            return [null, data] 
        }catch(err){
            err = err.response
            return [{status: err.status, text: err.data}, null]
        }
    }

    async getPhoto(id){
        try{
            const { data } = await axios({
                url: '/getPhoto',
                method: 'get',
                params: {
                    id: id
                },
                headers: {
                    access_token: localStorage.getItem('accessToken'),
                    refresh_token: localStorage.getItem('refreshToken')
                }
            })
            localStorage.setItem('refreshToken', data.refreshToken)
            localStorage.setItem('accessToken', data.accessToken)  
            this.id = data.id
            store.dispatch({type: 'id', value: data.id})
            return [null, data]
        }catch(err){
            err = err.response
            return [{status: err.status, text: err.data}, null]
        }
    }

    async getProfileInfo(id){
        try{
            const { data } = await axios({
                url: '/getProfileInfo',
                method: 'get',
                params: {
                    id: id
                }
            })
            return [null, data]
        }catch(err){
            err = err.response
            return [{status: err.status, text: err.data}, null]
        }
    }

    async saveResume(docs){
        try{
            const { data } = await axios({
                url: '/saveResume',
                method: 'post',
                data: docs,
                headers: {
                    access_token: localStorage.getItem('accessToken'),
                    refresh_token: localStorage.getItem('refreshToken')
                }
            })
            localStorage.setItem('refreshToken', data.refreshToken)
            localStorage.setItem('accessToken', data.accessToken)
            return [null, data]
        }catch(err){
            err = err.response
            return [{status: err.status, text: err.data}, null]
        }
    }

    async changeResume(docs){
        try{
            const { data } = await axios({
                url: '/changeResume',
                method: 'post',
                data: docs,
                headers: {
                    access_token: localStorage.getItem('accessToken'),
                    refresh_token: localStorage.getItem('refreshToken')
                }
            })
            localStorage.setItem('refreshToken', data.refreshToken)
            localStorage.setItem('accessToken', data.accessToken)
            return [null, data]
        }catch(err){
            err = err.response
            return [{status: err.status, text: err.data}, null]
        }
    }

    async getProfileSomeInfoForChange(){
        try{
            const { data } = await axios({
                url: '/getProfileSomeInfoForChange',
                method: 'get',
                headers: {
                    access_token: localStorage.getItem('accessToken'),
                    refresh_token: localStorage.getItem('refreshToken')
                }
            })
            localStorage.setItem('refreshToken', data.refreshToken)
            localStorage.setItem('accessToken', data.accessToken)
            return [null, data]
        }catch(err){
            err = err.response
            if(err.status == 401){
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('accessToken')
            }
            return [{status: err.status, text: err.data}, null]
        }
    }

    async saveProfileInfo(docs){
        try{
            const { data } = await axios({
                url: '/saveProfileInfo',
                method: 'post',
                data: docs,
                headers: {
                    access_token: localStorage.getItem('accessToken'),
                    refresh_token: localStorage.getItem('refreshToken')
                }
            })
            localStorage.setItem('refreshToken', data.refreshToken)
            localStorage.setItem('accessToken', data.accessToken)
            return [null, data]
        }catch(err){
            err = err.response
            if(err.status == 401){
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('accessToken')
            }
            else if(err.status == 410){
                console.log(err)
                alert(err.data)
            }
            return [{status: err.status, text: err.data}, null]
        }
    }

    async saveVacancy(docs){
        try{
            const { data } = await axios({
                url: '/saveVacancy',
                method: 'post',
                data: docs,
                headers: {
                    access_token: localStorage.getItem('accessToken'),
                    refresh_token: localStorage.getItem('refreshToken')
                }
            })
            localStorage.setItem('refreshToken', data.refreshToken)
            localStorage.setItem('accessToken', data.accessToken)
            return [null, data]
        }catch(err){
            err = err.response
            if(err.status == 401){
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('accessToken')
            }
            return [{status: err.status, text: err.data}, null]
        }
    }

    async getVacancy(id){
        try{
            const { data } = await axios({
                url: '/getVacancy',
                method: 'get',
                params: { id: id },
                headers: {
                    access_token: localStorage.getItem('accessToken'),
                    refresh_token: localStorage.getItem('refreshToken')
                }
            })
            return [null, data]
        }catch(err){
            err = err.response
            return [{status: err.status, text: err.data}, null]
        }
    }

    async changeVacancy(docs){
        try{
            const { data } = await axios({
                url: '/changeVacancy',
                method: 'post',
                data: docs,
                headers: {
                    access_token: localStorage.getItem('accessToken'),
                    refresh_token: localStorage.getItem('refreshToken')
                }
            })
            localStorage.setItem('refreshToken', data.refreshToken)
            localStorage.setItem('accessToken', data.accessToken)
            return [null, data]
        }catch(err){
            err = err.response
            if(err.status == 401){
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('accessToken')
            }
            return [{status: err.status, text: err.data}, null]
        }
    }

    async deleteVacancy(id){
        try{
            const { data } = await axios({
                url: '/deleteVacancy',
                method: 'post',
                data: { id: id },
                headers: {
                    access_token: localStorage.getItem('accessToken'),
                    refresh_token: localStorage.getItem('refreshToken')
                }
            })
            localStorage.setItem('refreshToken', data.refreshToken)
            localStorage.setItem('accessToken', data.accessToken)
            return [null, data]
        }catch(err){
            err = err.response
            if(err.status == 401){
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('accessToken')
            }
            return [{status: err.status, text: err.data}, null]
        }
    }

    async getVacancies(index, filters){
        try{
            const { data } = await axios({
                url: '/getVacancies',
                method: 'get',
                headers: {
                    index: index,
                    filters: filters
                }
            })
            return [null, data]
        }catch(err){
            err = err.response
            return [{status: err.status, text: err.data}, null]
        }
    }

}

export default new Axios()