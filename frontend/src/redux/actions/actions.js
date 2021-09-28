export const USER_SIGNEDUP_SUCCESS = 'USER_SIGNEDUP_SUCCESS'
export const USER_SIGNEDUP_FAIL = 'USER_SIGNEDUP_FAIL'
export const USER_SIGNEDUP_INPROGRESS = 'USER_SIGNEDUP__INPROGRESS'

export const USER_LOGGEDIN_SUCCESS = 'USER_LOGGEDIN_SUCCESS'
export const USER_LOGGEDIN_FAIL = 'USER_LOGGEDIN_FAIL'
export const USER_LOGGEDIN_INPROGRESS = 'USER_LOGGEDIN__INPROGRESS'

export const userSignedUpSuccess = (text) => (
    console.log('In userSignUp' + text),
    {
        type: USER_SIGNEDUP_SUCCESS,
        payload: { text },
    }
)

export const userSignedUpFail = (text) => ({
    type: USER_SIGNEDUP_FAIL,
    payload: { text },
})
export const userSignedUpInProgress = (text) => ({
    type: USER_SIGNEDUP_INPROGRESS,
    payload: { text },
})

export const userLogInSuccess = (text) => ({
    type: USER_LOGGEDIN_SUCCESS,
    payload: { text },
})

export const userLogInFail = (text) => ({
    type: USER_LOGGEDIN_FAIL,
    payload: { text },
})
export const userLogInProgress = (text) => ({
    type: USER_LOGGEDIN_INPROGRESS,
    payload: { text },
})
