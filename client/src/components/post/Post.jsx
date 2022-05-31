import './post.css';
import { Link } from "react-router-dom";

export default function Post({ post }) {
    // const PF = 'http://localhost:5000/images/';
    const PF = process.env.REACT_APP_PUBLIC_FOLDER_URL;  // using create react app enviroment variable
    return (
        <div className="post">
            {post.photo && (
                <img
                    src={PF + post.photo}
                    alt=""
                    className="post__img"
                />
            )}
            <div className="post__info">
                <div className="post__cates">
                    {post.categories.map(c => (
                        <span className="post__cate">{c.name}</span>
                    ))}
                </div>
                <Link to={`post/${post._id}`} className="link">
                    <span className="post__title">{post.title}</span>
                </Link>
                <hr />
                <span className="post__date">{new Date(post.createdAt).toDateString()}</span>
            </div>
            <p className="post__desc">
                {post.desc}
                {/* Top 100 Most Listened Songs in April 2022 - Playlist Throwback & Today's New Music Hits 2022.
                In the next year, you will be able to find this playlist with the most streams on the audio streaming platform Spotify. */}
            </p>
        </div>
    )
}
