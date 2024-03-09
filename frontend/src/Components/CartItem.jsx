/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import react, { useEffect, useRef, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { useCart,useDispatch } from './CartContext';
const CartItem = (props) => {
    const cart = useCart();

    let dispatch = useDispatch();
    let [count,setCount] = useState(props.item.qty);
    const isFirstRender = useRef(true)

    useEffect(()=>{
        setCount(props.item.qty)
    },[cart.length])

    useEffect(()=>{
        const func = async () => {
            if (count===0){
                await dispatch({type:'DELETE', id:props.item.id, img:props.item.img, name:props.item.name, qty:count, price:props.item.price});
                // console.log(cart);
                setCount(props.item.qty)
            }
            else if (count!==0 && !isFirstRender.current){
                await dispatch({type:'UPDATE', id:props.item.id, img:props.item.img, name:props.item.name, qty:count, price:props.item.price});
                // console.log(cart);
            }
            else{
                isFirstRender.current = false;
            }
        }
        func()
        
    },[count])

    return (
        <div>
            <div style={{display:'flex'}}>
                <div style={{ width: '20rem', marginLeft:'2rem', paddingTop:'10px', paddingBottom:'10px'}}><img src={props.item.img} className="card-img-top" width="100" height="200" alt="..." /></div>
                <div style={{ paddingTop: '10px', paddingLeft: '2rem', fontSize: '25px', width:'20rem', paddingBottom:'10px' }}>{props.item.name}</div>
                <div style={{ paddingTop: '10px', paddingLeft: '10rem', fontSize: '25px', paddingBottom:'10px' }}>{props.item.price*count}</div>
                <div style={{ paddingTop: '10px', paddingLeft: '8rem', fontSize: '25px', paddingBottom:'10px' }}><div className='d-flex gap-2'>
                    <div className='bg-danger rounded-3 shadow-none user-select-none' style={{ 'width': '2rem', 'cursor': 'pointer' }} onClick={() => setCount((count > 0 ? count - 1 : 0))} > <center>-</center> </div>
                    <div>{count}</div>
                    <div className='bg-success rounded-3 shadow-none user-select-none' style={{ 'width': '2rem', 'cursor': 'pointer' }} onClick={() => setCount((count < 10 ? count + 1 : 10))} ><center>+</center></div>
                </div></div>
                <div style={{ paddingTop: '6px', paddingLeft: '8rem', fontSize: '25px', paddingBottom:'10px' }}><button className="btn btn-danger" onClick={()=> setCount(0)}>
                    <AiOutlineDelete className="text-white fs-4" />
                </button>
                </div>
                <hr />
            </div>
        </div>
    )
}

export default CartItem