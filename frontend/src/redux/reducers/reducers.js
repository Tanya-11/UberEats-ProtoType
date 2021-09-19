import {USER_LOGGEDIN, USER_SIGNEDUP_SUCCESS, USER_SIGNEDUP_FAIL} from '../actions/actions';


export const signup =(state = [], action)=>{
    console.log("reducers"+JSON.stringify(action));
    const { type, payload} = action;
    switch(type){
        case USER_SIGNEDUP_SUCCESS:{
            const {text } = payload;
            const status={
                text,
                isCompleted:true,
            };
            return state.concat(status);
        }
        case USER_SIGNEDUP_FAIL:{
            const {text } = payload;
            return state.status.isCompleted; //check
        }
        default:
            return state;
    }
}

// add for login later
export const login =(state, action)=>{
    return state; 
 }