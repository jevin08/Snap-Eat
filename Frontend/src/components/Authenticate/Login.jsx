/** 
* author: jevin sutariya
*/

import React, { useEffect, useState } from "react";
import axios from "axios";
import './Login.css';
import { Navigate, useNavigate } from "react-router-dom";
import { APP_API, setAuthToken } from "../../utils/auth";
import Notify from "../../utils/toast";
import { useUserContext } from "../../context/userContext";

const Login = () => {
  const { loginUser, isLoggedIn, isAdmin } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function validateForm() {
    return email.length > 3 && password.length > 7;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser(email, password);
  }

  return isLoggedIn ? (<Navigate to={`/table/${localStorage.getItem('table')}`} />) : (
    <div className="d-flex justify-content-between app-background">
      <form onSubmit={handleSubmit} className="loginForm shadow rounded col-lg-4 col-md-6 col-sm-8 col-xs-12" >
        <h2 className="text-center mb-2">Login form</h2>
        <div className="form-group mb-2">
          <label labelfor="email ">Email address</label>
          <input type="email" className="form-control" id="email" autoComplete="username" aria-describedby="emailHelp" placeholder="Enter email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} />
          <small id="emailHelp" className="form-text text-light">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group mb-2">
          <label labelfor="password">Password</label>
          <input type="password" className="form-control" autoComplete="current-password" id="password" aria-describedby="passwordHelp" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <small id="passwordHelp" className="form-text text-light">Password length must greater or equal to 8.</small>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn mb-3 " disabled={!validateForm()}>{isLoading ? <div className="spinner-border" role="status"></div> : 'Sign in'}</button>
        </div>
      </form>
    </div>
  );
}

export default Login;