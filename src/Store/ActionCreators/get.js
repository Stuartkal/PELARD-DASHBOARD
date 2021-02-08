import axios from 'axios'
import * as actionTypes from '../Actions'


const baseUrl = 'https://pelard-n.herokuapp.com';
const secret = '2cfb9e9a-34a9-4843-961f-6e2639c41856-b10445eb-a0e8-4fa2-b636-015b2f1e3660';



export const loaderAction = () => {
    return {
        type: actionTypes.LOADER_ACTION
    }
}

export const generateTokenAction = (data) => {
    return {
        type: actionTypes.GENERATE_TOKEN_ACTION,
        data
    }
}

export const getCasesAction = (data) => {
    return {
        type: actionTypes.GET_CASES_ACTION,
        data
    }
}

export const getCaseAction = (data) => {
    return {
        type: actionTypes.GET_CASE_ACTION,
        data
    }
}


export const generateToken = () => {
    return (dispatch,getState) => {

        const userId = getState().auth.user._id
        console.log(userId)
        const data = {
            secret: secret,
            _id: userId
        }

        axios.post(`${baseUrl}/token/generate`,data,{
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log(res)
        dispatch(generateTokenAction(res.data.data.token))
        // return res.data.data.token
        })
        .catch(err => {
            console.log(err)
        })
        // console.log(token)
    
    }
}

export const getCases = () => {
    return async (dispatch,getState) => {
        dispatch(loaderAction())
        await dispatch(generateToken())
        const token = getState().get.request_token
        console.log('my token',token)
        const start = "2020-01-01"
        const end = "2020-12-31"
        // const token = token
        axios.get(`${baseUrl}/violations`,{
            headers:{
                Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWIxNDYzZTRlMDAyNzAwMDRkNGE2MDEiLCJpYXQiOjE2MTI4MDQ0NTQsImV4cCI6MTYxMjgwODA1NH0.a5b6qoT-KF13g_LAkZEBhGBWS024TqU-AAAujxojCls"
            }
        })
        .then(res => {
            console.log(res.data.data.violations)
            dispatch(getCasesAction(res.data.data.violations))
        })
        .catch(err => {
            console.log(err)
        })
        
    }
}

export const getSingleCase = (id, callback) => {
    return async (dispatch,getState) => {
        dispatch(loaderAction())
        const token = getState().get.request_token
        console.log('my token',token)
        axios.get(`${baseUrl}/violations/${id}`,{
            headers:{
                Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWIxNDYzZTRlMDAyNzAwMDRkNGE2MDEiLCJpYXQiOjE2MTI4MDQ0NTQsImV4cCI6MTYxMjgwODA1NH0.a5b6qoT-KF13g_LAkZEBhGBWS024TqU-AAAujxojCls"
            }
        })
        .then(res => {
            // console.log(res.data.data)
            dispatch(getCaseAction(res.data.data))
            callback({success: true, res})
        })
        .catch(err => {
            console.log(err)
            callback({ success:true ,res: err })
        })

    }
}



export const deleteCase = (id,callback) => {
    return (dispatch,getState) => {
        dispatch(loaderAction())
        const token = getState().get.request_token

        axios.delete(`${baseUrl}/violations/${id}`)
        .then(res => {
            console.log(res)
            callback({success: true, res})
        })
        .catch(err => {
            console.log(err)
            callback({success: true, res: err})
        })
    }
}

export const updateCase = (id,callback) => {
    return (dispatch,getState) => {
        dispatch(loaderAction())
        const token = getState().get.request_token

        axios.put(`${baseUrl}/violations/${id}`)
        .then(res => {
            console.log(res)
            callback({success: true, res})
        })
        .catch(err => {
            console.log(err)
            callback({success: true, res: err})
        })
    }
}



export const generatePdf = (id) => {
    return dispatch => {
        window.open(`https://pelard-n.herokuapp.com/documents/${id}/generate-pdf`, '_blank') ||
        (window.location.href = `https://pelard-n.herokuapp.com/documents/${id}/generate-pdf`)
    }
}




