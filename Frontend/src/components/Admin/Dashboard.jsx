import { useEffect } from 'react';
import { useFoodcontext, } from "../../context/productContext";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { EditIcon, ServedIcon, } from '../../utils/auth';
import Notify from "../../utils/toast";
import Order from './Order';
import { NavLink } from 'react-router-dom';
import Orders from "./Orders";
import Products from "./Products";


const Dashboard = () => {
  const { isLoading } = useFoodcontext();

  if (isLoading) {
    return (
      <div>
        <svg className="spinner" viewBox="0 0 50 50">
          <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
        </svg>
      </div>
    );
  }

  return (
    <>
      <Orders  />
      <br />
      <Products />
    </>
  )
}

export default Dashboard