/* eslint-disable no-unused-vars */
import react from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useCart, useDispatch } from './CartContext'
import { TfiBag } from "react-icons/tfi";
const NavBar = () => {
    const cart = useCart();
    const navigate = useNavigate()

    const showCount = () => {
        let count = 0;
        cart?.forEach(element => {
            count += element.qty;
        });
        return count
    }

    const handlelogout = () => {
        try {
            localStorage.removeItem("authToken")
            navigate("/")

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link to={'/'} className="navbar-brand fs-1" >FDA</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link to='/' className="nav-link active" aria-current="page">Home</Link>
                            </li>
                            {
                                (localStorage.getItem("authToken")) ? (
                                    <Link to='/orders' className="nav-link active" aria-current="page">My Orders</Link>
                                ) : (
                                    ""
                                )
                            }

                        </ul>
                        {
                            (!localStorage.getItem("authToken")) ? (
                                <div className="d-flex">


                                    <Link to='/login' className="btn bg-white text-success mx-1">Login</Link>
                                    <Link to='/signup' className='btn bg-white text-success mx-1'>Signup</Link>
                                </div>
                            ) :
                                (
                                    <div className="d-flex">
                                        <Link to='/cart' className="btn bg-white text-success mx-2"><TfiBag className='fs-4'/><span>{showCount()>0?showCount():''}</span></Link>
                                        <div className="btn bg-white text-danger mx-2" onClick={handlelogout}>Logout</div>
                                        
                                    </div>
                                )

                        }


                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar