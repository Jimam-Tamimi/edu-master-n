import {v4 } from 'uuid'

export const setAlert = (message, alertType='success', id) => {
    return {
        type: "SET_ALERT",
        payload: {message, alertType, id}
    }
}


export const removeAlert = (id) => {
    return {
        type: "REMOVE_ALERT",
        payload: {id}
    }
}


export const addNotification =  (message, alertType='success', timeout = 100000) =>{
    return async dispatch =>{
        const id = v4()
        dispatch(setAlert(message, alertType, id))
        await setTimeout(() => {
            dispatch(removeAlert(id))
        }, timeout);
    }
}




