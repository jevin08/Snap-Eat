/** 
* last updated at: 09:01PM 02/03/2023
* author: jevin sutariya
*/

import React, { useContext, useState } from "react";
import axios from "axios";
import './Register.css';
import { setAuthToken, APP_ROLES } from "../../utils/auth";
import { useUserContext } from "../../context/userContext";

const Register = () => {
  const [user, setUser] = useState({
    firstname: "",
    surname: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user"
  });
  const [isLoading, setIsLoading] = useState(false);
  const {isAdmin, registerUser} = useUserContext();

  function validateForm() {
    return user.firstname.length > 2 && user.surname.length > 2 && user.email.length > 4 && user.mobile.length===10 && user.password.length > 7 && user.confirmPassword === user.password && APP_ROLES.includes(user.role);
  }

  const updateUser = (par) => {
    setUser({ ...user, ...par });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    registerUser(user);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="registerForm border border-primary rounded">
        <div className="form-group">
          <label labelfor="firstname">First name</label>
          <input type="text" className="form-control" id="firstname" aria-describedby="firstnameHelp" placeholder="Enter first name" autoFocus value={user.firstname} onChange={(e) => updateUser({ firstname: e.target.value })} />
          <small id="firstnameHelp" className="form-text text-muted">Atleast 3 character.</small>
        </div>
        <div className="form-group">
          <label labelfor="surname">Surname</label>
          <input type="text" className="form-control" id="surname" aria-describedby="lastnameHelp" placeholder="Enter surname" value={user.surname} onChange={(e) => updateUser({ surname: e.target.value })} />
          <small id="lastnameHelp" className="form-text text-muted">Atleast 3 character.</small>
        </div>
        <div className="form-group">
          <label labelfor="email">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={user.email} onChange={(e) => updateUser({ email: e.target.value })} />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label labelfor="mobile">Mobile</label>
          <input type="mobile" className="form-control" id="mobile" aria-describedby="mobileHelp" placeholder="Enter mobile" value={user.mobile} onChange={(e) => updateUser({ mobile: e.target.value })} />
          <small id="mobileHelp" className="form-text text-muted">Please enter 10 digit mobile number.</small>
        </div>
        <div className="form-group">
          <label labelfor="password">Password</label>
          <input type="password" className="form-control" id="password" aria-describedby="passwordHelp" placeholder="Password" value={user.password} onChange={(e) => updateUser({ password: e.target.value })} />
          <small id="passwordHelp" className="form-text text-muted">Password length must greater or equal to 8.</small>
        </div>
        <div className="form-group">
          <label labelfor="confirmPassword">Confirm Password</label>
          <input type="password" className="form-control" id="confirmPassword" aria-describedby="confirmPasswordHelp" placeholder="Password" value={user.confirmPassword} onChange={(e) => updateUser({ confirmPassword: e.target.value })} />
          <small id="confirmPasswordHelp" className="form-text text-muted">Password and confirm password must be same.</small>
        </div>
        {
          isAdmin &&
          <div class="form-group col-md-4">
            <label labelfor="role">Role</label>
            <select id="inputRole" class="form-control">
              {APP_ROLES && APP_ROLES.map(role =>
                <option value={role} key={role}>{role.toUpperCase()}</option>
              )}
            </select>
          </div>
        }
        <button type="submit" className="btn btn-primary btn-block my-3" disabled={!validateForm()}>{isLoading ? <div className="spinner-border" role="status"></div> : 'Register'}</button>
      </form>
    </>
  );
}

export default Register;