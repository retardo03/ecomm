import React, { Component } from 'react';
import {connect} from 'react-redux'
import {ChangePassword,errormessageclear} from './../redux/actions'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBAlert } from 'mdbreact';
import Swal from 'sweetalert2';
import {API_URL} from './../supports/ApiUrl'
import Axios from 'axios'
import { Redirect } from 'react-router-dom';





class SettingUser extends Component {
    state = { 
        passChangeSuccess: false
        
     }

    
  componentDidMount() {
    console.log(this.props.usernamechangepass);
  }

  handleChangePassClick = () => {
    var currentPassword = this.refs.currentPassword.value;
    var passwordbaru = this.refs.passwordbaru.value;
    var password = this.refs.konfirmasipassword.value;

    var updatePass = {
        password,
        username: this.props.usernamechangepass,
        role: this.props.role
    };
    console.log(updatePass);
    if (currentPassword === "" || passwordbaru === "" || password === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password Gaboleh Kosong!"
      });
    } else if (currentPassword === passwordbaru) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password Baru tidak boleh sama dgn password lama"
      });
    } else if (currentPassword !== this.props.passuser) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password yang anda masukkan salah"
      });
    } else if (passwordbaru !== password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password baru sama konfirmasi musti sama"
      });
    } else {
      Axios.put(`${API_URL}/users/${this.props.userid}`, updatePass)
        .then(res => {
          // console.log(res.data);
          Swal.fire({
            title: "Anda Yakin?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Ora Sido",
            confirmButtonText: "Sangat Yakin"
          }).then(result => {
            if (result.value) {
              this.props.GantiPassword(res.data);
              this.setState({ passChangeSuccess: true });
              Swal.fire({
                title: "Mantap.. Password telah terganti.",
                showConfirmButton: false,
                timer: 3000
              });
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };



    render() { 

        if (this.state.passChangeSuccess || this.props.userlog === false) {
            return <Redirect to="/" />;
          }
        return ( 
          <div className="register-container">
          <form onSubmit={this.handleChangePassClick} >
          <div className="auth-card">
          <p className="register-title">Change Password</p>
          <p className="register-title" >{this.props.usernamechangepass} </p>
          <input
            className="input"
            placeholder="password saat ini"
            type="password"
            ref="currentPassword"
          />
          <input
            className="input"
            placeholder="password baru"
            type="password"
            ref="passwordbaru"
          />
          <input
            className="input"
            placeholder="konfirmasi password baru"
            type="password"
            ref="konfirmasipassword"
          />
          <button
            className="register"
            onClick={this.handleChangePassClick}
            title="Register"
            >
                submit </button>
        </div>
            </form>
       
      </div>
         );
    }
}


const reduxState = state => {
    return {
      usernamechangepass: state.Auth.username,
      userlog: state.Auth.login,
      userid: state.Auth.id,
      passuser: state.Auth.password,
      role: state.Auth.role
    };
  };
  
  export default connect(reduxState, {ChangePassword })(SettingUser);
 