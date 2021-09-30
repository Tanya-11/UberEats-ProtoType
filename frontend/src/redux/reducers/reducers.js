import * as ACTIONS from '../actions/actions'

const signUpStatus = {
    text: 'In Progress',
    isSignedUp: false,
}

export const signupReducer = (state = [], action) => {
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

export const restaurantSignup = (state = [], action) => {
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
export const userLoginReducer = (state = {}, action) => {
    const { type, payload } = action
    console.log(action)
    switch (type) {
        case ACTIONS.USER_LOGGEDIN_SUCCESS: {
            const { text } = payload
            const status = {
                text: text,
                isLoggedIn: true,
            }
            return state = status;
        }
        case ACTIONS.USER_LOGGEDIN_INPROGRESS:
        case ACTIONS.USER_LOGGEDIN_FAIL: {
            const { text } = payload
            const status = {
                text: text,
                isLoggedIn: false,
            }
            return state = status;
        }
        default:
            return state
    }
}
export const restLoginReducer = (state = {}, action) => {
    const { type, payload } = action
    console.log(action)
    switch (type) {
        case ACTIONS.RESTAURANT_LOGGEDIN_SUCCESS: {
            const { text } = payload
            const status = {
                text: text,
                isLoggedIn: true,
            }
            return state = status;
        }
        case ACTIONS.RESTAURANT_LOGGEDIN_INPROGRESS:
        case ACTIONS.RESTAURANT_LOGGEDIN_FAIL: {
            const { text } = payload
            const status = {
                text: text,
                isLoggedIn: false,
            }
            return state = status;
        }
        default:
            return state
    }
}
