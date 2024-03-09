/* eslint-disable no-unused-vars */
import react, { useState } from 'react'
import { MdArrowBack } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Signup = () => {

    const [credentials, setCredentials] = useState({ name: '', location: '', m_no: '', email: '', password: '' });
    const navigate = useNavigate()
    const [notLoggedIn, setNotLoggedIn] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(credentials.email);

            
        axios.post('http://localhost:5000/api/createuser',{ email: credentials.email, name: credentials.name, location: credentials.location, m_no: credentials.m_no, password: credentials.password })
            .then((response)=>{
                // console.log(response);
                navigate('/login');
            })
            .catch((error)=>{
                // console.log(error);
                // console.log(error.response.data);
                setNotLoggedIn(true);
                setMessage(error.response.data);
                setTimeout(() => setNotLoggedIn(false), 3000);
            })
                // console.log(temp);

        // if (!temp.success) {
        //     alert('ENTER VALID CREDENTIALS!');
        // }
    }

    // console.log(credentials);

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className="container">
            <MdArrowBack className="cursor-pointer fs-4" style={{ margin: '20px', cursor: 'pointer' }} onClick={() => navigate('/')} />
            {
                notLoggedIn ? (
                    <>
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </>

                ) : (
                    <>
                        {null}
                    </>
                )
            }
            <form className="m-5" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="Name" className="form-label">Name</label>
                    <input type="text" name='name' value={credentials.name} onChange={onChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Location</label>
                    <input type="text" name='location' value={credentials.location} onChange={onChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Mobile Number</label>
                    <input type="tel" name='m_no' value={credentials.m_no} onChange={onChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name='email' value={credentials.email} onChange={onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name='password' value={credentials.password} onChange={onChange} className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
                <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
            </form>
        </div>
    )
}

export default Signup