/* eslint-disable no-unused-vars */
import react, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../Components/Card'
import axios from 'axios';
import Spinner from '../Components/Spinner';
import { useCart } from '../Components/CartContext';
import { MdArrowBack } from 'react-icons/md'

const Home = () => {

    const cart = useCart();
    const navigate = useNavigate();
    const id = localStorage.getItem('authToken');

    const [count, setCount] = useState(0);
    const [FoodItems, setFoodItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    
    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5000/data')
            .then((response) => {
                setFoodItems(response.data.FoodItems);
                setLoading(false);
            })
            .catch((error) => {
                // console.log(error);
                setLoading(false);
            })
    }, [])

    const showCount = () => {
        
        let count = 0;
        cart?.forEach(element => {
            count += element.qty;
        });
        return count
    }

    // console.log(FoodItems[0][0].options);
    return (
        <div>
            <div>
                <NavBar />

            </div>
            {/* <MdArrowBack className="cursor-pointer fs-4" style={{ margin: '20px', cursor: 'pointer' }} onClick={() => navigate('/')} /> */}
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" style={{objectFit: 'contain !important' }}>
                    <div className="carousel-inner" id='carousel'>
                        <div className="carousel-caption" style={{ 'zIndex': '10' }}>
                            <div className="d-flex justify-content-centre">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
                                
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/900×700/?burger" className="d-block w-100" style={{ filter: 'brightness(30%)' }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900×700/?pastry" className="d-block w-100" style={{ filter: 'brightness(30%)' }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900×700/?barbeque" className="d-block w-100" style={{ filter: 'brightness(30%)' }} alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className='container' >
                {
                    loading ? (
                        <center><Spinner /></center>
                    ) : (
                        <div className="container">
                            {FoodItems.map((FoodItem_category, index) => (

                                <div key={index+1} className="row mb-3">
                                    <div key={FoodItem_category[0]._id} className='fs-3 m-3'>{FoodItem_category[0].CategoryName}</div>
                                    <hr />
                                    {
                                        
                                        FoodItem_category.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
                                        .map(FoodItem => (
                                            <div key={FoodItem._id} className='col-12 col-md-6 col-lg-4'>
                                                <Card id = {FoodItem._id} title={FoodItem.name} description={FoodItem.description} img={FoodItem.img} price = {FoodItem.options[0].full}/>
                                            </div>
                                        ))
                                    }
                                </div>
                            ))}
                            
                            {
                                id && cart!==undefined && cart.length!==0?(
                                    <>
                                        <div className="d-flex flex-column bg-danger p-2 text-dark bg-opacity-75 fs-2 text-white align-items-center justify-content-center" style={{height:'7rem', width:'100%', backgroundColor:'orange', position:'fixed', bottom: '0', right: '0', zIndex:'500', transition:'0.5s ease-in-out 0.2s linear'}}>
                                            <h3>You have <b>{showCount()}</b> item{showCount()===1?'':'s'} in your cart</h3>
                                            
                                            <Link to='/cart' className="btn bg-black text-white mx-1">Click to preview and Checkout</Link>
                                         </div>
                                    </>
                                ):(
                                    <>
                                        
                                        
                                    </>
                                )
                            }
                        </div>
                    )
                }

            </div>
            <div>
                <Footer />
            </div>

        </div>
    )
}

export default Home