import {useState, useContext} from 'react';
import axios from 'axios';
import { Context } from '../../context/Context';

import './write.css'

export default function Write() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const {user} = useContext(Context);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc,
        };

        if(file){
            const data = new FormData();
            // const filename = Date.now() + file.name;
            const filename = file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            try{
                await axios.post("/upload", data);
            }
            catch(e){}
        }
        
        try {
            const res = await axios.post("/posts/create", newPost);
            window.location.replace("/post/" + res.data._id);
        }
        catch(e){}
    }
    return (
        <div className="write">
            {file && (
                <img 
                    src={URL.createObjectURL(file)}
                    alt=""
                    className="write__img"
                />
            )}
            <form className="write__form" onSubmit={handleSubmit}>
                <div className="write__form-group">
                    <label htmlFor="fileInput">
                        <i className="write__icon fa-solid fa-plus"></i>
                    </label>
                    <input 
                        type="file" id='fileInput' 
                        style={{ display: "none" }} 
                        name="fileInput" 
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <input 
                        type="text" placeholder="Title" 
                        className="write__input-title" 
                        autoFocus={true}
                        onChange={e=>setTitle(e.target.value)}
                    />
                </div>
                <div className="write__form-group">
                    <textarea 
                        placeholder="Tell your story..." 
                        type="text" 
                        className="write__input-content"
                        onChange={e=>setDesc(e.target.value)}
                    ></textarea>
                </div>
                <button className="write__submit" type="submit">Publish</button>
            </form>
        </div>
    )
}
