import './register.css';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';
export default function Register() {
  const [ username, setUsername ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(username + ' ' + email + ' ' + password);
      const res = await axios.post('/auth/register', {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    }
    catch (err) {
      setError(true);
    }
  };
  return (
    <div className="register">
      <span className="register__title">Create Account</span>
      <form className="register__form" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="register__input"
          placeholder="Enter your username..."
          onChange={e=>setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          className="register__input" 
          placeholder="Enter your email..." 
          onChange={e=>setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          className="register__input" 
          placeholder="Enter your password..." 
          onChange={e=>setPassword(e.target.value)}
        />
        <button className="register__btn" type="submit">Register</button>
      </form>
      {error && <span style={{color: 'red', marginTop: '10px'}}>Something went wrong</span>}
      <span className="register__register-question">Already have an account? <Link to="/login" className="link">Login</Link></span>
    </div>
  )
}
