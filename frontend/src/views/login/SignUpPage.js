import { useState } from "react";
import { Redirect } from "react-router";
import { connect, useDispatch} from 'react-redux';
import {userSignedUpSuccess, userSignedUpFail} from '../../redux/actions/actions';
import { signup } from "../../redux/reducers/reducers";

const mapDispatchToProps = dispatch=> ({
    onSignUp: text=> dispatch(userSignedUpSuccess(text)),
});

const SignUpPage = () =>{

    const dispatch = useDispatch();

    // console.log("onSignUp="+JSON.stringify(onSignUp));
    // console.log("props="+JSON.stringify(props));


    // if(!props.auth){
    //     return (<Redirect to="/login"></Redirect>);
    // }

    // const [errorMsg, setErrorMsg] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPasswordValue, setconfirmPasswordValue] = useState('');

    
    const onSignUpClicked = (text) =>{
        dispatch(userSignedUpSuccess('Success'))
    //    mapDispatchToProps.onSignUp(text);
    }
    return (
        // <h1>Hi</h1>
        <div className="">
            <h1>Welcome Back</h1>
            {/* {errorMsg && <div className="fail">{errorMsg}</div>} */}
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
            <input 
            value={confirmPasswordValue}
            onChange={e=>setconfirmPasswordValue(e.target.value)}
            type="password" 
            placeholder="Password"/>
            <button 
            // disabled={!emailValue || !passwordValue || !confirmPasswordValue }
            onClick={onSignUpClicked}>
                Sign Up</button>
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
