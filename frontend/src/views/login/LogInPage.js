import { useState } from "react";
import { useHistory } from 'react-router-dom';
import Axios from "axios";

import './LogInPage.scss';

export const LoginPage = () =>{

     const [errorMsg, setErrorMsg] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const history =  useHistory();
    
    const onNextClicked = () =>{
        Axios.get('http://localhost:3001/login')
        .then((res)=>{
          console.log("success",res);
          const v =res.data.filter(el=>{
              if(el.email===emailValue && el.password === passwordValue){
                  console.log('go to landing page');
              }
              else{
                  setErrorMsg('UserName or Password is not valid!')
              }
          })
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
            <button onClick={()=>{history.push('/signup')}}>New to Uber? Create Account</button>
            </div>
            </div>
        </div>
    );
}