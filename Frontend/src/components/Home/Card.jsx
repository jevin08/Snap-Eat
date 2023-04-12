import React, { useState } from "react";
import { FaShoppingCart, FaMinus, FaPlus } from 'react-icons/fa';
import { NavLink } from "react-router-dom";
import { useCartContext } from "../../context/cartContext";
import Notify from "../../utils/toast";


const Card = ({ ...curElement }) => {

  const { _id, name, price, image, description, rating } = curElement;
  //console.log(_id)
  const { addtocart } = useCartContext();
  const [amount, setamount] = useState(1);
  const more = (str, len = 33) => {
    if (str.length > len - 3)
      str = `${str.substr(0, len - 3)}...`;
    return str;
  };
  return (
    <>
      <div className="card shadow m-2">
        <figure>
          <img src={image} className="card-img-top img-fluid" style={{ height: "225px" }} alt={name} />
          {/*           <figcaption className="caption">{category}</figcaption>*/}
        </figure>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{name}</h5>
            <button className="btn btn-dark">₹{price}</button>
          </div>
          <div className="d-flex justify-content-between m-2">
            <p className="card-text">{more(description, 50)}</p>
            <p> {rating}/5⭐</p>
          </div>
          <div className="d-lg-flex justify-content-between">
            <div className="d-inline-block">
              <button className="btn btn-light " onClick={() => amount > 1 ? setamount(amount - 1) : setamount(amount)} style={{ padding: '5px' }}><FaMinus size={13} /></button>
              &nbsp;
              <button className="btn btn-light" style={{ padding: '5px' }} >{amount}</button>
              &nbsp;
              <button className="btn btn-light" style={{ padding: '5px' }} onClick={() => setamount(amount + 1)}><FaPlus size={13} /></button>
            </div>
            <div className="d-inline-block">
              <button className="btn btn-light btn-outline-warning text-dark" onClick={() => {
      addtocart(_id, amount, curElement);
      Notify({message: `${amount} ${curElement.name} added to your cart.`, type:'success'});
    }}>
                <FaShoppingCart style={{ color: 'black' }} /> ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card;

