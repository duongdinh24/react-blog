import './sidebar.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Sidebar() {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get("/categories");
            setCats(res.data);
        };
        getCats();
    }, [])
    return (
        <div className="sidebar">
            <div className="sidebar__item">
                <span className="sidebar__title">ABOUT ME</span>
                <img className="sidebar__img" src="/assets/img/aboutme.jpg" alt="" />
                <p>My name is Dinh, i'm twenty two years old. I'm a newbie web developer.
                    I love study something new, read books, blogging, play guitar and taking photos.
                </p>
            </div>
            <div className="sidebar__item">
                <span className="sidebar__title">CATEGORIES</span>
                <ul className="sidebar__list">
                    {cats.map(c => (
                        <Link to={`/?cat=${c.name}`} className="link">
                            <li className="sidebar__list-item">{c.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="sidebar__item">
                <span className="sidebar__title">FOLLOW US</span>
                <div className="sidebar__social">
                    <i className="sidebar__social-icon fa-brands fa-facebook"></i>
                    <i className="sidebar__social-icon fa-brands fa-twitter"></i>
                    <i className="sidebar__social-icon fa-brands fa-instagram-square"></i>
                    <i className="sidebar__social-icon fa-brands fa-linkedin"></i>
                </div>
            </div>

        </div>
    );
}
