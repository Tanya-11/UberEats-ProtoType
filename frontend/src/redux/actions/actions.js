export const USER_SIGNEDUP_SUCCESS ='USER_SIGNEDUP_SUCCESS';
export const userSignedUpSuccess= text=>(
    console.log("In userSignUp"+text),
    {
    type: USER_SIGNEDUP_SUCCESS,
    payload:{text},

});

export const USER_SIGNEDUP_FAIL ='USER_SIGNEDUP_FAIL';
export const userSignedUpFail= text=>({
    type: USER_SIGNEDUP_FAIL,
    payload:{text},

});

export const USER_LOGGEDIN ='USER_LOGGEDIN';
export const userLoggedIn= text=>({
    type: USER_LOGGEDIN,
    payload:{text},

});
