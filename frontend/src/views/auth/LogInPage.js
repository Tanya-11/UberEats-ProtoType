import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    userLogInProgress,
    userLogInFail,
    userLogInSuccess,
    restLogInSuccess,
    restLogInFail,
    restLogInProgress,
} from '../../redux/actions/actions'
import Axios from 'axios'
import './auth.scss'

export const LoginPage = (props) => {
    const [errorMsg, setErrorMsg] = useState('')
    const [emailValue, setEmailValue] = useState('');
    //const [nameValue, setNameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [emailPlaceholder, setEmailPlaceholder] = useState('Type Email');
    const [passwordPlaceholder, setPasswordPlaceholder] = useState('Type Password');
    //const [namePlaceholder, setNamePlaceholder] = useState('Type Name');
    const [signUpURL, setSignUpURL] = useState('')
    const history = useHistory()
    const dispatch = useDispatch()
    const userLoginStatus = useSelector(state => state.userLogin);
    const restLoginStatus = useSelector(state => state.restLogin);
    const [showPassInput, setShowPassInput] = useState(false)
    Axios.defaults.withCredentials = true;

    useEffect(() => {

        console.log(props.data);
        if (props.data === 'restaurant') {
            setEmailPlaceholder('Restaurant Email');
            // setNamePlaceholder('Restaurant Name');
            setPasswordPlaceholder('Restaurant Password');
            setSignUpURL('/restaurant-signup');
        }
        else {
            setEmailPlaceholder('User Email');
            //  setNamePlaceholder('User Name');
            setPasswordPlaceholder('User Password');
            setSignUpURL('/user-signup');
        }
    }, []);

    const dispatchSuccessAction = (persona) => {
        console.log("persoan", persona);
        switch (persona) {
            case 'customer':
                return dispatch(userLogInSuccess(
                    {
                        text: 'Success',
                        user: emailValue
                    }
                ));
            case 'restaurant':
                return dispatch(restLogInSuccess(
                    {
                        text: 'Success',
                        user: emailValue
                    }
                ));
        }
    }
    const dispatchFailAction = (persona) => {
        switch (persona) {
            case 'customer':
                return dispatch(userLogInFail(
                    {
                        text: 'Fail',
                        user: emailValue
                    }
                ));
            case 'restaurant':
                return dispatch(restLogInFail({
                    text: 'Fail',
                    user: emailValue
                }));
        }
    }
    const dispatchInProgressAction = (persona) => {
        console.log("persoan", persona);
        switch (persona) {
            case 'customer':
                return dispatch(userLogInProgress(
                    {
                        text: 'In Progress',
                        user: emailValue
                    }
                ));
            case 'restaurant':
                return dispatch(restLogInProgress({
                    text: 'In Progress',
                    user: emailValue
                }));
        }
    }

    const onNextClicked = () => {
        console.log('clcik');
        Axios.post('http://localhost:3001/signin', {
            email: emailValue,
            password: passwordValue,
            persona: props.data
        })
            .then((res) => {
                console.log('success', res)
                dispatchSuccessAction(props.data)
                history.push('/dashboard')
            })
            .catch((err) => {
                dispatchFailAction(props.data);
                console.log("in catch", err);
                setErrorMsg('Wrong Username or Password');
                throw err
            })
    }
    const getPassword = () => {
        setShowPassInput(true);
        if (props.data === 'customer') {
            if (userLoginStatus.isLoggedIn &&
                userLoginStatus.text.user === emailValue) {

                history.push('/dashboard')
            }
            else {

                console.log("prognsbnsj", userLoginStatus);
                //  dispatch(userLogInProgress('In progress'));
            }
        }
        else {
            if (restLoginStatus.isLoggedIn &&
                restLoginStatus.text.user === emailValue) {
                history.push('/dashboard')
            }
            else {
                dispatch(restLogInProgress('In progress'));
            }
        }
    }


    return (
        <div className="login-container">
            <div className="login-wrapper">
                <div className="logo" />
                <h1>Welcome Back</h1>
                {errorMsg && <div className="fail">{errorMsg}</div>}
                <div className="login-form">
                    {/* <input
                        value={nameValue}
                        onChange={(e) => setNameValue(e.target.value)}
                        type="text"
                        placeholder={namePlaceholder}
                    /> */}
                    <input
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                        type="email"
                        placeholder={emailPlaceholder}
                    />
                    {showPassInput &&
                        <input
                            value={passwordValue}
                            onChange={(e) => setPasswordValue(e.target.value)}
                            type="password"
                            placeholder={passwordPlaceholder}
                        />
                    }
                    {!showPassInput &&
                        <button
                            // disabled={!emailValue || !passwordValue} 
                            onClick={getPassword}>
                            Next
                        </button>
                    }
                    {showPassInput &&
                        <button
                            // disabled={!emailValue || !passwordValue} 
                            onClick={onNextClicked}>
                            Next
                        </button>
                    }
                    <button
                        onClick={() => {
                            history.push(signUpURL)
                            dispatchInProgressAction(props.data)
                        }}
                    >
                        New to Uber? Sign Up!
                    </button>
                </div>
            </div>
        </div>
    )
}
