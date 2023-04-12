import { NavLink, useNavigate } from "react-router-dom"
import { COMPANY, COMPANY_IMG } from '../../utils/auth';

const Logout = () => {
  const navigate = useNavigate();

  return (
    <div id="about" className="album container-fluid">
      <div className="row">
        <div className="col-sm-6">
          <br /><br />
          <h2 className="d-flex justify-content-center text-capitalize" type="text">{COMPANY}</h2>
          <br />
          <h4></h4><br />
          <p>This project is an example of the web application and flexible to open in any browser in any device such as mobile, tablet etc. In this user should scan the QR code to place the order and see all the items in the restaurant. Only allowed users have access to update the food items and see the order details and update the order status.
          </p>
          <br />
          <button className="btn btn-default btn-lg">Get in Touch</button>
          <NavLink to="/login" className="">
            <button className="btn btn-default border-0 pe-none" style={{ width: "100px" }}></button>
          </NavLink>
        </div>
        <div className="col-sm-6">
          <br />
          <br />
          <img src={COMPANY_IMG} className="card-img-top img-cover" alt={COMPANY} />
        </div>
      </div>
    </div>
  );
}

export default Logout;