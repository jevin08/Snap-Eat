import { useFoodcontext, } from "../../context/productContext";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import Orders from "./Orders";


export default function Products() {
  const { isLoading, foods, deletefood } = useFoodcontext();
  const navigate = useNavigate();


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
      <br id="products" />
      <h2 className="d-flex justify-content-center mb-3">PRODUCTS</h2>
      <div >
        {foods.map((curElement) => {
          return (
            <div key={curElement._id} className=" container shadow p-3 mb-3 bg-body rounded">
              <div className="row justify-content-between">
                <div className="col-2"><img className='col-12' style={{ height: "70px", width: "60px" }} src={curElement.image} alt={curElement.name} /></div>
                <div className="col-2 m-1"><b>{curElement.name}</b></div>
                <button className="col-2 btn btn-dark m-1">{curElement.price}</button>
                <button className="col-2 btn btn-dark m-1" onClick={() => navigate(`/admin/food/update/${curElement._id}`)}>
                  <FaEdit />
                </button>
                <button className="col-2 btn btn-light btn-outline-danger m-1" onClick={() => deletefood(curElement._id)}><FaTrash /></button>
              </div>
            </div>
          )
        })
        }
      </div>
    </>
  );
}
