import * as actionTypes from '../Actions'
import {updateObject} from './utility'

const initialState = {
    loading: false,
    user:{}
}

const auth = (state = initialState, action) => {
    switch(action.type){

        case actionTypes.LOADER_ACTION: 
            return updateObject(state,{
                loading: true
            })
            
            case actionTypes.LOGIN_ACTION: 
            return updateObject(state,{
                loading: false,
                user: action.data
            })

        default: return state
    }
}

export default auth