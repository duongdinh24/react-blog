import './login.css';
import { Link } from "react-router-dom";
import { Context } from '../../context/Context';
import { useRef, useContext } from "react";
const axios = require('axios');

export default function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

    }
    catch(err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
 
  return (
    <div className="login">
      <span className="login__title">Wellcome</span>
      <form className="login__form" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="text"
          className="login__input"
          placeholder="Enter your email..."
          ref={emailRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="login__input"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="login__btn" disabled={isFetching} type="submit">Login</button>
      </form>
      <span className="login__register-question">Don't have an account? <Link to="/register" className="link">Register</Link></span>
    </div>
  )
}
