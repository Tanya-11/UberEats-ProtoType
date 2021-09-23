import { useState } from "react";
import { Redirect } from "react-router";
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    userSignedUpSuccess,
    userSignedUpFail,
    userSignedUpInProgress
} from '../../redux/actions/actions';
import { signup } from "../../redux/reducers/reducers";
import './auth.scss';
import Axios from 'axios';
const SignUpPage = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    // console.log("onSignUp="+JSON.stringify(onSignUp));
    // console.log("props="+JSON.stringify(props));


    // if(!props.auth){
    //     return (<Redirect to="/login"></Redirect>);
    // }

    const [errorMsg, setErrorMsg] = useState('');
    const [nameValue, setnameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPasswordValue, setconfirmPasswordValue] = useState('');


    const onSignUpClicked = () => {
        Axios.post('http://localhost:3001/signup', {
            name: nameValue,
            email: emailValue,
            password: passwordValue
        })
            .then((res) => {
                console.log(res);
                dispatch(userSignedUpSuccess('Sign Up Success'))
                history.push('/login');
            })
            .catch((err) => {
                console.log(err);
                setErrorMsg('Error in Signing in');
                dispatch(userSignedUpFail('Sign Up Fail'))
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
                        onChange={e => setnameValue(e.target.value)}
                        type="text"
                        placeholder="Name" />
                    <input
                        value={emailValue}
                        onChange={e => setEmailValue(e.target.value)}
                        type="email"
                        placeholder="Email" />
                    <input
                        value={passwordValue}
                        onChange={e => setPasswordValue(e.target.value)}
                        type="password"
                        placeholder="Password" />
                    <input
                        value={confirmPasswordValue}
                        onChange={e => setconfirmPasswordValue(e.target.value)}
                        type="password"
                        placeholder="Confirm Password" />
                    <button
                        // disabled={!emailValue || !passwordValue || !confirmPasswordValue }
                        onClick={onSignUpClicked}>
                        Sign Up</button>
                </div>
            </div>
        </div>
    );
}

// const mapStateToProps = state => (
//     console.log("mapStateToProps-"+state),
//     {
//     props: state,
// });

export default SignUpPage;
// export default connect(null, mapDispatchToProps)(SignUpPage);
