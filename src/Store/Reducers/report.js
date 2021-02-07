import * as actionTypes from '../Actions'
import {updateObject} from './utility'

const initialState = {
    monthly:[],
    district:[]
}

const report = (state = initialState, action) => {
    switch(action.type){

        case actionTypes.GET_MONTHLY_REPORT_ACTION: 
            return updateObject(state,{
                monthly: action.data
            })
            
            case actionTypes.GET_DISTRICT_REPORT_ACTION: 
            return updateObject(state,{
                loading: false,
                district: action.data
            })

        default: return state
    }
}

export default report