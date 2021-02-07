import axios from 'axios'
import * as actionTypes from '../Actions'


const baseUrl = 'https://pelard-n.herokuapp.com';
const secret = '2cfb9e9a-34a9-4843-961f-6e2639c41856-b10445eb-a0e8-4fa2-b636-015b2f1e3660';


export const loaderAction = () => {
    return {
        type: actionTypes.LOADER_ACTION
    }
}

export const loginAction = (data) => {
    return {
        type: actionTypes.LOGIN_ACTION,
        data
    }
}


export const generateToken = async () => {
    const response = await fetch(`${baseUrl}/token/generate`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ secret })
	});

	const json = await response.json();
	console.log(json);
	return json.data.token;
}

export const login = (userName,password,callback) => {
    return async (dispatch) => {
        dispatch(loaderAction())
        const data= {
            userName,
            password
        }
       const token = await generateToken()

        axios.post(`${baseUrl}/user/login`,data,{
            headers:{
                ContentType: 'Application/json',
                Authorization: token
            }
        })
        .then(res => {
            // console.log(res.data.data.user)
            dispatch(loginAction(res.data.data.user))
            callback({success: true, res})
        })
        .catch(err => {
            // console.log(err)
            callback({success: false, res: err})

        })
        
    }
}