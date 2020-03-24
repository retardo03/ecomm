import React, {useState,useEffect,Component } from 'react';
import axios from 'axios'
import {API_URL} from './../supports/ApiUrl'
import {Link} from 'react-router-dom'
import {Button} from 'reactstrap'
import {changetoRupiah} from './../supports/changetorp'
import Axios from 'axios';
import { render } from '@testing-library/react';
import {MDBBtn,MDBCard,MDBCardBody,MDBCardText,MDBCardTitle,MDBCol,MDBRow} from 'mdbreact'
import {connect} from 'react-redux'
import {Table} from 'reactstrap'
import {cart} from './Cart'
import {
    Card, CardBody,
    CardTitle, CardSubtitle
  } from 'reactstrap';
  import {FaCartPlus} from 'react-icons/fa'
  import Numeral from 'numeral'

class Search extends Component{

    state={
        products:[],
        searchProducts:[],
        sortNama:0,
        sortPrice:0

    }

    componentDidMount() {
        axios.get(
            "http://localhost:2000/products?_expand=kategori"
        ).then((res)=>{
            this.setState(
                {
                    products:res.data,
                    searchProducts:res.data

                }
            )
        }).catch(()=>{

        })
    }
    
  
    onSearchClick=()=>{
        let inputName=this.name.value
        // let inputkategori=this.kategori.value
        let inputMin=parseInt(this.min.value)
        let inputMax=parseInt(this.max.value)


        let hasilFilter=this.state.products.filter((product)=>{
            return (
                
                product.name.toLowerCase().includes(inputName.toLowerCase())
                
                
            )
        })
        let hasilFilterPrice=hasilFilter.filter((product)=>{
            
                if (!inputMax && !inputMin){
                    return hasilFilter
                } if (inputMax && inputMin) {
                    return (product.price>=inputMin && product.price<=inputMax)
                } if (inputMax && !inputMin){
                    return (product.price<=inputMax)
                } if (!inputMax && inputMin){
                    return (product.price>=inputMin)
                }
        })

        this.setState({searchProducts:hasilFilterPrice})
    }

    onResetClick=()=>{
        this.name.value=''
        this.min.value=''
        this.max.value=''
        this.setState((prevState)=>{
            return{
                searchProducts: prevState.products
            }
        })
    }

    urut=(a,b)=>{
        return a.price-b.price
    }
    urutDes=(a,b)=>{
        return b.price-a.price
    }
      
    urutHuruf=(a,b)=>{
        
        var nameA = a.name.toUpperCase(); 
        var nameB = b.name.toUpperCase(); 
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
    }   
    urutHurufDes=(a,b)=>{
    
        var nameA = a.name.toUpperCase(); 
        var nameB = b.name.toUpperCase();
        if (nameA > nameB) {
            return -1;
        }
        if (nameA < nameB) {
            return 1;
        }
    }   

    onSortName=()=>{
        if (!this.state.sortNama){
            var hasilFilter=this.state.searchProducts.sort(this.urutHuruf)
            this.setState({searchProducts:hasilFilter})
            this.setState({sortNama:1})
        } if (this.state.sortNama){
            var hasilFilter=this.state.searchProducts.sort(this.urutHurufDes)
            this.setState({searchProducts:hasilFilter})
            this.setState({sortNama:0})
        }
    }
    onSortPrice=()=>{
        if (!this.state.sortPrice){
            var hasilFilter=this.state.searchProducts.sort(this.urut)
            this.setState({searchProducts:hasilFilter})
            this.setState({sortPrice:1})
        } if (this.state.sortPrice){
            var hasilFilter=this.state.searchProducts.sort(this.urutDes)
            this.setState({searchProducts:hasilFilter})
            this.setState({sortPrice:0})
        }
    }

   
    renderList=()=>{
      
        return this.state.searchProducts.map((val,index)=>{
            return(
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
                            <button disabled className='rounded-pill px-2 btn-primary' >{val.kategori.nama}</button>
                        </CardBody>
                    </Card>
                </div>
            )
            
        })  
    }
    
    render() { 
          
            return (
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-3">
                                <div className="card mt-5 p-3 shadow-sm mr-2">
                                    <div className="card-title border-bottom border-dark">
                                        <h3 className="d-inline">Search</h3>
                                    </div>
                                    <form className="form-group mb-0 mx-2">
                                        <h5>Name :</h5>
                                        <input onChange={this.onSearchClick} 
                                        ref={(input)=>{this.name=input}} 
                                        className="form-control my-3 btn-light" placeholder="product" type="text" name="" id=""/>

                                        {/* <h5>Category :</h5>
                                        <input onChange={this.onSearchClick} 
                                        ref={(input)=>{this.kategoris=input}} 
                                        className="form-control my-3 btn-light" placeholder="category" type="text" name="" kat=""/> */}
        
                                        <h5>Price :</h5>
                                        <input onChange={this.onSearchClick} 
                                        ref={(input)=>{this.min=input}} 
                                        className="form-control btn-light" placeholder="minimum" type="text" name="" id=""/>
                                        <input onChange={this.onSearchClick} 
                                        ref={(input)=>{this.max=input}} 
                                        className="form-control my-3 btn-light" placeholder="maximum" type="text" name="" id=""/>
                                    </form>
                                    <div className="d-inline-block align-bottom text-right">
                                        <button onClick={this.onResetClick} className="btn btn-block btn-sm btn-secondary">Refresh</button>
                                    </div>
                                </div>
                                <div className="card mt-2 p-3 shadow-sm mr-2">
                                    <div className="card-title border-bottom border-dark">
                                        <h3 className="d-inline">Sort by</h3>
                                    </div>
                                    <div className="mx-2">
                                        <button onClick={this.onSortName} className="btn btn-sm btn-block btn-warning">Product Name</button>
                                        <button onClick={this.onSortPrice} className="btn btn-sm btn-block btn-warning">Product Price</button>
                                    </div>
                                </div>
                            </div>
        
                            <div className="col-9 row mt-5 p-0" style={{height:"30px"}}>
                                <div className="col-12 display-4 text-center mb-2 shadow-sm p-2 card ">Our Product List</div>
                                    {this.renderList()}
                            </div>
                        </div>
                    </div>
                </div>

            )
        } 
    }
                      

const mapStateToProps=state=>{
    return {
      username: state.Auth.username
    }
  }

export default connect(mapStateToProps)(Search)

// const SearchPage=(props)=>{
//     console.log(props)
//     console.log(props.match.params.keyword)

//     const [products, setproducts]=useState({})
//     const [loading, setloading]=useState(true)

//     useEffect(()=>{
//         var tes={
//             name:`${props.match.params.keyword}`
//         }
//         // console.log(props.User.id)
//         Axios.get(`${API_URL}/products?_expand=kategori&name_like=${props.match.params.keyword}`)
//         .then((res)=>{
//             console.log(res.data)
//             setproducts(res.data)
//         }).catch((err)=>{
//             console.log(err)
//         }).finally(()=>{
//             setloading(false)
//           })
//     },[props.match.params.keyword])



// const renderProduct=()=>{
//         return(
//             products.map((val, index)=>{
//                 return(
//                     <MDBCol key={index} style={{display:"flex", justifyContent:"center", alignItems:"center", height:"450px"}}>
//                         <MDBCard style={{ width: "350px", height:"100%" }} className="">
//                             <div className="view overlay zoom" style={{ width: "100%", height:"60%" }}>
//                                 <Link to={`/productdetail/${val.id}`} >
//                                     <img 
//                                         className="rounded img-fluid "
//                                         src={val.image} 
//                                         alt={val.name}  
//                                         style={{width:"100%", height:"90%", backgroundPosition:"center", overflow:"hidden"}}
//                                     />
//                                 </Link>
//                             </div>
//                             <MDBCardBody>
//                                 <MDBCardTitle>
//                                     <strong>{val.name}</strong>
//                                 </MDBCardTitle>
//                                 <MDBCardText>
//                                     <CardSubtitle className='font-weight-bold'>{changetoRupiah(val.harga)}</CardSubtitle>
//                                 </MDBCardText>
//                                 <MDBBtn href="#" className="btn rounded-pill px-2 delete" style={{width:"90px"}}>
//                                     {val.kategori.nama}
//                                 </MDBBtn>
//                             </MDBCardBody>
//                         </MDBCard>
//                     </MDBCol>
//                 )
//             })
//         )

//     }

//     if(loading){
//         return (
//             <div className="mt-5" style={{display:"flex", height:"50vh", justifyContent:"center", alignItems:"center"}}>
//                loading
//             </div>
//         )
//     }

//     return (
//         <div style={{display:"flex", justifyContent:"space-evenly"}} className="mt-5 py-5 px-5">
//             <div>
                
//             </div>
//                 {
//                     renderProduct()
//                 }   
//              </div>
   
//     )
// }


// export default SearchPage
