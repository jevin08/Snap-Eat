import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from '../reducer/foodReducer';
import { APP_API } from '../utils/auth';
import Notify from "../utils/toast";
const ProductContext = createContext();

const initialState = {
  isLoading: true,
  isError: false,
  foods: [],
  category: [],
  orders: []
}

const getConfig = ()=>{
  const token = sessionStorage.getItem('token');
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };
  if(token){
    config.headers = {...config.headers, 'Authorization': token};
  }
  return config;
}

const ProductProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState)

  const getfoods = async () => {
    dispatch({ type: "SET_LOADING" })
    try {
      const res = await axios.get(`${APP_API}/v1/foods`, getConfig());
      //console.log(res)
      const allfoods = await res.data.foods;
      dispatch({ type: "FOODS", payload: allfoods })
    }
    catch (error) {
      dispatch({ type: "ERROR" })
    }
  }

  const getOrders = async () => {
    dispatch({ type: "SET_LOADING" })
    try {
      const res = await axios.get(`${APP_API}/v1/orders`, getConfig());
      const allOrders = await res.data.orders;
      dispatch({ type: "ORDERS", payload: allOrders });
    } catch (err) {
      dispatch({ type: "ERROR" })
    }
  }
  const checkUpdateForOrders = async () => {
    try {
      const res = await axios.get(`${APP_API}/v1/orders`, getConfig());
      const allOrders = await res.data.orders;
        let orderAdded = allOrders.length - orders.length;
        if(orderAdded>0){
          (orderAdded == 1)?
            Notify({ message: `An order is newly added.`, type:"success" }) :
            Notify({ message: `${orderAdded} orders are newly added.`, type:"success" });
        }
      dispatch({ type: "ORDERS", payload: allOrders });
    } catch (err) {
      dispatch({ type: "ERROR" })
    }
  }

  const changeOrderStatus = async (id, status) => {
    try {
      await axios.post(`${APP_API}/v1/order/status/${id}`, { status }, getConfig());
      const res = await axios.get(`${APP_API}/v1/orders`);
      const allOrders = await res.data.orders;
      dispatch({ type: "ORDERS", payload: allOrders });
    } catch (err) {
      dispatch({ type: "ERROR" });
    }
  }

  const deleteOrder = async (id) => {
    const Dapi = `${APP_API}/v1/order/${id}`
    try {
      const res = await axios.delete(Dapi);
      const updateOrder = await axios.get(`${APP_API}/v1/orders`, getConfig());
      Notify({ message: `An order is deleted!`, type:"info" });
      const allOrders = updateOrder.data.orders;
      dispatch({ type: "ORDERS", payload: allOrders });
    } catch (error) {
      dispatch({ type: "ERROR" });
    }
  }

  const deletefood = async (id) => {
    const Dapi = `${APP_API}/v1/food/delete/${id}`
    try {
      const res = await axios.delete(Dapi, getConfig());
      Notify({ message: `One food item is deleted!`, type:"success"});
      const updatedfoods = await axios.get(`${APP_API}/v1/foods`);
      const allfoods = await updatedfoods.data.foods;
      dispatch({ type: "FOODS", payload: allfoods })
    } catch (error) {
      dispatch({ type: "ERROR" })
    }
  }


  useEffect(() => {
    getfoods();
    getOrders();
  }, [])


  return <ProductContext.Provider value={{ ...state, getOrders, changeOrderStatus, deleteOrder, deletefood }}>
    {children}
  </ProductContext.Provider>
}

const useFoodcontext = () => {
  return useContext(ProductContext)
}

export { ProductProvider, ProductContext, useFoodcontext };