import axios from 'axios'
// import alert from '../alert/actions'
import { toast } from 'react-toastify';


export const signup = ( fName, lName, email, password, cpassword,) => async dispatch => {
    const data = { email: email.toLowerCase(), password, cpassword, fName, lName }
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}api/account/users/`, data)
        const payload = res.data
        console.log(res)
        if (payload.success) {
            toast.success(`Account created successfully`)
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: payload
            })
            return true

        }
    } catch (error) {
        if (error.response) {
            for (const err in error.response.data) {
            toast.error(`${err}: ${(error.response.data[err]).indexOf('my user') !== -1? (error.response.data[err]).replace('my user', 'user'): (error.response.data[err])}`)

            }
        }
    }

}


export const login = (email, password) => async dispatch => {
    const data = { email: email.toLowerCase(), password }
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}api/account/token/`, data)
        const payload = res.data 
        
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: payload
        }) 
        toast.success(`Login successful`)

        return true
    } catch (error) {
        if (error.response) {
            for (const err in error.response.data) {
        toast.error(`${err}: ${error.response.data[err]}`)

            }
        }
    }
}
 
export const authenticate = () => async dispatch => {
    const auth = JSON.parse(localStorage.getItem('auth'))
    if(auth?.isAuthenticated) {
        let data = { token: auth.access }
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}api/account/token/verify/`, data)
        } catch (error) {
        }
    }
}

export const refreshToken = () => async dispatch => {
    const auth = JSON.parse(localStorage.getItem('auth'))
    if(auth?.refresh) {
        let data = { refresh: auth.refresh }
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}api/account/token/refresh/`, data)
            if(res.status === 200){

                dispatch({
                    type: 'REFRESH_TOKEN_SUCCESS',
                    payload: res.data
                })
            }
        } catch (error) {
            dispatch({type: 'LOGOUT'}) 
        }
    }
}
export const logout = () => async dispatch => {
    dispatch({type: 'LOGOUT'}) 
    dispatch({ type: "IS_NOT_ADMIN",  payload: { type: 'user' } })
    toast.success(`Logout successful`)


}