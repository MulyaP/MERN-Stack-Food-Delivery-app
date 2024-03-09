/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";

const CartContext = createContext();
const CartDispatchContext = createContext();
// const jwt = require('jsonwebtoken');

const updateCart = (req) => {
    axios.put("http://localhost:5000/api/cart", {id:req.id,cart:req.cart})
        .then((response)=>{
            // console.log(response.data);
        })
        .catch((error)=>{
            console.log(error.message);
        })
}

export function CartProvider({ children }){

    const id = localStorage.getItem('authToken');

    const reducer = (state,action) => {
        switch(action.type){
            case 'ADD':
                const cart1 = [...state, {id:action.id, img:action.img, name: action.name, qty: action.qty, price: action.price}]
                // console.log(cart1);
                updateCart({id:id,cart:cart1})
                return cart1
            case 'DELETE':
                const cart2 = state.filter((item) => item.id!==action.id);
                // console.log(cart2);
                updateCart({id:id,cart:cart2})
                return cart2
            case 'UPDATE':
                const cart3 = state.map((item)=>{
                    if (item.id === action.id){
                        return {id:action.id, img:action.img, name: action.name, qty: action.qty, price: action.price};
                    }
                    return item;
                })
                // console.log(cart3);
                updateCart({id:id,cart:cart3})
                return cart3;
            case 'ADD ALL':
                // console.log(action.cart)
                return action.cart;
            case 'DELETE ALL':
                // console.log('HI');
                updateCart({id:id,cart:[]})
                return [];
            default:
                break;
        }
    }

    




    
    // console.log(state)
    const [state,dispatch] = useReducer(reducer,[]);
    useEffect(()=>{
        if (id){
            axios.post('http://localhost:5000/api/cart',{id:id})
            .then((response)=>{
                    const cart = response.data.cart;
                    dispatch({type:'ADD ALL', cart:cart?cart:[]});
                })
                .catch((error)=>{
                    console.log(error.message);

                })
        }
    },[])
    
    
    
    

    return (
        <CartContext.Provider value={state}>
            <CartDispatchContext.Provider value={dispatch}>
                {children}
            </CartDispatchContext.Provider>
        </CartContext.Provider> 
    )
}


export const useCart = () => useContext(CartContext);
export const useDispatch = () => useContext(CartDispatchContext);