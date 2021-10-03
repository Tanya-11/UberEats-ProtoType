import { useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import { connect, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
    userSignedUpSuccess,
    userSignedUpFail,
    userSignedUpInProgress,
} from '../../redux/actions/actions'
import { signup } from '../../redux/reducers/reducers'
import './auth.scss'
import Axios from 'axios'
const SignUpPage = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    // console.log("onSignUp="+JSON.stringify(onSignUp));
    // console.log("props="+JSON.stringify(props));

    // if(!props.auth){
    //     return (<Redirect to="/login"></Redirect>);
    // }
    const [errorMsg, setErrorMsg] = useState('')
    const [emailValue, setEmailValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [cityValue, setcityValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [emailPlaceholder, setEmailPlaceholder] = useState('TType Email');
    const [passwordPlaceholder, setPasswordPlaceholder] = useState('Type Password');
    const [namePlaceholder, setNamePlaceholder] = useState('Type Name');
    const [cityPlaceholder, setCityPlaceholder] = useState('Type City');
    const [signUpURL, setSignUpURL] = useState('')
    Axios.defaults.withCredentials = true;

    useEffect(() => {
        console.log(props.data);
        if (props.data === 'restaurant') {
            setEmailPlaceholder('Restaurant Email');
            setNamePlaceholder('Restaurant Name');
            setPasswordPlaceholder('Restaurant Password');
            setCityPlaceholder('Restaurant Location');
            setSignUpURL('/restaurant-login');
        }
        else {
            setEmailPlaceholder('User Email');
            setNamePlaceholder('User Name');
            setPasswordPlaceholder('User Password');
            setSignUpURL('/user-login');
        }
    }, [])
    const onSignUpClicked = () => {
        Axios.post('http://localhost:3001/signup', {
            name: nameValue,
            email: emailValue,
            password: passwordValue,
            city: cityValue,
            persona: props.data
        })
            .then((res) => {
                console.log(emailValue)
                dispatch(userSignedUpSuccess(['Sign Up Success', emailValue]));
                console.log(signUpURL);
                history.push(signUpURL)
            })
            .catch((err) => {
                console.log(err)
                setErrorMsg('Error in Signing in')
                dispatch(userSignedUpFail(['Sign Up Fail', emailValue]))
            })
        //    mapDispatchToProps.onSignUp(text);
    }
    return (
        <div className="login-container">
            <div className="login-wrapper">
                <div className="logo" />
                <h1>Let's get started</h1>
                {errorMsg && <div className="fail">{errorMsg}</div>}
                <div className="login-form">
                    <input
                        value={nameValue}
                        onChange={(e) => setNameValue(e.target.value)}
                        type="text"
                        placeholder={namePlaceholder}
                    />
                    <input
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                        type="email"
                        placeholder={emailPlaceholder}
                    />
                    <input
                        value={passwordValue}
                        onChange={(e) => setPasswordValue(e.target.value)}
                        type="password"
                        placeholder={passwordPlaceholder}
                    />
                    {
                        props.data === 'restaurant' && <input
                            value={cityValue}
                            onChange={(e) => setcityValue(e.target.value)}
                            type="text"
                            placeholder={cityPlaceholder}
                        />
                    }
                    <button
                        // disabled={!emailValue || !passwordValue || !confirmPasswordValue }
                        onClick={onSignUpClicked}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    )
}

// const mapStateToProps = state => (
//     console.log("mapStateToProps-"+state),
//     {
//     props: state,
// });

export default SignUpPage
// export default connect(null, mapDispatchToProps)(SignUpPage);
