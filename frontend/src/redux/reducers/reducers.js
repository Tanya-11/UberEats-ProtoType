import * as ACTIONS from '../actions/actions'

const signUpStatus = {
    text: 'In Progress',
    isSignedUp: false,
}
export const signup = (state = [], action) => {
    console.log('reducers' + JSON.stringify(action))
    const { type, payload } = action
    switch (type) {
        case ACTIONS.USER_SIGNEDUP_SUCCESS: {
            const { text } = payload
            const status = {
                text: payload.text,
                isSignedUp: true,
            }
            return state.concat(status)
        }
        case ACTIONS.USER_SIGNEDUP_INPROGRESS:
        case ACTIONS.USER_SIGNEDUP_FAIL: {
            const { text } = payload
            const status = {
                text: text,
                isSignedUp: false,
            }
            return state.concat(status)
        }
        default:
            return state
    }
}

// add for login later
const logInStatus = {
    text: 'In Progress',
    isLoggedIn: false,
}
export const login = (state = [logInStatus], action) => {
    const { type, payload } = action
    console.log(action)
    switch (type) {
        case ACTIONS.USER_LOGGEDIN_SUCCESS: {
            const { text } = payload
            const status = {
                text: text,
                isLoggedIn: true,
            }
            return state.concat(status)
        }
        case ACTIONS.USER_LOGGEDIN_INPROGRESS:
        case ACTIONS.USER_LOGGEDIN_FAIL: {
            const { text } = payload
            const status = {
                text: text,
                isLoggedIn: false,
            }
            return state.concat(status)
        }
        default:
            return state
    }
}
