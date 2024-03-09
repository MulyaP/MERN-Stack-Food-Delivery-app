/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import react, { useEffect, useState, useRef } from 'react'
import { useCart, useDispatch } from './CartContext';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Card = (props) => {
    const navigate = useNavigate();
    const cart = useCart();
    const isFirstRender = useRef(true);
    const isFirstRender1 = useRef(true);
    let it;
    const id = localStorage.getItem('authToken');
    cart?.forEach((item)=>{
        if (item.id===props.id) it = item
        
    })
    const [count, setCount] = useState(it?it.qty:1);
    const [click, setClick] = useState(it?true:false);
    const dispatch = useDispatch();

    // console.log(click);
    const handleClick = () => {

        if (!localStorage.getItem('authToken')){
            navigate('/login')
        }
        else{
            setClick(true);
            handleAdd();
        }
    }

    const handleAdd = async () => {
        // console.log(2);
        // console.log(cart);
        dispatch({type:'ADD',id:props.id, img:props.img, name:props.title, qty:count, price:props.price})
    }

    useEffect(()=>{
        if (!isFirstRender1.current){
            setClick(false);
            // setCount(1);
        }
        else{
            isFirstRender1.current = false;
        }
    },[id])


    useEffect(()=>{
        const func = async () => {
            if (count===0){
                setClick(false)
                dispatch({type:'DELETE', id:props.id, img:props.img, name:props.title, qty:count, price:props.price});
                // console.log(cart);
                
                
                setCount(prevcount => prevcount+1)
            }
            else if (count!==0 && !isFirstRender.current){
                dispatch({type:'UPDATE', id:props.id, img:props.img, name:props.title, qty:count, price:props.price});
                
                // console.log(1)
                
                // console.log(cart);
            }
            else{
                isFirstRender.current=false
            }
        }
        func()
        
    },[count])

    // useEffect(()=>{
    //     if (click===false){
    //         dispatch('DELETE');
    //     }
    //     else{
    //         dispatch('ADD');
    //     }
    // },[click])

    return (
        <div className='m-3'>
            <div className="card " style={{ "width": "18.2rem" }}>
                <img src={props.img} className="card-img-top" width="200" height="200" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.description}</p>
                    <p><b>Price: </b> <i> Rs. {props.price}/-</i></p>
                    <hr />
                    {
                        !click ? (
                            <div className='bg-success rounded-3 shadow-none user-select-none' style={{ 'width': 'auto', 'cursor': 'pointer', 'padding': '4px' }} onClick={handleClick}><center>Add to cart</center></div>
                        ) : (
                            <>
                            <div className='d-flex justify-content-center gap-2'>
                                <div className='bg-danger rounded-3 shadow-none user-select-none' style={{ 'width': '2rem', 'cursor': 'pointer' }} onClick={() => setCount((count > 0 ? count - 1 : 0))}> <center>-</center> </div>
                                <div>{count}</div>
                                <div className='bg-success rounded-3 shadow-none user-select-none' style={{ 'width': '2rem', 'cursor': 'pointer'}} onClick={() => setCount((count < 10 ? count + 1 : count))}><center>+</center></div>
                            </div>
                            <div style={{marginTop:'1rem'}}><b>Total price:</b> Rs. {count*props.price}/-</div>
                            </>
                        )
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default Card