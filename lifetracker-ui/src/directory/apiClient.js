import axios from "axios"

class ApiClient{
    constructor(remoteHostUrl){
        this.remoteHostUrl = remoteHostUrl
        this.token = null
        this.tokenName = "lifetracker_token"
    }   

    setToken(token){
        this.token=token
        localStorage.setItem(this.tokenName, token)
    }

    async fetchUserFromToken(){
        return await this.request({endpoint :`auth/me` , method : `GET`})
    }
    async request({endpoint, method =  `GET`, data={}}){
        const url = `${this.remoteHostUrl}/${endpoint}`

        const headers = {
            "Content-Type" : "application/json"
        }

        if(this.token){
            headers["Authorization"] = `Bearer ${this.token}`
        }

        try{
            const res = await axios({url, method, data, headers})
            return {data : res.data, error : null}
        }
        catch(error){
            console.error({errorResponse : error.response})
            const message = error?.response?.data?.error?.message
            return {data : null, error : message || String(error)}
        }
    }

    async loginUser(credentials){
        return await this.request({endpoint: `auth/login`,
        method : `POST`, data : credentials
        })
    }

    async signupUser(credentials){
        return await this.request({endpoint: `auth/register`,
        method : `POST`, data : credentials
        })
    }

    async nutrition(){
        return await this.request({endpoint: `nutrition`,
        method : `GET`, data : {}
        })
    }

    async createNutrition(credentials){
        return await this.request({endpoint: `nutrition`,
    method : `POST`, data : credentials})
    }

    async exercise(){
        return await this.request({endpoint: `exercise`,
        method : `GET`, data : {}
        })
    }

    async createExercise(credentials){
        return await this.request({endpoint: `exercise`,
    method : `POST`, data : credentials})
    }

    async sleep(){
        return await this.request({endpoint: `sleep`,
        method : `GET`, data : {}
        })
    }

    async createSleep(credentials){
        return await this.request({endpoint: `sleep`,
    method : `POST`, data : credentials})
    }

    async activity(){
        return await this.request({endpoint: `activity`,
    method : `GET`, data : {}})
    }

    async logoutUser(){
        this.setToken(null)
        localStorage.setItem(this.tokenName, "")
    }

}

//http://localhost:3001
export default new ApiClient("https://lifestracker.herokuapp.com")