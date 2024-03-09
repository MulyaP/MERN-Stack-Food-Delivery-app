/* eslint-disable no-unused-vars */
import React from 'react';
import { Routes, Route, Router} from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './Pages/Signup.jsx';
import Cart from './Pages/Cart.jsx';
import Orders from './Pages/Orders.jsx';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/orders' element={<Orders/>}/>
        
      </Routes>
    </div>
  );
}

export default App;
