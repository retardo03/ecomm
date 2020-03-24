import {
    USER_LOGIN_FAILED,
    USER_LOGIN_START,
    USER_LOGIN_SUCCESS,
    USER_REGIST_FAILED,
    USER_REGIST_START,
    USER_REGIST_SUCCESS,
    USER_CHANGE_PASS_FAILED,
    USER_CHANGE_PASS_SUCCESS,
    USER_CHANGE_PASS_START
} from './../actions/type'



const INITIAL_STATE={
    username:'',
    id:0,
    loading:false,
    islogin:false,
    isregist:false,
    errormes:'',
    errormsg:'',
    sucessmes:'',
    cart:0,
    role:'',
    message:''
}


export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case USER_LOGIN_START:
            return {...state,loading:true}
        case USER_LOGIN_SUCCESS:
            return {...state,loading:false,...action.payload,islogin:true}
        case USER_LOGIN_FAILED:
            return{...state,loading:false,errormes:action.payload}
        case USER_REGIST_START:
            return{...state,loading:true}
        case USER_REGIST_SUCCESS:
            return{...state,loading:false,sucessmes:action.payload,isregist:true}
        case USER_REGIST_FAILED:
            return{...state,loading:false,errormsg:action.payload}
        case USER_CHANGE_PASS_SUCCESS:
            return{...state,loading:false,password:action.payload.password,changepasssuccess:action.payload.message}
        case USER_CHANGE_PASS_START:
            return{...state,loading:true}
            case USER_CHANGE_PASS_FAILED:
                return{...state,loading:false,errormes:action.payload}
        case "COUNT_CART":
            return{...state,loading:false,cart:+action.payload}
        case 'ErrorClear':
            return INITIAL_STATE
        default:
            return state
    }
}



