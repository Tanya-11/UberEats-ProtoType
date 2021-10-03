import * as ACTIONS from '../actions/actions'

const signUpStatus = {
    text: 'In Progress',
    isSignedUp: false,
}

export const userSignupReducer = (state = {}, action) => {
    console.log('reducers' + JSON.stringify(action))
    const { type, payload } = action
    switch (type) {
        case ACTIONS.USER_SIGNEDUP_SUCCESS: {
            const { text } = payload
            const status = {
                text: text,
                isSignedUp: true,
            }
            return status;
        }
        case ACTIONS.USER_SIGNEDUP_INPROGRESS:
        case ACTIONS.USER_SIGNEDUP_FAIL: {
            const { text } = payload
            const status = {
                text: text,
                isSignedUp: false,
            }
            return status
        }
        default:
            return state
    }
}

export const restSignupReducer = (state = {}, action) => {
    console.log('reducers' + JSON.stringify(action))
    const { type, payload } = action
    switch (type) {
        case ACTIONS.USER_SIGNEDUP_SUCCESS: {
            const { text, user } = payload
            const status = {
                text: payload.text,
                user: user,
                isSignedUp: true,
            }
            return status
        }
        case ACTIONS.USER_SIGNEDUP_INPROGRESS:
        case ACTIONS.USER_SIGNEDUP_FAIL: {
            const { text, user } = payload
            const status = {
                text: text,
                user: user,
                isSignedUp: false,
            }
            return status
        }
        default:
            return state
    }
}

const loginStatus = {
    text: 'In Progress',
    isLoggedIn: false,
}
// add for login late
export const userLoginReducer = (state = {}, action) => {
    const { type, payload } = action
    console.log(action)
    switch (type) {
        case ACTIONS.USER_LOGGEDIN_SUCCESS: {
            const { text, user } = payload
            const status = {
                text: text,
                user: user,
                isLoggedIn: true,
            }
            return status
        }
        case ACTIONS.USER_LOGGEDIN_INPROGRESS:
        case ACTIONS.USER_LOGGEDIN_FAIL: {
            const { text, user } = payload
            const status = {
                text: text,
                user: user,
                isLoggedIn: false,
            }
            return status
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
            const { text, user } = payload
            const status = {
                text: text,
                user: user,
                isLoggedIn: true,
            }

            return status
        }
        case ACTIONS.RESTAURANT_LOGGEDIN_INPROGRESS:
        case ACTIONS.RESTAURANT_LOGGEDIN_FAIL: {
            const { text, user } = payload
            const status = {
                text: text,
                user: user,
                isLoggedIn: false,
            }
            return status
        }
        default:
            return state
    }
}

let status = {
    dishId: 0,
    orderCount: 0
}

export const OrderCountReducer = (state = [], action) => {
    const { type, payload } = action;
    console.log("type" + JSON.stringify(payload));
    switch (type) {
        case ACTIONS.ORDER_INCREMENT:
        case ACTIONS.ORDER_DECREMENT: {
            let data = {
                dishId: payload.payload,
                orderCount: status.orderCount + 1,
            };
            console.log(data);
            let found = false;
            state.map(el => {
                if (el.dishId === data.dishId) {
                    el.orderCount++;
                    found = true;
                }
                else !found
            })
            if (!found) {
                state.push({
                    dishId: data.dishId,
                    orderCount: data.orderCount,
                })
            }
            //  state.push(data)
            return state;
        }
        default:
            return state;
    }
}


// export const OrderCountReducer = (state = [], action) => {
//     const { type, payload } = action;
//     console.log("action", action);
//     switch (type) {
//         case ACTIONS.ORDER_INCREMENT: {
//             const { orderCount, dishId } = payload.dishItem
//             console.log(payload.dishItem);
//             const status = {
//                 // text: text,
//                 // orderCount: orderCount,
//                 // dishId: dishId,
//             }
//             //  state.push(1);
//             console.log('state', state);
//             //  state = count;
//             return state.concat(status);
//             //return 0;

//         }
//         case ACTIONS.ORDER_DECREMENT: {
//             const { orderCount, dishId } = payload.dishItem
//             //  state = count;
//             const status = {
//                 // text: text,
//                 orderCount: orderCount,
//                 dishId: dishId,
//             }

//             //  state = count;
//             return state.concat(status);;
//         }
//         default:
//             return state;
//     }

// }