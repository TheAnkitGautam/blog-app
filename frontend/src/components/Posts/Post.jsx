import { Link } from 'react-router-dom'
import './post.css'

export default function Post({ post }) {
    const PF = "http://localhost:5000/images/"
    return (
        <div className="post">
            {<img src={post.photo ? PF + post.photo : "https://source.unsplash.com/random"} alt="" className="postImg" />}
            <div className="postInfo">
                <div className="postCat">{post.categories}</div>
                <Link to={"/post/" + post._id} className="link" >
                    <span className="postTitle"> {post.title} </span>
                </Link>
                <hr />
                <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
            </div>
            <p className="postDesc">
                {post.desc}
            </p>
        </div >
    )
}
