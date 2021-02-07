import axios from 'axios'
import * as actionTypes from '../Actions'

const baseUrl = 'https://pelard-n.herokuapp.com';
const secret = '2cfb9e9a-34a9-4843-961f-6e2639c41856-b10445eb-a0e8-4fa2-b636-015b2f1e3660';

export const generateTokenAction = (data) => {
    return {
        type: actionTypes.GENERATE_TOKEN_ACTION,
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

export const monthlyReportAction = (data) => {
    return {
        type: actionTypes.GET_MONTHLY_REPORT_ACTION,
        data
    }
}

export const districtReportAction = (data) => {
    return {
        type: actionTypes.GET_DISTRICT_REPORT_ACTION,
        data
    }
}

export const monthlyReport = () => {
    return (dispatch,getState) => {
        const token = getState().get.request_token
        
        axios.get(`${baseUrl}/reports/monthly`,{
            headers:{
                Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWIxNDYzZTRlMDAyNzAwMDRkNGE2MDEiLCJpYXQiOjE2MTI0NDQwMDgsImV4cCI6MTYxMjQ0NzYwOH0.65nxBJjbniNwwxzMm-hsudZZXJHR_hQ8ZgAj3Wr1l9Q"
            }
        })
        .then(res => {
            // console.log(res.data.data)
            dispatch(monthlyReportAction(res.data.data))
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const districtReport = () => {
    return (dispatch,getState) => {
        const token = getState().get.request_token
        
        axios.get(`${baseUrl}/reports/districts`,{
            headers:{
                Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWIxNDYzZTRlMDAyNzAwMDRkNGE2MDEiLCJpYXQiOjE2MTI0NDQwMDgsImV4cCI6MTYxMjQ0NzYwOH0.65nxBJjbniNwwxzMm-hsudZZXJHR_hQ8ZgAj3Wr1l9Q"
            }
        })
        .then(res => {
            console.log(res)
            dispatch(districtReportAction(res.data.data))
        })
        .catch(err => {
            console.log(err)
        })
    }
}