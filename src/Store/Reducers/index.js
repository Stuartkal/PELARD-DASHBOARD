import {combineReducers} from 'redux'
import authReducer from './auth'
import getReducer from './get'
import reportReducer from './report'

export default combineReducers({
    auth: authReducer,
    get: getReducer,
    report: reportReducer
})