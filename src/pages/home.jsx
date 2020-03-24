import React, { Component } from 'react';
import {connect} from 'react-redux'
import { MDBCarousel,  MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask} from "mdbreact";
import {Redirect} from 'react-router-dom'
import {
    Card, CardBody,
    CardTitle, CardSubtitle
  } from 'reactstrap';
import Numeral from 'numeral'
import Axios from 'axios'
import {API_URL} from './../supports/ApiUrl'
import {FaArrowAltCircleRight} from 'react-icons/fa'
import {BukanHome,IniHome} from './../redux/actions'
import {FaCartPlus} from 'react-icons/fa'
import {Link} from 'react-router-dom'

class Home extends Component {
    state = {
        photos:[
            './image/Street-Fighter-V-Champion-01.jpg',
            './image/670effa4256a6d0c53335de9da574d17165b92e8.jpg',
            './image/maxresdefault.jpg'
        ],
        products:[]
    }
    

    componentDidMount(){
        this.props.IniHome()
        Axios.get(`${API_URL}/products?_expand=kategori&_limit=5`)
        .then((res)=>{
            this.setState({products:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }


    componentWillUnmount=()=>{
        console.log('jalan unmount')
        this.props.bukan()
    }

    renderphoto=()=>{
        return this.state.photos.map((val,index)=>{
            return (
                <MDBCarouselItem key={index} itemId={index+1}>
                    <MDBView>
                        <div style={{width:'100%',height:650,display:'flex'}}>
                            <img
                                // className=""
                                src={val}
                                alt="First slide"
                                // height='100%'
                                width='100%'
                            />
                        </div>
                        <MDBMask overlay="black-slight" />
                    </MDBView>
                </MDBCarouselItem>
            )
        })
    }

    renderProducts=()=>{
        return this.state.products.map((val,index)=>{
            return (
                <div key={index} className='p-3' style={{width:'20%'}}>
                    <Card>
                        <div style={{height:300,width:'100%'}}>
                            <img src={val.image} height='100%' width='100%' alt=""/>
                            <div className='kotakhitam'>
                                <Link to={`/productdetail/${val.id}`} className='tombolebuynow'>
                                    <button className='tomboldalam'><FaCartPlus/></button>
                                </Link>
                            </div>  
                        </div>
                        <CardBody style={{height:150}}>
                            <CardTitle style={{fontWeight:'bold'}} className='mb-2'>{val.name}</CardTitle>
                            <CardSubtitle className='mb-2'>{'Rp.'+Numeral(val.harga).format(0.0)}</CardSubtitle>
                            <button disabled className='rounded-pill px-2 btn-primary' >{val.kategori.name}</button>
                        </CardBody>
                    </Card>
                </div>
            )
        })
    }

    render() {
      
        return (
            <div>
                <MDBCarousel
                    activeItem={1}
                    length={this.state.photos.length}
                    interval={1800}
                    showIndicators={false}
                    showControls={false}
                >
                    <MDBCarouselInner>
                        {this.renderphoto()}
                    </MDBCarouselInner>
                </MDBCarousel>
                <div className='px-5 pt-3'>
                    <div>Best seller <FaArrowAltCircleRight/></div>
                    <div className="d-flex ">
                        {this.renderProducts()}
                    </div>
                </div>
            </div>
        )
    }
}

const MapstatetoProps=({Auth})=>{
    return{
        islogin:Auth.islogin
    }
}

export default connect(MapstatetoProps,{bukan:BukanHome,IniHome}) (Home);