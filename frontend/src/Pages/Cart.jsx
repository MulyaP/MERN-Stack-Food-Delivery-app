/* eslint-disable no-unused-vars */
import react from 'react'
import { useCart, useDispatch } from '../Components/CartContext';
import { MdArrowBack } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai';
import CartItem from '../Components/CartItem';
import axios from 'axios';



const Cart = () => {
    const id = localStorage.getItem('authToken');
    let cart = useCart();
    let dispatch = useDispatch();

    const updateOrders = (req)=>{
        axios.put("http://localhost:5000/api/orders",{id:req.id, orders:req.cart})
            .then((response)=>{
                // console.log("");
                
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    const navigate = useNavigate();

    const getPrice = () => {
        let price = 0;
        cart?.forEach((item) => {
            price += (item.price * item.qty)
        })
        return price
    }

    const handleCheckout = () => {
        updateOrders({id:id, cart:cart});
        dispatch({type:'DELETE ALL'});
        navigate('/');
    }

    return (

        <div>
            {
                id ? (
                    <div>
                        <MdArrowBack className="cursor-pointer fs-4" style={{ margin: '20px', cursor: 'pointer' }} onClick={() => navigate('/')} />

                        <center><h1>Your Cart</h1></center>
                        <center><h4>You have <b>{cart.length}</b> items in your cart</h4></center>
                        <br />
                        <hr />


                        <div className='m-4' style={{ width: '80rem' }}></div>


                        <div style={{ display: 'flex' }}>
                            <div style={{ paddingLeft: '10rem', fontSize: '20px', fontWeight: 'bold' }}>Item</div>
                            <div style={{ paddingLeft: '39rem', fontSize: '20px', fontWeight: 'bold' }}>Price</div>
                            <div style={{ paddingLeft: '8rem', fontSize: '20px', fontWeight: 'bold' }}>Quantity</div>
                            <div style={{ paddingLeft: '8rem', fontSize: '20px', fontWeight: 'bold' }}>Delete</div>
                        </div>
                        <hr />

                        {
                            cart.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <CartItem item={item} />
                                        <hr />
                                    </div>
                                )
                            })
                        }

                        {
                            cart !== undefined && cart.length !== 0 ? (
                                <div className="d-flex flex-column bg-danger p-2 text-dark bg-opacity-75 fs-2 text-white align-items-center justify-content-center" style={{ height: '7rem', width: '100%', backgroundColor: 'orange', position: 'fixed', bottom: '0', right: '0', zIndex: '500', transition: '0.5s ease-in-out 0.2s linear' }}>
                                    <h3>Total Price: Rs. <b>{getPrice()}</b>/-</h3>

                                    <button className="btn bg-black text-white mx-1" onClick={handleCheckout}>Click to Checkout</button>
                                </div>



                            ) : (
                                <>
                                </>
                            )
                        }
                    </div>
                ) : (
                    <div>ERROR-404: NOT FOUND</div>
                )
            }
        </div>
    )
}

export default Cart