/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import react, { useEffect, useState } from 'react'
import { MdArrowBack } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import Order from '../Components/Order';
import axios from 'axios';
const Orders = () => {

    const id = localStorage.getItem('authToken');

    const navigate = useNavigate();

    const [orders,setOrders] = useState([]);

    useEffect(() => {
        if (id){
            axios.post('http://localhost:5000/api/orders', { id: id })
                .then((res)=>{
                    // console.log(res.data);
                    setOrders(res.data?res.data:[]);
                })
                .catch((error)=>{
                    console.log(error.message);
                })
        }
    }, [])

    return (
        <div>
            {
                id ? (
                    <div className='container'>
                        <MdArrowBack className="cursor-pointer fs-4" style={{ margin: '20px', cursor: 'pointer' }} onClick={() => navigate('/')} />

                        <center><h1>Your Orders</h1></center>
                        <br />
                        <hr />
                        {
                            orders.map((item, index)=>{
                                return (
                                    <div key={index}>
                                    <h3>Order: {index+1}</h3>
                                    <Order order={item.order} ts={item.createdAt} />
                                    </div>
                                )
                            })
                        }
                    </div>
                ) : (
                    <div>ERROR:404, NOT FOUND</div>
                )
            }

        </div>
    )
}

export default Orders