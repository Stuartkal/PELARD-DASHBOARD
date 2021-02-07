import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import * as actionCreators from '../../../Store/ActionCreators'

import './Styles.scss'
const Login = (props) => {

    const [state,setState] = useState({
        userName:'stuwie',
        password:'pass0123'
    })

    const dispatch = useDispatch()

    // useEffect(()=> {
    //     dispatch(actionCreators.login())
    // },[])

    const loginHandler = (e) => {
        e.preventDefault()
        dispatch(actionCreators.login(state.userName,state.password,(res)=>{
            if(res.success === true){
                props.history.push('./overview')
            }
        }))
    }

    return (
        <div className="auth-main">
            <div className="auth-container">
                <h2>PELARD-N</h2>
                <h4>Login</h4>
                <input
                    value={state.userName}
                    onChange={(e)=> setState({...state, userName: e.target.value})}
                    type="text"
                    placeholder="Username"
                />
                <input
                    value={state.password}
                    onChange={(e)=> setState({...state, password: e.target.value})}
                    type="password"
                    placeholder="Password"
                />
                <button onClick={loginHandler}>Login</button>
                <a href="#">Forgot password? </a>
            </div>
        </div>
    )
}

export default Login
