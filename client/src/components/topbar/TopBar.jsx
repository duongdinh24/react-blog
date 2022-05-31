import "./topbar.css";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { Context } from '../../context/Context';
// const PF = 'http://localhost:5000/images/';  // link to public folder of server 
const PF = process.env.REACT_APP_PUBLIC_FOLDER_URL;  // using create react app enviroment variable
export default function () {
    const {user, dispatch} = useContext(Context);
    const handleLogout = () => {
        dispatch({ type: "LOGOUT"});
    };
    return (
        <div className="top">
            <div className="top-left">
                <i className="top-left__icon fa-brands fa-facebook"></i>
                <i className="top-left__icon fa-brands fa-twitter"></i>
                <i className="top-left__icon fa-brands fa-instagram-square"></i>
                <i className="top-left__icon fa-brands fa-linkedin"></i>
            </div>
            <div className="top-center">
                <ul className="top-list">
                    <li className="top-list__item">
                        <Link to="/" className="link">HOME</Link>
                    </li>
                    <li className="top-list__item">
                        <Link to="/" className="link">ABOUT</Link>

                    </li>
                    <li className="top-list__item">
                        <Link to="/" className="link">CONTACT</Link>

                    </li>
                    <li className="top-list__item">
                        <Link to="/write" className="link">WRITE</Link>

                    </li>
                    <li className="top-list__item" onClick={handleLogout}>
                        {user && "LOGOUT"}
                    </li>
                </ul>
            </div>
            <div className="top-right">
                {user ? (
                    <Link to="/settings">
                        <img className="top-avatar" src={PF + user.profilePic} alt="" />
                    </Link>
                ) : (
                    <ul className="top-list">
                        <li className="top-list__item">
                            <Link to="/login" className="link">LOGIN</Link>
                        </li>
                        <li className="top-list__item">
                            <Link to="/register" className="link">REGISTER</Link>
                        </li>
                    </ul>
                )}
                <i className="top-search-icon fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
    );
}
