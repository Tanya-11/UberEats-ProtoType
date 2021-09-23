import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import {userLogInProgress, 
  userLogInFail, 
  userLogInSuccess,
  userSignedUpInProgress } from '../../redux/actions/actions';
import Axios from "axios";
import './auth.scss';

export const LoginPage = () =>{

    const [errorMsg, setErrorMsg] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const history =  useHistory();
    const dispatch = useDispatch();
  
    useEffect(()=>{
      dispatch(userLogInProgress('In progress'));
    },[])
    
    const onNextClicked = () =>{
        Axios.post('http://localhost:3001/login',{
          email:emailValue,
          password:passwordValue
        })
        .then((res)=>{
          console.log("success",res);
            dispatch(userLogInSuccess('Success'));
            history.push('/dashboard');
        })
        .catch(err=>{
          dispatch(userLogInFail('fail'));
          throw err;
        })
      }
    return (
        <div className="login-container">
        <div className="login-wrapper">
        <div className="logo"/>
            <h1>Welcome Back</h1>
            {errorMsg && <div className="fail">{errorMsg}</div>}
            <div className="login-form">
            <input 
            value={emailValue}
            onChange={e=>setEmailValue(e.target.value)}
            type="email" 
            placeholder="Email"/>
            <input 
            value={passwordValue}
            onChange={e=>setPasswordValue(e.target.value)}
            type="password" 
            placeholder="Password"/>
            <button 
            disabled={!emailValue || !passwordValue}
            onClick={onNextClicked}>Next</button>
            <button onClick={()=>{
                history.push('/signup');
                dispatch(userSignedUpInProgress('SignUp In Progress'))
                }}>New to Uber? Create Account</button>
            </div>
            </div>
        </div>
    );
}