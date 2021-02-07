import * as actionTypes from '../Actions'
import {updateObject} from './utility'

const initialState = {
    loading: false,
    cases:[],
    case:{},
    request_token:''
}

const get = (state = initialState, action) => {
    switch(action.type){

        case actionTypes.LOADER_ACTION: 
            return updateObject(state,{
                loading: true
            })
            
            case actionTypes.GENERATE_TOKEN_ACTION: 
            return updateObject(state,{
                loading: false,
                request_token: action.data
            })

            case actionTypes.GET_CASES_ACTION: 
            return updateObject(state,{
                loading: false,
                cases: action.data
            })

            case actionTypes.GET_CASE_ACTION: 
            return updateObject(state,{
                loading: false,
                case: action.data
            })

        default: return state
    }
}

export default get