import React, { useState, } from 'react';
import axios from "axios";
import { useCartContext } from "../../context/cartContext"
import { useFoodcontext } from "../../context/productContext"
import CartItem from "./CartItem";
import { NavLink, useNavigate } from "react-router-dom";
import '../Home/Home.css';
import { APP_API, MAX_TABLE } from '../../utils/auth';
import Notify from "../../utils/toast";

const tableId = localStorage.getItem('table');

const Cart = () => {
  const { getOrders } = useFoodcontext();
  const { cart, clearCart } = useCartContext();
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 568;

  const makeOrder = () => {
    const token = sessionStorage.getItem("token");
    console.log(token);
    const isAuthenticated = token && token!==null ?true:false;
    if(isAuthenticated){
      if(window.confirm("Are you sure to order the product?")){

      }
    }else{
      navigate("/login");
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      orderItems: cart,
      table: localStorage.getItem(table),
    };
    setIsLoading(true);
    axios.post(`${APP_API}/v1/order/add`,
      payload,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      .then(response => {
        const order = response.data.order;
        localStorage.setItem("table", order.user.table);
        let dely = 50;
        Notify({ message: "Order received successfully 🙏 🙏 🙏", type: "success" });
        setIsLoading(true);
        clearCart();
        setTimeout(() => {
          //redirect user to home page
          navigate("/");
        }, dely);
        //redirect user to home page
      })
      .catch(err => {
        console.log(err);
        if (err.response.status === 401) {
          console.log('Something went wrong');
        }
      });
    setIsLoading(false);
  };

  return (
    <>
      <div className="app-background" style={{ height: `${showForm ? (150 + cart.length * (isMobile ? 25 : 6)) : (isMobile ? 140 : 83.65)}vh` }}>
        <div className="container">
          <h2 className="d-flex justify-content-center text-light">Cart</h2>
          <div className="table-responsive h-25 container-fluid m-2 shadow p-3 mb-3 bg-body rounded">
            {
              cart != null && cart.length != 0 ?
                <table className="table table-striped table-hover">
                  <thead className="stiky">
                    <tr>
                      <th scope="col fs-5">Food</th>
                      <th scope="col fs-5">Price</th>
                      <th scope="col fs-5">Quantity</th>
                      <th scope="col fs-5">Total</th>
                      <th scope="col fs-5">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      cart.map((curElement) => {
                        return <CartItem key={curElement.id} {...curElement} />
                      })
                    }
                  </tbody>
                </table>
                : <h2 className="row justify-content-center m-5">No item present in cart</h2>
            }
          </div>
          <div className="d-block justify-content-between text-center" >
            <NavLink to="/" className="btn btn-primary m-1">Continue Shopping</NavLink>&nbsp;

            {cart != null && cart.length > 0 ?
              <>
                <button className="btn btn-success m-1" onClick={() => makeOrder()}>Order the food</button>&nbsp;
                <button className="btn btn-danger m-1" onClick={() => clearCart()}>Clear Cart</button></> : ''}
          </div>
        </div>

        {/* {cart != null && cart.length != 0 && showForm &&
          <form onSubmit={handleSubmit} className="loginForm border border-primary rounded" style={{ height: `${isMobile ? 28 : 26}rem` }}>
            <div className="form-group">
              <label labelfor="firstname">First name</label>
              <input type="text" className="form-control" id="firstname" aria-describedby="firstnameHelp" placeholder="Enter first name" autoFocus value={user.firstname} onChange={(e) => updateUser({ firstname: e.target.value })} required />
              <small id="firstnameHelp" className="form-text text-light">Atleast 3 character.</small>
            </div>


            <div className="form-group">
              <label labelfor="surname">Surname</label>
              <input type="text" className="form-control" id="surname" aria-describedby="lastnameHelp" placeholder="Enter surname" value={user.surname} onChange={(e) => updateUser({ surname: e.target.value })} required />
              <small id="lastnameHelp" className="form-text text-light">Atleast 3 character.</small>
            </div>
            <div className="form-group">
              <label labelfor="mobileno">Mobile Number</label>
              <input type="number" className="form-control" id="mobile" aria-describedby="mobileHelp" minLength={10} maxLength={10} min={1000000000} max={9999999999} placeholder="Mobile no" value={user.mobile} onChange={(e) => updateUser({ mobile: e.target.value })} />
              <small id="mobileHelp" className="form-text text-light">Valid 10 digit mobile no.</small>
            </div>
            <div className="form-group">
              <label labelfor="table">Table</label>
              <input type="number" className="form-control" id="table" aria-describedby="tableHelp" min={1} max={MAX_TABLE} placeholder="Table no" value={user.table} onChange={(e) => updateUser({ table: e.target.value })} />
              <small id="tableHelp" className="form-text text-light">Enter the table number where you have been seeted.</small>
            </div>
            <button type="submit" className="btn btn-primary btn-block mb-3" disabled={!validateForm()}>{isLoading ? <div className="spinner-border" role="status"></div> : 'Order'}</button>
          </form>
        } */}
      </div>
    </>
  )
}

export default Cart;