import { useNavigate } from "react-router-dom"
import { setAuthToken } from "../../utils/auth";
import { useEffect } from "react";
import Notify from "../../utils/toast";
import { useUserContext, } from "../../context/userContext";


const Logout = () => {
  const { logoutUser } = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      sessionStorage.removeItem('token');
      setAuthToken();
      Notify({ message: "Logout sucessfully", type: "success" });
      logoutUser();
      navigate("/login");
    } else {
      Notify({ message: "Already logged out", type: "info" });
      navigate("/login");
    }
  }, [navigate]);
  return (
    <></>
  );
}

export default Logout;