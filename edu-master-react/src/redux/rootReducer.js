import {combineReducers} from 'redux'
import authReducer from './auth/reducers' 
import alertReducer from './notification/reducer'
const rootReducer = combineReducers({
    auth: authReducer,
    alert: alertReducer
})

export default rootReducer