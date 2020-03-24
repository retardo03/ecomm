import React, { Component } from "react";
import Axios from 'axios'
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem,MDBIcon,
} from "mdbreact";
import {connect} from 'react-redux'
import {FaUserCircle} from 'react-icons/fa'
import {FiShoppingCart} from 'react-icons/fi'
import {BukanHome,IniHome, countCart} from './../redux/actions'
import SearchField from 'react-search-field';
import {API_URL} from './../supports/ApiUrl'
import { Redirect,Link } from "react-router-dom";
import { Button } from "reactstrap";

class NavbarPage extends Component {
    state = {
        isOpen: false,
        angka : 0,
        keyword:'',
        jumlahcart:''
    };


    // onsearchchange=(e)=>{
    //     this.setState({keyword:e.target.value})
    //     console.log(this.state.keyword)
    // }
    // onsearchclick=()=>{
    //    this.refs.keyword.value=''
    // }

    onChangeSearch=(e)=>{
        this.setState({keyword:e.target.value})
        
      }
    
      BtnSubmitSearch=()=>{
        this.refs.keyword.value=""
        }  
    

    // componentDidMount(){
    //     this.countCart()}
    

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }
    onLogoutButtonClick=()=>{
        localStorage.clear('iduser')
    }

    countCart=()=>{
        Axios.get(`${API_URL}/transactions?_embed=transactiondetails&userId=${this.props.User.id}&status=oncart`)
        .then((res)=>{
            // console.log(res)
            // console.log(res.data[0].transactiondetails)
            var newarrforprod=[]
            res.data[0].transactiondetails.forEach(element => {
               newarrforprod.push(Axios.get(`${API_URL}/products/${element.productId}`)) 
            });
            // console.log(newarrforprod)
            Axios.all(newarrforprod)
            .then((res2)=>{
                 //console.log(res2)
                res2.forEach((val,index)=>{
                    res.data[0].transactiondetails[index].dataprod=val.data.qty
                })
                //console.log(res.data[0].transactiondetails)
                var total = 0;
                res.data[0].transactiondetails.forEach(element => {
                    total+=element.qty;
                });
                console.log(total);
                return this.setState({angka:total});
            })
        }).catch((err)=>{
            console.log(err)
        })
    }
 

    render() {
        console.log(this.props.Header) 
        return (
            <MDBNavbar color="black" transparent={this.props.Header} scrolling className='bordernav' dark fixed='top' expand="md">
                <MDBNavbarBrand href='/'>
                    <strong className={'white-text'}>MiniMales</strong>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.toggleCollapse} />
                <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                <MDBNavbarNav tag='div' right className='mr-5' >
                    <MDBNavItem >
                        {
                            this.props.User.role==='admin'?
                            <MDBNavLink to='/manageadmin'>
                                manage Admin
                            </MDBNavLink>
                            :
                            null
                        }
                             {this.countCart()}
                    </MDBNavItem>
                <MDBNavItem>
                        <MDBNavLink to='/search'> search</MDBNavLink>
                </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink to='/cart'>
                            <FiShoppingCart style={{fontSize:20}}/>Cart {this.props.User.cart}
                        </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        {
                            this.props.User.islogin?
                            null
                            :
                            <MDBNavLink to='/login'>
                                Login
                            </MDBNavLink>

                        }
                    </MDBNavItem>

                    <MDBNavItem>
                        {
                            this.props.User.role==='admin'||
                            this.props.User.role==='user'?
                            null
                            :(

                            <MDBNavLink to='/register'>
                                Register
                            </MDBNavLink>
                            )

                        }
                    </MDBNavItem>
            
                    <MDBNavItem>
                        {
                            this.props.User.username?
                            <MDBDropdown >
                                <MDBDropdownToggle nav className='warnanav' >
                                    <FaUserCircle/> hallo, {this.props.User.username}
                                </MDBDropdownToggle>
                                <MDBDropdownMenu className='dropdown1' >
                                    <MDBDropdownItem href="/" onClick={this.onLogoutButtonClick}>LogOut</MDBDropdownItem>
                                    <MDBDropdownItem href="/gantipassword">Ganti Password</MDBDropdownItem>
                                    <MDBDropdownItem href="#!"></MDBDropdownItem>
                                    {/* <MDBDropdownItem href="#!">Something else here</MDBDropdownItem> */}
                                </MDBDropdownMenu>
                            </MDBDropdown>
                            :
                            null
                        }
                    </MDBNavItem>
                </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
            );
    }
}

const MapstatetoProps=(state)=>{
    return{
        User:state.Auth,
        Header:state.Header.ishome
    }
}
 
export default connect(MapstatetoProps,{IniHome,BukanHome,countCart})(NavbarPage);