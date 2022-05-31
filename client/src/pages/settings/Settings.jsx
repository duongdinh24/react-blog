import './settings.css';
import Sidebar from '../../components/sidebar/Sidebar';
import { useState, useContext } from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';

export default function Settings() {
  // const PF = 'http://localhost:5000/images/';  // link to public folder of server 
  const PF = process.env.REACT_APP_PUBLIC_FOLDER_URL;  // using create react app enviroment variable
  const [file, setFile] = useState(null);
  const { user, dispatch } = useContext(Context);

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START"});
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };

    if (file) {
      const data = new FormData();
      // const filename = Date.now() + file.name;
      const filename = file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;

      try {
        await axios.post("/upload", data);
      }
      catch (e) { }
    }

    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      // await axios({
      //   method: 'put',
      //   url: "/posts/" + path,
      //   data: {
      //     username: user.username,
      //   }
      // });
      // window.location.replace("/post/" + res.data._id);
      // window.location.reload();
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    }
    catch (e) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  }
  return (
    <div className="settings">
      <div className="settings-wrapper">
        <div className="settings__title">
          <span className="settings__title-update">Update Your Account</span>
          <span className="settings__title-delete">Delete Account</span>
        </div>
        <form className="settings__form" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settings__profile-pic">
            <img  src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="" />
            <label htmlFor="fileInput">
              <i className="profile-pic__icon fa-solid fa-camera"></i>
            </label>
            <input 
              type="file" id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)}/>
          <label>Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
          <label>Password</label>
          <input type="password" required onChange={(e) => setPassword(e.target.value)}/>
          <button className="settings__submit-btn" type="submit">Update</button>

          {success && <p className="settings__success-message">Profile has been updated!</p>}
        </form>
      </div>
      <Sidebar />
    </div>
  )
}
