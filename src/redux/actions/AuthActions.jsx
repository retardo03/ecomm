import Axios from 'axios'
import { USER_LOGIN_START, USER_LOGIN_FAILED, USER_LOGIN_SUCCESS , USER_REGIST_START, USER_REGIST_FAILED, USER_REGIST_SUCCESS,USER_CHANGE_PASS_SUCCESS,USER_CHANGE_PASS_START,USER_CHANGE_PASS_FAILED} from './type'
import { API_URL } from '../../supports/ApiUrl'


export const LoginUser=({username,password})=>{
    return (dispatch)=>{
        dispatch({type:USER_LOGIN_START})
        if(username===''||password===''){//kalo ada input yang kosong
            dispatch({type:USER_LOGIN_FAILED,payload:'username atau password tidak terisi'})
        }else{
            Axios.get(`${API_URL}/users`,{
                params:{
                    username:username,
                    password:password
                }
            })
            .then((res)=>{
                if(res.data.length){//user ada
                    localStorage.setItem('iduser',res.data[0].id)
                    dispatch({type:USER_LOGIN_SUCCESS,payload:res.data[0]})
                }else{
                    dispatch({type: USER_LOGIN_FAILED,payload:'username atau password tidak terdaftar'})
                }
            }).catch((err)=>{
                console.log(err)
                dispatch({type:USER_LOGIN_FAILED,payload:err.message})
            })
        }
    }
}

export const Registuser=({username,password,passwordconf})=>{
    return (dispatch)=>{
        dispatch({type:USER_REGIST_START})
        if(username===''||password==='' || passwordconf===''){
            dispatch({type:USER_REGIST_FAILED,payload:'username atau password tidak terisi'})
        }else{
            Axios.get(`${API_URL}/users?username=${username}`)
            .then((res)=>{
                if(res.data.length){
                    dispatch({type:USER_REGIST_FAILED,payload:'Username sudah dipakai'})
                }else{
                    if(password === passwordconf){   
                        Axios.post(`${API_URL}/users`,{username,password,role:'user'})
                        .then((res1)=>{
                            dispatch({type:USER_REGIST_SUCCESS,payload:'registrasi berhasil,silahkan login'})
                        }).catch((err1)=>{
                            console.log(err1)

                        })
                    }else{
                        dispatch({type:USER_REGIST_FAILED,payload:'password harus sesuai'})
                    }       
                }
            }).catch((err)=>{
                console.log(err)
                dispatch({type:USER_REGIST_FAILED,payload:err.message})
            })
        }
    }
}

export const countCart=(id)=>{
    return (dispatch)=>{
        Axios.get(`${API_URL}/transactions?_embed=transactiondetails&userId=${id}&status=oncart`)
        .then((res)=>{   
            var newarrforprod=[]
            res.data[0].transactiondetails.forEach(element =>{
                newarrforprod.push(Axios.get(`${API_URL}/products/${element.productId}`))
            })
            console.log(newarrforprod)
            Axios.all(newarrforprod)
            .then((res2)=>{
                console.log(res2)
                res2.forEach((val, index)=>{
                    res.data[0].transactiondetails[index].dataprod=val.data 
                })
                let total=0
                res.data[0].transactiondetails.forEach((val)=>{
                    total+=val.qty
                })
                dispatch({type:"COUNT_CART",payload: total})
            })
        }).catch((err)=>{
            console.log(err)
        })
    }
  }
export const ChangePassword=(data)=>{
    return (dispatch)=>{
        dispatch({type:USER_CHANGE_PASS_START})
    if(data.currentpasswordinput ===' '||data.newpassword === '' || data.newpasswordconf===''){
        dispatch({type:USER_CHANGE_PASS_FAILED,payload:'ada data yang kurang'})
    }else if(data.newpassword=data.currentpassword){
        dispatch({type:USER_CHANGE_PASS_FAILED,payload:'password anda sama'})
    }else if(data.newpassword !=data.newpasswordconf){
        dispatch({type:USER_CHANGE_PASS_FAILED,payload:'password baru atau lama tidak sesuai'})
    }else{
        let role= localStorage.getItem('role')
        Axios.put(`${API_URL}/users/${data.id}`,{password:data.newpassword,role:'user'})
        .then((res)=>{
            var usernewdata={
                message:'berhasil ganti',
                password:data.newpassword,
                username:data.username,
                role:role
            }
            dispatch({type:USER_CHANGE_PASS_SUCCESS,payload:usernewdata})
        }).catch((err)=>{
            console.log(err)
        })
    }
    }
}
// export const countCart=()=>{
//     Axios.get(`${API_URL}/transactions?_embed=transactiondetails&userId=${this.props.User.id}&status=oncart`)
//     .then((res)=>{
//         // console.log(res)
//         // console.log(res.data[0].transactiondetails)
//         var newarrforprod=[]
//         res.data[0].transactiondetails.forEach(element => {
//            newarrforprod.push(Axios.get(`${API_URL}/products/${element.productId}`)) 
//         });
//         // console.log(newarrforprod)
//         Axios.all(newarrforprod)
//         .then((res2)=>{
//              //console.log(res2)
//             res2.forEach((val,index)=>{
//                 res.data[0].transactiondetails[index].dataprod=val.data.qty
//             })
//             //console.log(res.data[0].transactiondetails)
//             var total = 0;
//             res.data[0].transactiondetails.forEach(element => {
//                 total+=element.qty;
//             });
//             console.log(total);
           
//             return total;
//         })
//     }).catch((err)=>{
//         console.log(err)
//     })
// }

export const errormessageclear=()=>{
    return{
        type:'ErrorClear'
    }
}
export const KeepLogin=(data)=>{
    return{
        type:USER_LOGIN_SUCCESS,
        payload:data
    }
}