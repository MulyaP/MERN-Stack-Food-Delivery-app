/* eslint-disable no-unused-vars */
import { useState } from "react";
import react from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
const Login = () => {

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/login', { email: credentials.email, password: credentials.password })
      .then(async (response) => {
        // const res = await response.json();
        // console.log(response);
        localStorage.setItem('authToken', response.data.authToken);
        // console.log(localStorage.getItem('authToken'));
        navigate('/');
      })
      .catch(error => {
        // console.log(error);
        setNotLoggedIn(true);
        setMessage(error.response.data)
        // console.log(error.response.data);
        setTimeout(() => setNotLoggedIn(false), 3000);
      })
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <>
    
      <MdArrowBack className="cursor-pointer fs-4" style={{ margin: '20px', cursor: 'pointer' }} onClick={() => navigate('/')} />
      <div className="container">

      <div className="container">
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
    </div>

        <form className="m-5" onSubmit={handleSubmit}>
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
          <Link to="/signup" className='m-3 btn btn-danger'>Create account</Link>
        </form>
        
      </div>
    </>
  )
}

export default Login