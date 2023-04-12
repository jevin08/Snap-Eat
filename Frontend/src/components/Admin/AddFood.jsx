import React, { useState, } from 'react';
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import '../Home/Home.css';
import { APP_API, CATEGORY } from '../../utils/auth';
import Notify from "../../utils/toast";

const foodInit = {
  name: "",
  description: "",
  price: 0,
  category: "",
  image: "",
  rating: 3.5,
};

const AddFood = () => {
  const [food, setFood] = useState(foodInit);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function validateForm() {
    return food.name.length > 2 && food.description.length > 5 && food.image.length > 5 && food.price > 10 && food.category != "";
  }

  const updateFood = (par) => {
    setFood({ ...food, ...par });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    axios.post(`${APP_API}/v1/food/add`,
      food,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      .then(response => {
        const food = response.data.food;
        console.log(food);
        let dely = 50;
        Notify({ message: `${food.name} created successfully`, type: "success" });
        setIsLoading(true);
        setTimeout(() => {
          window.location.href = "/admin";
        }, dely);
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
      <div className="d-flex justify-content-around row">
          <br/>
          <br/>
        <div className="border border-primary shadow rounded mt-5 col-lg-5 col-md-6 col-sm-10">
        <form onSubmit={handleSubmit} className="position-sticky pt-3">
          <div className="form-group">
            <label labelfor="name">Food name</label>
            <input type="text" className="form-control" id="name" aria-describedby="nameHelp" placeholder="Enter food name" autoFocus value={food.name} onChange={(e) => updateFood({ name: e.target.value })} required />
            <small id="nameHelp" className="form-text text-muted">Atleast 3 character.</small>
          </div>
          <div className="form-group">
            <label labelfor="description">Description</label>
            <textarea className="form-control" id="description" aria-describedby="descriptionHelp" placeholder="Enter description" value={food.description} onChange={(e) => updateFood({ description: e.target.value })} rows={3} required />
            <small id="descriptionHelp" className="form-text text-muted">Atleast 3 character.</small>
          </div>
          <div className="form-group">
            <label labelfor="image">Image url</label>
            <input type="text" className="form-control" id="image" aria-describedby="imageurlHelp" placeholder="Enter image url" value={food.image} onChange={(e) => updateFood({ image: e.target.value })} required />
            <small id="imageurlHelp" className="form-text text-muted">Atleast 3 character.</small>
          </div>
          <div className="form-group">
            <label labelfor="price">Price</label>
            <input type="number" className="form-control" id="price" aria-describedby="priceHelp" min={0} max={1000} placeholder="Price" value={food.price} onChange={(e) => updateFood({ price: e.target.value })} />
            <small id="priceHelp" className="form-text text-muted">Enter valid food price.</small>
          </div>

          <div className="form-group">
            <label labelfor="category">Category</label>
            <select id="inputState" className="form-control" defaultValue={""} onChange={(e) => updateFood({ category: e.target.value })}>
              <option value={""} >Choose...</option>
              {
                CATEGORY.map(category => <option key={category} value={category}>{category}</option>)
              }
            </select>
          </div>

          <div className="form-group">
            <label labelfor="rating">Rating</label>
            <input type="number" className="form-control" id="rating" aria-describedby="ratingHelp" min={0} max={5} step="0.5" placeholder="Rating" value={food.rating} onChange={(e) => updateFood({ rating: e.target.value })} />
            <small id="ratingHelp" className="form-text text-muted">Optional rating.</small>
          </div>

          <button type="submit" className="btn btn-primary btn-block mb-3" disabled={!validateForm()}>{isLoading ? <div className="spinner-border" role="status"></div> : 'Create'}</button>
        </form>
        </div>
        <div className="border border-primary shadow rounded mt-5 col-lg-4 col-md-4 col-sm-10 " style={{ height: "300px",  }}>
          <img src={food.image} className="card-img-top img-fluid mt-4"  alt={food.name} style={{ height: "230px",  }} />
          <p labelfor="image" className="text-center mt-2">{food.name?food.name:"Url"}'s photo</p>
        </div>
          <br/>
          <br/>
      </div>
    </>
  )
}

export default AddFood;