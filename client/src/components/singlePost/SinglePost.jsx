import './singlePost.css';
import { useLocation } from 'react-router';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import axios from 'axios';

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split('/')[2];   // take path2 in position 2 in arr: localhost:3000/path1/path2
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  // const PF = 'http://localhost:5000/images/';  // link to public folder of server 
  const PF = process.env.REACT_APP_PUBLIC_FOLDER_URL;  // using create react app enviroment variable
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);


  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path); /// get post by id
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path])

  const handleDelete = async () => {
    try {
      // await axios.delete("/posts/" + path, {username:user.username});  // add username to body request and delete
      await axios({
        method: 'delete',
        url: "/posts/" + path,
        data: {
          username: user.username,
        }
      });
      window.location.replace("/");
    }
    catch (err) { }
  }

  const handleUpdate = async () => {
    try {
      await axios({
        method: 'put',
        url: "/posts/" + path,
        data: {
          username: user.username,
          title,
          desc,
        }
      });
      window.location.reload();
    }
    catch (err) { }
  }

  return (
    <div className="single-post">
      <div className="single-post__wrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="single-post__img" />
        )}
        {updateMode ? (
          <input
            type="text" value={title}
            className="single-post__title-input"
            autoFocus
            onChange={e => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="single-post__title">
            {post.title}
            {post.username === user?.username && (
              <div className="single-post__edit">
                <i className="single-post__icon fa-solid fa-pen-to-square" onClick={() => setUpdateMode(true)}></i>
                <i className="single-post__icon fa-solid fa-trash-can" onClick={handleDelete}></i>
              </div>
            )}

          </h1>
        )}

        <div className="single-post__info">
          <span >
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b className="single-post__author"> {post.username}</b>
            </Link>
          </span>
          <span className="single-post__date">{new Date(post.createdAt).toDateString()}</span>
        </div>
        {updateMode ? (
          <textarea
            className="single-post__content-input"
            value={desc}
            onChange={e => setDesc(e.target.value)}
          />
        ) : (
          <p className="single-post__content">
            {post.desc}
          </p>
        )}
        {updateMode && <button className="single-post__button" onClick={handleUpdate}>Update</button>
        }  
      </div>
    </div>
  )
}
