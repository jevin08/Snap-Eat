import './App.css'
import React, { useState, useEffect } from "react";
import Home from "./components/Home/Home";
import PageNotFound from "./components/Home/PageNotFound";
import About from "./components/Home/About";
import Logout from './components/Admin/Logout';
import Users from './components/Admin/User/Users';
import Cart from './components/Cart/Cart';
import Dashboard from './components/Admin/Dashboard';
import Order from './components/Admin/Order';
import Orders from './components/Admin/Orders';
import Products from './components/Admin/Products';
import AddFood from './components/Admin/AddFood';
import UpdateFood from './components/Admin/UpdateFood';
import { BrowserRouter as Router, Route, NavLink, Routes, Navigate, } from "react-router-dom";
import { FaShoppingCart } from 'react-icons/fa'
import { Toaster } from 'react-hot-toast';
import { COMPANY } from './utils/auth';
import LOGO from './logo/SnapEat.png'
import { useUserContext, } from "./context/userContext";
import Login from './components/Authenticate/Login';
import Register from './components/Authenticate/Register';
import ProtectedRoute from './utils/ProtectedRoute';

const App = () => {
  // const isLoggedIn = sessionStorage.getItem('token') ? true : false;
  const { isLoggedIn, isAdmin } = useUserContext();

  useEffect(() => { }, [isLoggedIn]);

  return (
    <Router>
      <Toaster position="top-right" reverseOrder={true} />
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to={`/table/${localStorage.getItem('table')?localStorage.getItem('table'):0}`}><img src={LOGO} alt="LOGO" style={{ height: "80px", width: "200px" }} /></NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto">
                <li className="nav-item active">
                  <NavLink className="nav-link" to={`/table/${localStorage.getItem('table')?localStorage.getItem('table'):0}`}>Home</NavLink>
                </li>

                {
                  isAdmin &&
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/admin/">Dashboard</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/admin/addfood">Add Food</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/register">Register new</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/admin/user/all">Users</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/admin/orders">Orders</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/admin/products">Products</NavLink>
                    </li>
                  </>
                }
                <li className="nav-item">
                  <NavLink className="nav-link navbar-text" to="/about">About</NavLink>
                </li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link navbar-text" to="/cart">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>&nbsp;Cart
                  </NavLink>
                </li>
                {
                  isLoggedIn ? (<li className="nav-item nav-text">
                    <NavLink className="nav-link d-inline-flex navbar-text" to="/logout">Logout</NavLink>
                  </li>) : (<><li className="nav-item nav-text">
                    <NavLink className="nav-link d-inline-flex navbar-text" to="/login">Login</NavLink>
                  </li>
                  <li className="nav-item nav-text">
                  <NavLink className="nav-link d-inline-flex navbar-text" to="/register">Register</NavLink>
                </li></>
                  )
                }
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route exact path="/table/:tableId" element={<Home />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route exact path="" element={<ProtectedRoute />}>
            <Route path="/logout" element={<Logout />} />

          </Route>
          <Route exact path='/admin'>
            {isAdmin ? <>
              <Route index element={<Dashboard />} />
              <Route path="addfood" element={<AddFood />} />
              <Route path="food/update/:id" element={<UpdateFood />} />
              <Route path="logout" element={<Logout />} />
              <Route path="orders" element={<Orders />} />
              <Route path="products" element={<Products />} />
              <Route exact path="user" >
                <Route path="all" element={<Users />} />
              </Route>
              <Route path="order/:id" element={<Order />} />
            </>
              : <>
                <Route path='' element={<PageNotFound />} />
                <Route path='*' element={<PageNotFound />} />
              </>
            }
          </Route>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;