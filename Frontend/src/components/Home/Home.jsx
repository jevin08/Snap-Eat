import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFoodcontext } from "../../context/productContext";
import Card from './Card';
import './Home.css';
import Notify from "../../utils/toast";

const MAX_ITEMS = 3;
const Home = () => {
  const { tableId } = useParams();
  useEffect(() => {
    if (tableId && tableId!=null) {
      localStorage.setItem("table", tableId);
    }else if(localStorage.getItem("table")===null){
        localStorage.setItem("table", 0);
    }
  }, []);
  const { isLoading, foods } = useFoodcontext();
  if (isLoading) {
    return (
      <div>
        <svg className="spinner" viewBox="0 0 50 50">
          <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
        </svg>
      </div>
    );
  }

  function getHomePageItems(foods) {
    if (typeof foods !== typeof ([])) {
      console.log("invalid foods provided");
      return;
    }
    const foodByCategory = new Map();
    foods.map((food) => {
      if (foodByCategory.has(food.category)) {
        foodByCategory.set(food.category, [...foodByCategory.get(food.category), food]);
      } else {
        foodByCategory.set(food.category, [food]);
      }
    });

    var items = Array.from(foodByCategory, ([name, value]) => ({ name, value }));
    items = items.map(({ name, value }) => {
      value = value.sort((i1, i2) => {
        return i1.rating > i2.rating;
      });
      // value = value.slice(0, MAX_ITEMS);
      return { category: name, value };
    });

    foodByCategory.clear();

    //console.log(items);
    return items;
  }
  const items = getHomePageItems(foods);

  return (
    <>
      <div className="album py-5 bg-light">
        <div className="container">
          {
            items.map((item) =>
              <div className="row" key={item.category} id={item.category}>
                <h2 className="d-flex justify-content-center text-capitalize" type="text">
                  {item.category}
                </h2>
                {
                  item.value.map(i => <div className="col-md-4 col-lg-3 col-sm-6" key={i._id}>
                    <Card key={i._id} {...i} />
                  </div>)
                }
              </div>
            )}
        </div>
      </div>
    </>
  );
}

export default Home;