import React, { useState } from 'react';
import {connect} from 'react-redux'
import {Registuser,errormessageclear} from './../redux/actions'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBAlert } from 'mdbreact';

import { Redirect } from 'react-router-dom';

const Register = props =>{
    const [data,setdata]=useState({
        username:"",
        password:"",
        passwordconf:""
    })
    console.log(props.username)

    const dataOnChange = e =>{
        console.log(e.target)
        setdata({
            ...data,[e.target.name]:e.target.value
        })
    }
    const onFormSubmit = e =>{
        e.preventDefault()
        console.log('sukses')
        props.Registuser(data)
    }
    if(props.isregist){
        return <Redirect to="/" />
    }
    return (
        <div>
            <div className='d-flex justify-content-center align-items-center' style={{height:'90vh'}}>
            <MDBContainer>
  <MDBRow>
    <MDBCol md="6">
      <form>
        <p className="h5 text-center mb-4">Registration Form</p>
        <div className="grey-text">
          <MDBInput name="username" label="Your name" icon="user" group type="text" validate error="wrong"
            success="right" onChange={dataOnChange} value={data.username}/>
          <MDBInput name="password" label="Your password" icon="lock" group type="password" validate error="wrong"
            success="right" onChange={dataOnChange} value={data.password}/>
          <MDBInput name="passwordconf" label="Your password confirmation" icon="lock" group type="password" validate  onChange={dataOnChange} value={data.passwordz} />
        </div>
        <div className="text-center">
          <MDBBtn color="primary" onClick={onFormSubmit}>Register</MDBBtn>
        </div>
                    {
                        props.errormsg?
                        <MDBAlert color="danger" >
                            {props.errormsg} <span className='float-right hovererr font-weight-bold' onClick={()=>props.errormessageclear()}>X</span>
                        </MDBAlert>
                        
                        :
                        null
                    }
      </form>
    </MDBCol>
  </MDBRow>
</MDBContainer>
</div>
        </div> 
    )
}
const MapstatetoProps=(state)=>{
    return state.Auth
}


export default connect(MapstatetoProps,{Registuser,errormessageclear}) (Register);
