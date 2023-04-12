import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from '../reducer/userReducer';
import { APP_API, setAuthToken } from '../utils/auth';
import Notify from "../utils/toast";

const UserContext = createContext();

const API = `${APP_API}/v1/users`;

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  isAdmin: false,
  isError: false,
  users: []
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

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const getUsers = async (url) => {
    dispatch({ type: "SET_LOADING" })
    try {
      const res = await axios.get(url, getConfig());
      const users = await res.data.users;
      dispatch({ type: "USERS", payload: users })
    }
    catch (error) {
      dispatch({ type: "ERROR" })
    }
  }

  const registerUser = async (user) => {
    dispatch({ type: "SET_LOADING" })
    try {
      axios.post(`${APP_API}/v1/register`,
        user,
        getConfig())
        .then(response => {
          const user = response.data.user;
          Notify({
            message: `${user.firstname} ${user.surname} is registred successfully.`,
            type: 'success'
          });
          window.location.href = '/';
        });
    } catch (err) {
      Notify({message:"Oops, Can't register the user!", type: 'error'});
      dispatch({ type: "ERROR" });
    }
  }

  const loginUser = async (email, password) => {
    dispatch({ type: "SET_LOADING" })
    try {
      axios.post(`${APP_API}/v1/login`, { email, password },
      getConfig())
        .then(response => {
          // get token and user from response
          const user = response.data.user;
          const token = response.data.token;
          // set token and user to local storage
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("user", user);
          Notify({ message: 'You logged in successfully', type: 'success' });
          //set token to axios common header
          setAuthToken(token);
          if (user.role === "admin") {
            dispatch({ type: "SET_ADMIN_LOGIN", });
          } else {
            dispatch({ type: "SET_LOGIN" });
          }

        });
    } catch (error) {
      dispatch({ type: "ERROR" })
    }
  }
  const logoutUser = async () => {
    dispatch({ type: "SET_LOGOUT", });
  }

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (token && token!=null) {
      getUsers(API);
      dispatch({type:'SET_LOGIN'});
    }
  }, [])

  return <UserContext.Provider value={{ ...state, getUsers, loginUser, logoutUser, registerUser }}>
    {children}
  </UserContext.Provider>
}

const useUserContext = () => {
  return useContext(UserContext)
}

export { UserProvider, useUserContext };