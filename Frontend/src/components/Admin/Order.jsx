import React, { useState, useEffect } from "react";
import axios from "axios";
// import './Login.css';
import { setAuthToken } from "../../utils/auth";
import { useNavigate, useParams } from "react-router-dom";
import { APP_API, } from '../../utils/auth';

const orderInit = {
  user: "",
  orderItems: [],
  totalPrice: 0,
  orderstatus: "",
};

const Order = () => {

  const { id } = useParams();
  const [order, setOrder] = useState(orderInit);
  useEffect(() => {
    async function getOrder(id) {
      //let data;
      axios.get(`${APP_API}/v1/order/${id}`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        })
        .then(res => {
          //console.log(res.data)

          setOrder(res.data.order);
        })
        .catch(err => {
          console.log(err);
          if (err.response.status === 401) {
            console.log('Something went wrong');
          }
        });
    }
    getOrder(id)
  }, []);

  return (
    <>

      <br />
      <br />
      <div className="d-flex flex-row bd-highlight mb-3 justify-content-evenly">
        <label><b>Name :</b>&nbsp;{order.user.name}</label>
        <label><b>Mobile :</b>&nbsp;{order.user.mobile}</label>
        <label><b>Table :</b>&nbsp;{order.user.table}</label>
        <label className={`btn ${ order.orderStatus === 'Served' ? 'btn-success' : order.orderStatus==='Processing' ? 'btn-warning':'btn-danger'}`}>{order.orderStatus}</label> 
      </div>
      <div>
        <div className=" container shadow p-3 mb-3 bg-body rounded">
          <div className="row justify-content-between">
            <div className="col-3 m-1 btn btn-dark"><b>Food Name</b></div>
            <button className="col-2 btn btn-dark m-1">Price</button>
            <button className="col-2 btn btn-dark  m-1">Quantity</button>
            <button className="col-2 btn btn-dark m-1">Amount</button>
          </div>
        </div>
        {order.orderItems && order.orderItems.map((curElement) => {
          return (
            <div key={curElement._id} className=" container shadow p-3 mb-3 bg-body rounded">
              <div className="row justify-content-between">
                <div className="col-3 m-1"><b>{curElement.name}</b></div>
                <button className="col-2 btn m-1">₹{curElement.price}</button>
                <button className="col-2 btn m-1">{curElement.quantity}</button>
                <button className="col-2 btn m-1">₹ {curElement.price * curElement.quantity}</button>
              </div>
            </div>
          )
        })}
        <div className="container shadow p-3 mb-3 bg-body rounded">
          <div className="row justify-content-between">
            <button className="col-6 btn ">Total Amount</button>
            <button className="col-2 btn ">₹{order.totalPrice}</button>
          </div>
        </div>
      </div>

    </>
  );
}

export default Order;